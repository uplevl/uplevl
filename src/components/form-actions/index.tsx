"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type FieldValues, type SubmitHandler, useFormContext, useFormState } from "react-hook-form";
import { toast } from "sonner";

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

interface CancelButtonProps {
  cancelLabel: string;
  onDismiss: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

/**
 * Cancel button component that receives form state as props
 */
function CancelButton({ cancelLabel, onDismiss, onCancel, isSubmitting }: CancelButtonProps) {
  const handleCancel = useCallback(() => {
    onCancel();
    onDismiss();
  }, [onCancel, onDismiss]);

  return (
    <Button variant="outline" type="button" disabled={isSubmitting} onClick={handleCancel}>
      {cancelLabel}
    </Button>
  );
}

interface FormActionsProps<T extends FieldValues = FieldValues> {
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit: SubmitHandler<T>;
}

export default function FormActions<T extends FieldValues = FieldValues>({
  submitLabel = "Save",
  cancelLabel = "Cancel",
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
  }, [form]);

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
        <CancelButton
          cancelLabel={cancelLabel}
          onDismiss={dismissToast}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      ),
    });
  }, [submitLabel, cancelLabel, handleSubmit, handleCancel, dismissToast, isSubmitting, isDirty]);

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
