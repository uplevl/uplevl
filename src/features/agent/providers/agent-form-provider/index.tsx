"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { AgentUpdateSchema } from "@/database/schema";

import FormActions from "@/components/form-actions";
import { Form } from "@/components/ui/form";

import { updateAgent } from "../../actions/agent";
import { useAgent } from "../agent-provider";

const FormSchema = AgentUpdateSchema.omit({
  isActive: true,
  userId: true,
});

export type FormValues = z.infer<typeof FormSchema>;

interface AgentFormProviderProps {
  children: React.ReactNode;
}

export function AgentFormProvider({ children }: AgentFormProviderProps) {
  const agent = useAgent();

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
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {children}
        <FormActions onSubmit={handleSubmit} />
      </form>
    </Form>
  );
}
