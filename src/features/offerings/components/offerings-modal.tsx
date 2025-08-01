"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PlusIcon, TrashIcon } from "lucide-react";
import { createContext, use, useEffect, useState } from "react";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v4";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoneyInput } from "@/components/ui/money-input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import { insertOffering, updateOffering } from "@/features/offerings/api/mutations";
import { useOfferingById } from "@/features/offerings/components/offerings-provider";

interface OfferingsModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const OfferingsModalContext = createContext<OfferingsModalContextType>({
  open: false,
  setOpen: () => {},
});

function OfferingsModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <OfferingsModalContext value={{ open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
      </Dialog>
    </OfferingsModalContext>
  );
}

function useOfferingsModal() {
  const context = use(OfferingsModalContext);

  if (!context) {
    throw new Error("useOfferingsModal must be used within an OfferingsModalProvider");
  }

  return context;
}

type OfferingsModalTriggerProps = React.ComponentProps<typeof DialogTrigger>;

function OfferingsModalTrigger(props: OfferingsModalTriggerProps) {
  const { setOpen } = useOfferingsModal();

  return <DialogTrigger {...props} onClick={() => setOpen(true)} />;
}

const priceSchema = z.object({
  id: z.number().optional(),
  tier: z
    .string()
    .max(50, "Tier must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s\-_.,]+$/, "Tier can only contain letters, numbers, spaces, and basic punctuation")
    .nullable()
    .optional(),
  price: z
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .max(999999.99, "Price must be less than 1,000,000"),
  unit: z
    .string()
    .max(20, "Unit must be less than 20 characters")
    .regex(/^[a-zA-Z0-9\s\-_.,]+$/, "Unit can only contain letters, numbers, spaces, and basic punctuation")
    .nullable()
    .optional(),
});

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_.,!?()]+$/, "Title can only contain letters, numbers, spaces, and basic punctuation"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  prices: z.array(priceSchema).min(1, "At least one price is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface OfferingsModalContentProps {
  offeringId?: number;
}

function OfferingsModalContent({ offeringId }: OfferingsModalContentProps) {
  const { setOpen } = useOfferingsModal();
  const offering = useOfferingById(offeringId ?? 0);
  const agentId = offering.agentId;
  const { mutate: doInsertOffering } = useMutation({
    mutationFn: insertOffering,
  });
  const { mutate: doUpdateOffering } = useMutation({
    mutationFn: updateOffering,
  });

  const title = offering ? "Edit Offering" : "Create Offering";
  const description = offering ? "Edit the offering details" : "Create a new offering";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: offering?.title ?? "",
      description: offering?.description ?? "",
      prices: offering?.prices ?? [{ tier: null, price: 0, unit: null }],
    },
  });

  const { isDirty, isValid, isSubmitting } = useFormState(form);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "prices",
  });

  useEffect(() => {
    if (offering) {
      form.reset({
        title: offering.title,
        description: offering.description,
        prices: offering.prices,
      });
    }
  }, [offering, form]);

  async function onSubmit(values: FormValues) {
    if (offering) {
      doUpdateOffering(
        { ...values, offeringId: offering.id },
        {
          onSuccess: () => {
            toast.success("Offering saved successfully");
            form.reset();
            setOpen(false);
          },
          onError: (error) => {
            console.error(error);
            toast.error("We could not save the offering. Please try again later.");
          },
        },
      );
    } else {
      doInsertOffering(
        {
          ...values,
          agentId: agentId,
          prices: values.prices.map((price) => ({ ...price, offeringId: 0 })), // The offeringId is set to 0 because it will be set by the function.
        },
        {
          onSuccess: () => {
            toast.success("Offering saved successfully");
            form.reset();
            setOpen(false);
          },
          onError: (error) => {
            console.error(error);
            toast.error("We could not save the offering. Please try again later.");
          },
        },
      );
    }
  }

  function handleCancel() {
    form.reset();
    setOpen(false);
  }

  return (
    <DialogContent hideCloseButton>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} className="h-12 resize-none" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="space-y-2 pb-4">
            <Label asChild>
              <h3>Prices</h3>
            </Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tier</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((arrayField, index) => (
                  <TableRow key={arrayField.id}>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`prices.${index}.tier`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`prices.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <MoneyInput {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`prices.${index}.unit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                        aria-label={`Remove price tier ${index + 1}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-right">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ tier: null, price: 0, unit: null })}
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add Price</span>
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" disabled={isSubmitting} onClick={handleCancel}>
              Cancel
            </Button>
            <LoadingButton type="submit" disabled={!isDirty || !isValid} isLoading={isSubmitting}>
              Save
            </LoadingButton>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

export { OfferingsModal, OfferingsModalTrigger, OfferingsModalContent };
