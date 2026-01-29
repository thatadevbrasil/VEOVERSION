import { GoogleGenAI } from "@google/genai";

// O serviço do Gemini agora pode ser usado para outras tarefas (como sugestão de títulos ou legendas),
// mas a função de gerar vídeos foi removida conforme solicitado para manter o processo manual.

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
