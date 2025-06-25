type CacheTag = "users" | "agents" | "offerings" | "sessions" | "integrations";

export function getGlobalTag(tag: CacheTag) {
  return `global:${tag}` as const;
}

export function getIdTag(tag: CacheTag, id: string) {
  return `${tag}:${id}` as const;
}
