#!/usr/bin/env node
import { loadConfig } from "./config";
import * as git from "./git";
import { error, log } from "./log";

(async (): Promise<void> => {
  log("start");

  try {
    const config = await loadConfig();
    const gitRoot = git.getRoot(config.gitRoot);
    const branch = git.getBranchName(gitRoot);

    const ignored = new RegExp(config.ignoredBranchesPattern || "^$", "i");

    if (ignored.test(branch)) {
      log("The branch is ignored by the configuration rule");
      return;
    }

    const ticket = git.getJiraTicket(branch, config);

    if (ticket === null) {
      if (config.ignoreBranchesMissingTickets) {
        log("The branch does not contain a JIRA ticket and is ignored by the configuration rule");
      } else {
        error("The JIRA ticket ID not found");
      }

      return;
    }

    log(`The JIRA ticket ID is: ${ticket}`);

    git.writeJiraTicket(ticket, config);
  } catch (err: unknown) {
    if (typeof err === "string") {
      error(err);
    } else {
      error(String(err));
    }
  }

  log("done");
})();
