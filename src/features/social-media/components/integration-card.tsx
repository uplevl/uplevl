"use client";

import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { INTEGRATION_STRATEGIES, type IntegrationStrategy } from "@/database/schema";

import { env } from "@/lib/env/client";

import { ConfirmAlert } from "@/components/confirm-alert";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { deleteIntegration } from "@/features/social-media/api/mutations";

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
  const router = useRouter();
  const { mutate: disconnectIntegration, isPending: isDisconnecting } = useMutation({
    mutationFn: deleteIntegration,
    onSuccess: () => {
      toast.success(`Successfully disconnected from ${title}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Could not disconnect from the account. Please try again later.");
    },
  });

  async function handleConnect() {
    if (strategy === INTEGRATION_STRATEGIES.INSTAGRAM) {
      return router.push(env.NEXT_PUBLIC_META_INSTAGRAM_EMBEDDED_OAUTH_URL);
    }
  }

  async function handleDisconnect() {
    if (!integrationId) return;
    disconnectIntegration(integrationId);
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
                onConfirmAction={handleDisconnect}
                cancelLabel="No, keep it"
                confirmLabel="Yes, disconnect"
              >
                <LoadingButton variant="outline" isLoading={isDisconnecting}>
                  <Trash2Icon className="size-4" />
                  <span>Disconnect</span>
                </LoadingButton>
              </ConfirmAlert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
