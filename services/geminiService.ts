import { GoogleGenAI } from "@google/genai";
import { VideoFormat } from "../types";

export const checkApiKey = async (): Promise<boolean> => {
  const aistudio = (window as any).aistudio;
  if (aistudio) {
    return await aistudio.hasSelectedApiKey();
  }
  return false;
};

export const promptApiKeySelection = async (): Promise<void> => {
  const aistudio = (window as any).aistudio;
  if (aistudio) {
    await aistudio.openSelectKey();
  } else {
    console.error("AI Studio environment not detected.");
  }
};

export const generateVideo = async (
  prompt: string, 
  format: VideoFormat
): Promise<string> => {
  try {
    // Ensure we have a key selected before initializing
    const hasKey = await checkApiKey();
    if (!hasKey) {
      await promptApiKeySelection();
      // Assume success after modal interaction
    }

    // Initialize AI with the environment key (injected by the platform)
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const resolution = format === VideoFormat.Landscape ? '1080p' : '720p';

    // Start generation operation
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p', // Using 720p for speed in preview
        aspectRatio: format
      }
    });

    // Poll for completion
    while (!operation.done) {
      // Poll every 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
      console.log("Polling Veo status...", operation.metadata);
    }

    if (operation.error) {
      throw new Error(operation.error.message || "Unknown generation error");
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    
    if (!videoUri) {
      throw new Error("No video URI returned");
    }

    // The response URI needs the API Key appended to be playable
    return `${videoUri}&key=${process.env.API_KEY}`;

  } catch (error) {
    console.error("Video generation failed:", error);
    throw error;
  }
};