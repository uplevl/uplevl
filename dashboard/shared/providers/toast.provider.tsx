import { Toaster } from "sonner";

// import { DoubleCheckIcon, ErrorIcon, InfoIcon, WarningIcon } from "@/dashboard/shared/components/icons";
// import Spinner from "@/dashboard/shared/components/spinner";

function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        // icons={{
        //   success: <DoubleCheckIcon className="size-5" />,
        //   info: <InfoIcon className="size-5" />,
        //   warning: <WarningIcon className="size-5" />,
        //   error: <ErrorIcon className="size-5" />,
        //   loading: <Spinner className="size-5" />,
        // }}
        toastOptions={{
          classNames: {
            toast: "bg-background !font-sans text-foreground text-base !rounded-2xl !border !border-neutral-300",
            title: "text-sm",
            description: "text-sm",
          },
        }}
      />
    </>
  );
}

export default ToastProvider;
