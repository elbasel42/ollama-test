import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const ollama = createOllama();
  const model = ollama("llama3.2");

  const result = streamText({
    model,
    messages,
    abortSignal: req.signal,
  });

  return result.toDataStreamResponse();
}
