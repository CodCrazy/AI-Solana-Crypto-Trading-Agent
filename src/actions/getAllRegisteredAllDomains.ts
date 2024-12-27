import { Action } from "../types/action";
import { SolanaAgentKit } from "../agent";
import { z } from "zod";

const getAllRegisteredAllDomainsAction: Action = {
  name: "solana_get_all_registered_all_domains",
  similes: [
    "list registered domains",
    "get all domains",
    "fetch registered domains",
    "get domain list",
    "list active domains",
    "get registered names"
  ],
  description: "Get a list of all registered domains across all TLDs",
  examples: [
    [
      {
        input: {
          limit: 100,
          offset: 0
        },
        output: {
          status: "success",
          domains: ["solana.sol", "bonk.abc", "wallet.backpack"],
          total: 3,
          message: "Successfully retrieved registered domains"
        },
        explanation: "Get the first 100 registered domains across all TLDs"
      }
    ]
  ],
  schema: z.object({
    limit: z.number()
      .positive()
      .max(1000)
      .default(100)
      .describe("Maximum number of domains to return"),
    offset: z.number()
      .nonnegative()
      .default(0)
      .describe("Number of domains to skip")
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const limit = input.limit || 100;
      const offset = input.offset || 0;

      // Get all registered domains
      const domains = await agent.getAllRegisteredAllDomains();

      // Apply pagination
      const paginatedDomains = domains.slice(offset, offset + limit);

      return {
        status: "success",
        domains: paginatedDomains,
        total: domains.length,
        message: "Successfully retrieved registered domains"
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to get registered domains: ${error.message}`
      };
    }
  }
};

export default getAllRegisteredAllDomainsAction; 