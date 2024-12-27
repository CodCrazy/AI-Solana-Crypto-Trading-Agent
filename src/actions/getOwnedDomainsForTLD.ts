import { Action } from "../types/action";
import { SolanaAgentKit } from "../agent";
import { z } from "zod";
import { PublicKey } from "@solana/web3.js";

const getOwnedDomainsForTLDAction: Action = {
  name: "solana_get_owned_domains_for_tld",
  similes: [
    "list owned domains for tld",
    "get my domains for extension",
    "fetch wallet domains by tld",
    "get owned names by extension",
    "list my domains by tld",
    "get address domains for tld"
  ],
  description: "Get all domains owned by a specific wallet address for a given top-level domain (TLD)",
  examples: [
    [
      {
        input: {
          tld: "sol"
        },
        output: {
          status: "success",
          domains: ["solana.sol", "wallet.sol", "user.sol"],
          total: 3,
          message: "Successfully retrieved owned domains for .sol"
        },
        explanation: "Get all .sol domain names owned by a specific wallet address"
      }
    ]
  ],
  schema: z.object({
    tld: z.string()
      .min(1)
      .describe("The top-level domain to filter by (e.g., 'sol', 'abc')")
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const tld = input.tld.toLowerCase();

      // Get owned domains for TLD
      const domains = await agent.getOwnedDomainsForTLD(tld);

      return {
        status: "success",
        domains,
        total: domains.length,
        message: `Successfully retrieved ${domains.length} owned domain${domains.length === 1 ? '' : 's'} for .${tld}`
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to get owned domains: ${error.message}`
      };
    }
  }
};

export default getOwnedDomainsForTLDAction; 