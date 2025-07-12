"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod/v4";

import { AgentUpdateSchema } from "@/database/schema";

import { updateAgent } from "@/data/agent/mutations";
import { type AgentWithOfferings } from "@/data/agent/types";

import FormActions from "@/components/common/form-actions";
import { Form } from "@/components/ui/form";

const FormSchema = AgentUpdateSchema.omit({
  isActive: true,
  userId: true,
});

export type FormValues = z.infer<typeof FormSchema>;

interface AgentSettingsFormProviderProps {
  children: React.ReactNode;
  agent: AgentWithOfferings;
}

export function AgentSettingsFormProvider({ children, agent }: AgentSettingsFormProviderProps) {
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
    try {
      await updateAgent(agent.id, data);
      toast.success("Agent updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update agent");
    }
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
