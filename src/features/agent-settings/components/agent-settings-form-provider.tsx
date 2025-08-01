"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod/v4";

import { AgentUpdateSchema } from "@/database/validation/agent.validation";

import FormActions from "@/components/form-actions";
import { Form } from "@/components/ui/form";

import { updateAgent } from "@/features/agent-settings/api/mutations";
import { type AgentWithOfferings } from "@/features/agent-settings/types";

const FormSchema = AgentUpdateSchema.omit({
  isActive: true,
});

export type FormValues = z.infer<typeof FormSchema>;

interface AgentSettingsFormProviderProps {
  children: React.ReactNode;
  agent: AgentWithOfferings;
}

export function AgentSettingsFormProvider({ children, agent }: AgentSettingsFormProviderProps) {
  const { mutate } = useMutation({
    mutationFn: updateAgent,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      businessName: agent.businessName,
      businessDescription: agent.businessDescription,
      businessSocialGoals: agent.businessSocialGoals,
      businessContext: agent.businessContext,
      businessUrl: agent.businessUrl,
    },
  });

  async function handleSubmit(data: FormValues) {
    mutate(
      { agentId: agent.id, ...data },
      {
        onSuccess: () => {
          toast.success("Agent updated successfully");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to update agent");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form>
        {children}
        <FormActions onSubmit={handleSubmit} />
      </form>
    </Form>
  );
}
