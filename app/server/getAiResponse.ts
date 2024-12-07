"use server";
import { ChatOllama } from "@langchain/ollama";

const ai = new ChatOllama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama3.2", // Default value
  streaming: true,
});

export const getAiResponse = async (message: string) => {
  console.log({ message });
  // const response = await ai.invoke(message,);
  const response = await ai.stream(message);

  // for await (const chunk of response) {
  // console.log(chunk);
  // }

  return response;
};
