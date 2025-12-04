import { z } from "zod"

const HighlightSchema = z.object({
    id: z.number().min(1),
    cover_image_url: z.string().url(),
    title: z.string().max(255),
})

type Highlight = z.infer<typeof HighlightSchema>

export { HighlightSchema, Highlight }
