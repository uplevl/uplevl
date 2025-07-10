"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type FieldValues, type SubmitHandler, useFormContext, useFormState } from "react-hook-form";
import { toast } from "sonner";

import { ConfirmAlert } from "../confirm-alert";
import { LoadingButton } from "../loading-button";
import { Button } from "../ui/button";

interface ActionButtonProps {
  submitLabel: string;
  onSubmit: () => Promise<void>;
  onDismiss: () => void;
  isSubmitting: boolean;
  isDirty: boolean;
}

/**
 * Action button component that receives form state as props
 */
function ActionButton({ submitLabel, onSubmit, onDismiss, isSubmitting, isDirty }: ActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await onSubmit();
      onDismiss();
    } catch (error) {
      // Error handling is done by the form's onSubmit
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [onSubmit, onDismiss]);

  return (
    <LoadingButton
      type="submit"
      disabled={!isDirty || isSubmitting}
      isLoading={isLoading || isSubmitting}
      onClick={handleSubmit}
    >
      {submitLabel}
    </LoadingButton>
  );
}

interface FormActionsProps<T extends FieldValues = FieldValues> {
  submitLabel?: string;
  cancelLabel?: string;
  confirmTitle?: string;
  confirmDescription?: string;
  confirmCancelLabel?: string;
  confirmConfirmLabel?: string;
  onSubmit: SubmitHandler<T>;
}

export default function FormActions<T extends FieldValues = FieldValues>({
  submitLabel = "Save",
  cancelLabel = "Cancel",
  confirmTitle = "Are you sure you want to cancel?",
  confirmDescription = "This action cannot be undone.",
  confirmCancelLabel = "No, stop it",
  confirmConfirmLabel = "Yes, I'm sure",
  onSubmit,
}: FormActionsProps<T>) {
  const toastId = useRef<string | number | null>(null);
  const form = useFormContext<T>();
  const { isSubmitting, isDirty } = useFormState(form);

  const dismissToast = useCallback(() => {
    if (!toastId.current) return;

    toast.dismiss(toastId.current);
    toastId.current = null;
  }, []);

  const handleSubmit = useCallback(async () => {
    await form.handleSubmit(onSubmit)();
  }, [form, onSubmit]);

  const handleCancel = useCallback(() => {
    form.reset();
    dismissToast();
  }, [form, dismissToast]);

  const showToast = useCallback(() => {
    // Only show toast if one doesn't already exist
    if (toastId.current) return;

    toastId.current = toast.info("You have unsaved changes", {
      position: "bottom-center",
      duration: Infinity,
      action: (
        <ActionButton
          submitLabel={submitLabel}
          onSubmit={handleSubmit}
          onDismiss={dismissToast}
          isSubmitting={isSubmitting}
          isDirty={isDirty}
        />
      ),
      cancel: (
        <ConfirmAlert
          title={confirmTitle}
          description={confirmDescription}
          cancelLabel={confirmCancelLabel}
          confirmLabel={confirmConfirmLabel}
          onConfirm={handleCancel}
        >
          <Button variant="outline" type="button" disabled={isSubmitting}>
            {cancelLabel}
          </Button>
        </ConfirmAlert>
      ),
    });
  }, [
    submitLabel,
    cancelLabel,
    handleSubmit,
    handleCancel,
    dismissToast,
    isSubmitting,
    isDirty,
    confirmTitle,
    confirmDescription,
    confirmCancelLabel,
    confirmConfirmLabel,
  ]);

  useEffect(() => {
    if (isDirty && !isSubmitting) {
      showToast();
      return;
    }

    if (!isDirty && toastId.current) {
      // Dismiss toast when form is no longer dirty
      toast.dismiss(toastId.current);
      toastId.current = null;
    }
  }, [isDirty, isSubmitting, showToast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!toastId.current) return;

      toast.dismiss(toastId.current);
    };
  }, []);

  return null;
}
