import type { TransactionHelpers } from "src/core/database/database.transactions"
import type { Tagged } from "./tagged.types"

export function createTaggedService(transactions: TransactionHelpers) {
    async function getAll(): Promise<Tagged[]> {
        return transactions.tagged.getAll() as Tagged[]
    }

    async function getById(id: number): Promise<Tagged | undefined> {
        return transactions.tagged.getById(id) as Tagged
    }

    return {
        getAll,
        getById,
    }
}
