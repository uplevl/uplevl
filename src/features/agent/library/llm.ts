import { openai } from "@ai-sdk/openai";
import { type CoreMessage, generateText } from "ai";

/**
 * Configuration object for running LLM operations.
 * Controls the behavior of the language model interaction.
 */
interface RunLLMProps {
  /** The system prompt that sets the context and behavior for the LLM */
  systemPrompt: string;
  /** Array of conversation messages to process */
  messages: CoreMessage[];
  /** Controls randomness in the output (0-1). Lower values make output more deterministic */
  temperature?: number;
}

/**
 * Executes a language model operation with the specified configuration.
 * Uses OpenAI's GPT-4-mini model to generate text based on the provided messages and system prompt.
 */
export async function runLLM(props: RunLLMProps) {
  const { systemPrompt, messages, temperature = 0.1 } = props;

  try {
    const response = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      temperature: temperature,
      messages: messages,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating LLM response:", error);
    throw new Error("Failed to generate LLM response");
  }
}

/**
 * Generates a concise summary of a conversation history.
 * Uses a higher temperature setting to allow for more creative summarization.
 */
export async function summarizeMessages(messages: CoreMessage[]) {
  return await runLLM({
    systemPrompt:
      "Summarize the key points of the conversation in a concise way that would be helpful as context for future interactions. Make it like a play by play of the conversation.",
    messages: messages,
    temperature: 0.3,
  });
}
