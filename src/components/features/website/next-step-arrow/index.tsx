import { ArrowDownIcon } from "lucide-react";

export default function NextStepArrow() {
  return (
    <div className="relative mx-auto hidden items-center justify-center sm:flex">
      <div className="bg-primary/5 -m-32 flex size-48 items-center justify-center rounded-full">
        <ArrowDownIcon className="text-primary size-6" />
      </div>
    </div>
  );
}
