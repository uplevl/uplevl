import type { CoreMessage } from "ai";

import { addEntry, getEntry } from "@/lib/redis";

import { MESSAGE_CACHE_EXPIRATION } from "./constants";

interface AddMessagesProps {
  cacheKey: string;
  messages: CoreMessage[];
}

export async function addMessages({ cacheKey, messages }: AddMessagesProps) {
  return addEntry(cacheKey, messages, MESSAGE_CACHE_EXPIRATION);
}

export async function getMessages(cacheKey: string) {
  const result = await getEntry<CoreMessage[]>(cacheKey);
  return result ?? [];
}

// TODO: Add a functions to get and store the summary of a conversation.
