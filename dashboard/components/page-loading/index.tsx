import { Spinner } from "@@/components/spinner";

export function PageLoading() {
  return (
    <div className="flex w-full items-center justify-center self-center p-20">
      <Spinner className="size-8" />
    </div>
  );
}
