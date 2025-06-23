import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod/v4";

import { AgentUpdateSchema } from "@/database/schema";

import { Form } from "@@/components/ui/form";

import { useAgent } from "../hooks/use-agent";

const FormSchema = AgentUpdateSchema.omit({
  isActive: true,
  userId: true,
});

export type FormValues = z.infer<typeof FormSchema>;

interface AgentFormsProviderProps {
  children: React.ReactNode;
}

export function AgentFormsProvider({ children }: AgentFormsProviderProps) {
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

  return <Form {...form}>{children}</Form>;
}
