import type { TransactionHelpers } from "src/core/database/database.transactions";
import type { Reel } from "./reels.types";

export function createReelsService(transactions: TransactionHelpers) {
  async function getAll(): Promise<Reel[]> {
    return transactions.reels.getAll() as Reel[];
  }

  return {
    getAll,
  };
}
