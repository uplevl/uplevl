"use client";

import { useFormContext } from "react-hook-form";

import { FormPanel } from "@/components/common/form-panel";
import type { FormValues } from "@/components/features/agent-settings/agent-settings-form-provider";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function BusinessForm() {
  const form = useFormContext<FormValues>();

  return (
    <FormPanel
      title="Business Information"
      description="The business information will be used to personalize your agent. Please be as accurate as possible. This will produce the best results."
    >
      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <Input {...field} value={field.value ?? ""} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="businessUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website URL</FormLabel>
            <Input {...field} value={field.value ?? ""} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="businessDescription"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Business Description</FormLabel>
            <Textarea {...field} rows={4} className="resize-none" value={field.value ?? ""} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="businessSocialGoals"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Social Media Goals & Objectives</FormLabel>
            <Textarea {...field} rows={4} className="resize-none" value={field.value ?? ""} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="businessContext"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Context Information</FormLabel>
            <Textarea {...field} rows={4} className="resize-none" value={field.value ?? ""} />
            <FormMessage />
          </FormItem>
        )}
      />
    </FormPanel>
  );
}
