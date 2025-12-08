import type { Database } from "better-sqlite3"
import { stat } from "node:fs/promises"
import { CreatePostDto, DeletePostDto } from "src/modules/posts/posts.types"

// This factory function creates and returns the transaction helpers.
const createTransactionHelpers = (db: Database) => {
    // Prepared statements used for security and performance.
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare(
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),
        deletePost: db.prepare("DELETE FROM posts WHERE id = @id"),
        getAllReels: db.prepare("SELECT * FROM reels"),
        getAllTagged: db.prepare("SELECT * FROM tagged"),
        getTaggedById: db.prepare("SELECT * FROM tagged WHERE id = ?"),
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
        getHighLightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
    }

    const posts = {
        getById: (id: number) => {
            return statements.getPostById.get(id)
        },
        getAll: () => {
            return statements.getAllPosts.all()
        },
        create: (data: CreatePostDto) => {
            return statements.createPost.get(data)
        },
        delete: (data: DeletePostDto) => {
            return statements.deletePost.run(data)
        },
    }

    const reels = {
        getAll: () => statements.getAllReels.all(),
    }

    const tagged = {
        getAll: () => statements.getAllTagged.all(),
        getById: (id: number) => statements.getTaggedById.get(id),
    }

    const highlights = {
        getAll: () => statements.getAllHighlights.all(),
        getById: (id: number) => statements.getHighLightById.get(id),
    }

    return {
        posts,
        reels,
        tagged,
        highlights,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
export { createTransactionHelpers }
