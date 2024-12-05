import { ChatOllama } from "@langchain/ollama";

const ai = new ChatOllama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama3.2", // Default value
});

export const getAiResponse = async (message: string) => {
  console.log({ message });
  const response = await ai.invoke(message);
  return response;
};
