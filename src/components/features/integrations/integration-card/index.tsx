"use client";

import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { type IntegrationStrategy } from "@/database/schema";

import { deleteIntegration } from "@/data/integrations/mutations";
import { connectOAuthAccount } from "@/data/integrations/social-accounts";

import { ConfirmAlert } from "@/components/common/confirm-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: IntegrationStrategy;
  isIntegrated: boolean;
  integrationId?: number;
}

export function IntegrationCard({
  title,
  description,
  icon,
  strategy,
  isIntegrated,
  integrationId,
}: IntegrationCardProps) {
  async function handleConnect() {
    await connectOAuthAccount(strategy);
  }

  async function handleDisconnect() {
    try {
      if (!integrationId) return;
      await deleteIntegration(integrationId);
      toast.success(`Successfully disconnected from ${title}`);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Could not disconnect from the account");
      }
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-x-5">
          <p className="text-muted-foreground text-sm">{description}</p>
          <div className="flex flex-col gap-y-2">
            <Button onClick={handleConnect} disabled={isIntegrated} className="min-w-28">
              {isIntegrated ? "Connected" : "Connect"}
            </Button>
            {isIntegrated && (
              <ConfirmAlert
                title={`Are you sure you want to disconnect from ${title}?`}
                description="This will remove Uplevl from your account and it will no longer pamper your audience."
                onConfirm={handleDisconnect}
                cancelLabel="No, keep it"
                confirmLabel="Yes, disconnect"
              >
                <Button variant="outline">
                  <Trash2Icon className="size-4" />
                  <span>Disconnect</span>
                </Button>
              </ConfirmAlert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
