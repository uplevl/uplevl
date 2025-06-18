import type * as schema from "@/database/schema";

/**
 * Base input interface for integration-based agent interactions.
 * Contains essential information needed for processing messages from external integrations.
 */
export interface IntegrationInput {
  /** Unique identifier of the user initiating the interaction */
  userId: string;
  /** Identifier of the sender in the external integration system */
  senderId: string;
  /** The actual message content to be processed */
  message: string;
  /** Authentication token for the integration */
  token: string;
}

/**
 * Extended input interface for handling comment-specific interactions.
 * Adds comment identification to the base integration input.
 */
export interface IntegrationCommentInput extends IntegrationInput {
  /** Unique identifier of the comment being processed */
  commentId: string;
}

/**
 * Represents the type of message being processed.
 * Used to distinguish between direct messages and comments in integrations.
 */
export type MessageType = "message" | "comment";

/**
 * Properties for running a website-based agent.
 * Used when the agent needs to interact with web content.
 */
interface RunWebsiteAgentProps {
  /** Indicates this is a website-based agent configuration */
  type: "website";
}

/**
 * Properties for running an integration-based agent, specifically for Instagram.
 * Contains configuration for handling both direct messages and comments.
 */
interface RunIntegrationInstagramAgentProps {
  /** Indicates this is an integration-based agent configuration */
  type: "integration";
  /** The integration strategy to be used */
  integration: schema.IntegrationStrategy;
  /** Specifies whether this is a direct message or comment interaction */
  messageType: MessageType;
  /** Input data for the integration, either for messages or comments */
  input: IntegrationInput | IntegrationCommentInput;
}

/**
 * Union type representing all possible agent configuration types.
 * Used to determine how an agent should be initialized and run.
 */
export type RunAgentProps = RunWebsiteAgentProps | RunIntegrationInstagramAgentProps;
