import { cosmiconfig } from "cosmiconfig";

import { debug, error } from "./log";

export interface JPCMConfig {
  allowEmptyCommitMessage: boolean;
  allowReplaceAllOccurrences: boolean;
  commentChar: string; // Default comment char in the message
  gitRoot: string;
  isConventionalCommit: boolean; // Support https://www.conventionalcommits.org
  conventionalCommitPattern: string; // Conventional Commit RegExp
  ignoredBranchesPattern: string;
  ignoreBranchesMissingTickets: boolean;
  jiraTicketPattern: string; // JIRA ticket RexExp
  messagePattern: string; // Where $J is a ticket number, $M is the message
}

const defaultConfig = {
  allowEmptyCommitMessage: false,
  allowReplaceAllOccurrences: true,
  commentChar: "#",
  gitRoot: "",
  ignoredBranchesPattern: "^(master|main|dev|develop|development|release)$",
  ignoreBranchesMissingTickets: false,
  isConventionalCommit: false,
  conventionalCommitPattern: "^([a-z]+)(\\([a-z0-9.,-_ ]+\\))?!?: ([\\w \\S]+)$",
  jiraTicketPattern: "([A-Z]+-\\d+)",
  messagePattern: "[$J] $M",
} as JPCMConfig;

function resolveConfig(configPath: string): string {
  try {
    return require.resolve(configPath);
  } catch {
    return configPath;
  }
}

export async function loadConfig(configPath?: string): Promise<JPCMConfig> {
  try {
    const explorer = cosmiconfig("prepare-commit-msg", {
      searchPlaces: [
        "package.json",
        ".preparecommitmsgrc",
        ".preparecommitmsgrc.json",
        ".preparecommitmsgrc.yaml",
        ".preparecommitmsgrc.yml",
        "prepare-commit-msg.config.js",
      ],
    });

    const config = configPath ? await explorer.load(resolveConfig(configPath)) : await explorer.search();

    debug(`Loaded config: ${JSON.stringify(config)}`);

    if (config && !config.isEmpty) {
      const result = { ...defaultConfig, ...config.config };
      debug(`Used config: ${JSON.stringify(result)}`);
      return result as JPCMConfig;
    }
  } catch (err) {
    error(`Loading configuration failed with error: ${err}`);
  }

  const result = { ...defaultConfig };
  debug(`Used config: ${JSON.stringify(result)}`);
  return result;
}
