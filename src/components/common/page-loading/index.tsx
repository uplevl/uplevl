import { Spinner } from "../spinner";

export function PageLoading() {
  return (
    <div className="flex items-center justify-center p-20">
      <Spinner />
    </div>
  );
}
