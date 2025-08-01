import { relations } from "drizzle-orm";

import { AgentTable } from "./agents.schema";
import { IntegrationTable } from "./integrations.schema";
import { OfferingPriceTable } from "./offerings-prices.schema";
import { OfferingTable } from "./offerings.schema";
import { PackageFeatureTable } from "./packages-features.schema";
import { PackageTable } from "./packages.schema";
import { PostsCommentsTable } from "./posts-comments.schema";
import { PostTable } from "./posts.schema";
import { SessionSummaryTable } from "./sessions-summaries";
import { SessionTable } from "./sessions.schema";
import { UserTable } from "./users.schema";

export const agentRelations = relations(AgentTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [AgentTable.userId],
    references: [UserTable.id],
  }),
  offerings: many(OfferingTable),
  integrations: many(IntegrationTable),
  sessions: many(SessionTable),
  posts: many(PostTable),
  postsComments: many(PostsCommentsTable),
}));

export const integrationRelations = relations(IntegrationTable, ({ one, many }) => ({
  agent: one(AgentTable, {
    fields: [IntegrationTable.agentId],
    references: [AgentTable.id],
  }),
  user: one(UserTable, {
    fields: [IntegrationTable.userId],
    references: [UserTable.id],
  }),
  postsComments: many(PostsCommentsTable),
}));

export const offeringRelations = relations(OfferingTable, ({ one, many }) => ({
  agent: one(AgentTable, {
    fields: [OfferingTable.agentId],
    references: [AgentTable.id],
  }),
  prices: many(OfferingPriceTable),
}));

export const offeringPriceRelations = relations(OfferingPriceTable, ({ one }) => ({
  offering: one(OfferingTable, {
    fields: [OfferingPriceTable.offeringId],
    references: [OfferingTable.id],
  }),
}));

export const packageRelations = relations(PackageTable, ({ many }) => ({
  features: many(PackageFeatureTable),
  users: many(UserTable),
}));

export const packageFeatureRelations = relations(PackageFeatureTable, ({ one }) => ({
  package: one(PackageTable, {
    fields: [PackageFeatureTable.packageId],
    references: [PackageTable.id],
  }),
}));

export const postRelations = relations(PostTable, ({ one }) => ({
  agent: one(AgentTable, {
    fields: [PostTable.agentId],
    references: [AgentTable.id],
  }),
  user: one(UserTable, {
    fields: [PostTable.userId],
    references: [UserTable.id],
  }),
}));

export const postsCommentsRelations = relations(PostsCommentsTable, ({ one }) => ({
  integration: one(IntegrationTable, {
    fields: [PostsCommentsTable.integrationId],
    references: [IntegrationTable.id],
  }),
  agent: one(AgentTable, {
    fields: [PostsCommentsTable.agentId],
    references: [AgentTable.id],
  }),
}));

export const sessionRelations = relations(SessionTable, ({ one, many }) => ({
  agent: one(AgentTable, {
    fields: [SessionTable.agentId],
    references: [AgentTable.id],
  }),
  sessionSummaries: many(SessionSummaryTable),
}));

export const sessionSummaryRelations = relations(SessionSummaryTable, ({ one }) => ({
  session: one(SessionTable, {
    fields: [SessionSummaryTable.sessionId],
    references: [SessionTable.id],
  }),
}));

export const userRelations = relations(UserTable, ({ one, many }) => ({
  package: one(PackageTable, {
    fields: [UserTable.packageId],
    references: [PackageTable.id],
  }),
  agent: one(AgentTable, {
    fields: [UserTable.id],
    references: [AgentTable.userId],
  }),
  posts: many(PostTable),
}));
