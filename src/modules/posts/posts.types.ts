import { z } from "zod"

// First, we define the zod schemas
const createPostDtoSchema = z.object({
    img_url: z.string().url(),
    caption: z.string().nullable().optional(), // Caption can be a string, null, or undefined
})

const postSchema = z.object({
    id: z.number(),
    img_url: z.string().url(),
    caption: z.string().nullable(),
    created_at: z.string(), // SQLite returns DATETIME as a string by default
})

// NEW: schema for deleting a post
const deletePostDtoSchema = z.object({
    id: z.number().min(1),
})

// This will be useful for validating the response from the `GET /posts` endpoint.
const postsSchema = z.array(postSchema)

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type CreatePostDto = z.infer<typeof createPostDtoSchema>
type Post = z.infer<typeof postSchema>
type DeletePostDto = z.infer<typeof deletePostDtoSchema>

export {
    createPostDtoSchema,
    postSchema,
    postsSchema,
    deletePostDtoSchema,
    CreatePostDto,
    Post,
    DeletePostDto,
}
