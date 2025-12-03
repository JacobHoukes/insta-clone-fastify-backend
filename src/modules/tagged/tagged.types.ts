import { z } from "zod"

const taggedSchema = z.object({
    id: z.number(),
    img_url: z.string().url(),
    caption: z.string().nullable(),
    tagged_user_id: z.number(),
    created_at: z.string(),
})

type Tagged = z.infer<typeof taggedSchema>

export { taggedSchema, Tagged }
