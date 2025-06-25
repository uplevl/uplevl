import { Spinner } from "@/components/spinner";

export function PageLoading() {
  return (
    <div className="flex items-center justify-center p-20">
      <Spinner className="size-8" />
    </div>
  );
}
