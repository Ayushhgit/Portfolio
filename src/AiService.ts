import { GoogleGenAI, Schema, Type } from "@google/genai";
import { PROFILE, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CERTIFICATIONS, ABOUT } from './data';


const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error(apiKey);
  throw new Error('API key not configured. Please check your .env file.');
}
const ai = new GoogleGenAI({ apiKey });

const MODEL_FAST = 'gemini-2.5-flash';
const MODEL_SMART = 'gemini-2.5-flash';

// --- Context Construction (The "RAG" Data Source) ---
const PORTFOLIO_CONTEXT = JSON.stringify({
  profile: PROFILE,
  about: ABOUT,
  experience: EXPERIENCE,
  projects: PROJECTS,
  skills: SKILLS,
  education: EDUCATION,
  certifications: CERTIFICATIONS
});

const SYSTEM_INSTRUCTION = `
You are an expert Senior Technical Recruiter specializing in AI/ML Engineering roles (LLM, Computer Vision, MLOps). 
You represent Ayush Raj. Your goal is to evaluate his fit for high-bar engineering roles.
You have full access to his portfolio data: ${PORTFOLIO_CONTEXT}.

Guidance:
1. **Focus on Engineering**: Highlight system design, scalability, latency optimization, and deployment (Docker/AWS) over just "model training".
2. **Terminology**: Use precise terms (e.g., "RAG", "Quantization", "Vector DBs", "CI/CD for ML", "Transformer Architecture").
3. **Honesty**: If a specific niche skill (e.g., CUDA kernels) is missing, admit it but pivot to his strong foundation in PyTorch/C++.
4. **Tone**: Professional, technical, concise. Avoid fluff.
`;

// --- Service Functions ---

export interface JobMatchResult {
  matchScore: number;
  justification: string;
  missingSkills: string[];
  atsKeywords: string[];
  recommendedBulletPoints: string[];
}

export const analyzeJobMatch = async (jobDescription: string): Promise<JobMatchResult> => {
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      matchScore: { type: Type.INTEGER, description: "0-100 score" },
      justification: { type: Type.STRING, description: "Technical analysis of fit" },
      missingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Critical technical gaps (e.g. 'Kubernetes', 'CUDA')" },
      atsKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "High-value tech keywords from JD" },
      recommendedBulletPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 engineering-focused resume bullets linking Ayush's work to the JD" },
    },
    required: ["matchScore", "justification", "missingSkills", "atsKeywords", "recommendedBulletPoints"],
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_SMART,
      contents: `Perform a deep technical gap analysis of this Job Description against Ayush's profile:\n\n${jobDescription}\n\nFocus on: ML Frameworks, Cloud Infra, and System Design capabilities.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Match Error:", error);
    throw new Error("Failed to analyze job match.");
  }
};

export const generateCoverLetter = async (jobDescription: string, companyName?: string): Promise<string> => {
  const prompt = `
    Write a high-impact, engineering-focused cover letter for Ayush Raj for the following job:
    ${jobDescription}
    ${companyName ? `Company: ${companyName}` : ''}
    
    Structure:
    1. **The Hook**: Immediately state interest and relevance to their specific ML stack.
    2. **The Meat**: Connect specific projects (e.g., KwixLab, Nexus.ai) to their engineering challenges (e.g., "I see you use RAG; in my Nexus.ai project, I solved context window limits by...").
    3. **The Closer**: Confident, ready to ship code.
    
    Keep it under 300 words. Output pure text, no markdown code blocks.
  `;

  const response = await ai.models.generateContent({
    model: MODEL_FAST,
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION },
  });

  return response.text || "Could not generate cover letter.";
};

export const explainProject = async (projectName: string, mode: 'simple' | 'tech' | 'interview'): Promise<string> => {
  let modePrompt = "";
  if (mode === 'simple') modePrompt = "Explain this project's value proposition to a non-technical Product Manager in 3 bullet points.";
  if (mode === 'tech') modePrompt = "Explain the System Architecture, Tech Stack decisions, and Engineering Trade-offs (e.g., latency vs accuracy). Be highly technical.";
  if (mode === 'interview') modePrompt = "Simulate a STAR (Situation, Task, Action, Result) response for a Senior ML Engineer interview. Focus on metrics and impact.";

  const prompt = `Focusing on the project "${projectName}", ${modePrompt}`;

  const response = await ai.models.generateContent({
    model: MODEL_FAST,
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION },
  });

  return response.text || "Could not explain project.";
};

export interface InterviewQ {
  question: string;
  answer: string;
  type: string;
}

export const generateInterviewPrep = async (role: string): Promise<InterviewQ[]> => {
  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        answer: { type: Type.STRING, description: "A concise, engineering-focused answer referencing Ayush's projects." },
        type: { type: Type.STRING, enum: ["System Design", "ML Theory", "Coding/Algo", "Behavioral"] },
      },
      required: ["question", "answer", "type"]
    }
  };

  const response = await ai.models.generateContent({
    model: MODEL_SMART,
    contents: `Generate 5 challenging interview questions for a ${role} position. 
    Must include:
    - 2 ML System Design questions (e.g. "Design a RAG pipeline")
    - 2 Deep Technical questions (e.g. "Transformers vs LSTMs")
    - 1 Engineering Behavioral question.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  return JSON.parse(response.text || "[]");
};