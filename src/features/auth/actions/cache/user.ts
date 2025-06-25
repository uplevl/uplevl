import { revalidateTag } from "next/cache";

import { getGlobalTag, getIdTag } from "@/lib/cache";

export function getUserGlobalTag() {
  return getGlobalTag("users");
}

export function getUserIdTag(id: string) {
  return getIdTag("users", id);
}

export function revalidateUserCache(id: string) {
  revalidateTag(getUserGlobalTag());
  revalidateTag(getUserIdTag(id));
}
