import { Toaster } from "@/components/ui/sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "bg-linear-to-b from-neutral-700 to-neutral-800 font-sans text-white text-base rounded-xl border border-neutral-900 p-2 flex items-center gap-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
          title: "text-sm whitespace-nowrap pr-3",
          description: "text-sm pr-3",
        },
      }}
    />
  );
}
