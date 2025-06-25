"use server";

import { db } from "@/database";
import { type IntegrationStrategy } from "@/database/schema";

import { env } from "@/lib/env/server";

import { getCurrentUser } from "@/features/auth/actions/user";

import { getIntegrationByUserIdAndStrategy, insertIntegration } from "./services";

export async function addNewIntegration(strategy: IntegrationStrategy, code: string) {
  try {
    const { userId } = await getCurrentUser();

    if (!userId) {
      throw new Error("Not authorized");
    }

    const agent = await db.query.AgentTable.findFirst({
      where: (AgentTable, { eq }) => eq(AgentTable.userId, userId),
      columns: {
        id: true,
      },
    });

    if (!agent) {
      throw new Error("Agent not found");
    }

    const integration = await getIntegrationByUserIdAndStrategy(userId, strategy);

    if (!integration) {
      const token = await generateInstagramAccessToken(code);

      if (!token) {
        throw new Error("Could not generate access token");
      }

      const instagramIdResponse = await fetch(
        `${env.META_INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`,
      );
      const data = await instagramIdResponse.json();
      console.log("✅ data", data);
      const instagramId = data.user_id;
      console.log("✅ instagramId", instagramId);

      const today = new Date();
      const expirationDate = today.setDate(today.getDate() + 60);

      await insertIntegration({
        name: "instagram",
        userId,
        agentId: agent.id,
        token: token.access_token,
        entityId: instagramId,
        expiresAt: new Date(expirationDate),
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not add new integration");
  }
}

async function generateInstagramAccessToken(code: string) {
  const token = await getInstagramShortLivedToken(code);

  if (token.error_message) {
    console.error("❌ token", token.error_message);
    throw new Error(token.error);
  }

  if (token.permissions.length > 0) {
    console.log(token, "got permissions");
    const longToken = await fetch(
      `${env.META_INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${env.META_INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`,
    );
    return longToken.json();
  }
}

async function getInstagramShortLivedToken(code: string) {
  const formData = new FormData();
  formData.append("client_id", env.META_INSTAGRAM_CLIENT_ID);
  formData.append("client_secret", env.META_INSTAGRAM_CLIENT_SECRET);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", `${env.PUBLIC_URL}/callbacks/instagram`);
  formData.append("code", code);

  const response = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log("🌐 short lived token data", data);
  return data;
}
