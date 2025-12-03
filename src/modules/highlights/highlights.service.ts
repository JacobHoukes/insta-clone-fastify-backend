import type { TransactionHelpers } from "src/core/database/database.transactions"
import type { Highlight } from "./highlights.types"

export function createHighlightsService(transactions: TransactionHelpers) {
    async function getAll(): Promise<Highlight[]> {
        return transactions.highlights.getAll() as Highlight[]
    }

    async function getById(id: number): Promise<Highlight | undefined> {
        return transactions.highlights.getById(id) as Highlight
    }

    return {
        getAll,
        getById,
    }
}
