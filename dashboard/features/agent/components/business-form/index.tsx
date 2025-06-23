import { Building2 } from "lucide-react";
import { useFormContext, useFormState } from "react-hook-form";

import { LoadingButton } from "@@/components/loading-button";
import { Button } from "@@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@@/components/ui/card";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@@/components/ui/form";
import { Input } from "@@/components/ui/input";
import { Textarea } from "@@/components/ui/textarea";

import type { FormValues } from "../../providers/agent-forms.provider";

export function BusinessForm() {
  const form = useFormContext<FormValues>();
  const { isSubmitting, isDirty } = useFormState(form);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="size-4" />
          <span>Business Information</span>
        </CardTitle>
        <CardDescription>
          The business information will be used to personalize your agent. Please be as accurate as possible. This will
          produce the best results.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6 pt-4">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormDescription>
                The name of your business as it appears on your website or other marketing materials.
              </FormDescription>
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
              <FormDescription>The URL of your business website.</FormDescription>
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
              <FormDescription>
                A brief description of your business. This will be used to personalize your agent.
              </FormDescription>
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
              <FormDescription>
                Describe the goals and objectives for your Social Media Manager as you would for a real employee. This
                will help the agent understand your business and how to best serve you.
              </FormDescription>
              <Textarea {...field} rows={4} className="resize-none" value={field.value ?? ""} />
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" type="button" size="sm" disabled={!isDirty}>
          Cancel
        </Button>
        <LoadingButton type="submit" size="sm" disabled={!isDirty} isLoading={isSubmitting}>
          Save
        </LoadingButton>
      </CardFooter>
    </Card>
  );
}
