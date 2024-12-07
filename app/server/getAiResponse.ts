"use server";
// import { ChatOllama } from "@langchain/ollama";

// const ai = new ChatOllama({
//   baseUrl: "http://localhost:11434", // Default value
//   model: "llama3.2", // Default value
//   streaming: true,
// });

// export const getAiResponse = async (message: string) => {
//   // console.log({ message });
//   // const response = await ai.invoke(message,);
//   // const responseStream = await ai.stream(message);
//   const responseStream = await ai.streamEvents(message, { version: "v1" });

//   // responseStream.getReader()
//   // for await (const chunk of response) {
//   //   responseStream.next
//   // }

//   return responseStream;
// };

import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

export const getAiResponse = async (prompt: string) => {
  const ollama = createOllama();
  const model = ollama("llama3.2");

  const stream = streamText({
    model,
    prompt,
  });

  return stream.textStream

  // for await (const textPart of textStream) {
  // console.log(textPart);
  // }
};
