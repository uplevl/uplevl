import { LoaderCircle } from "lucide-react";

export function PageLoading() {
  return (
    <div className="flex items-center justify-center p-20">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  );
}
