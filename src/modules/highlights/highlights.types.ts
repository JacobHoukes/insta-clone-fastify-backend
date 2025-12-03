import { z } from "zod"

const HighlightSchema = z.object({
    id: z.number().min(1),
    image_url: z.string().url(),
    caption: z.string().max(255),
    user_id: z.string().uuid(),
})

type Highlight = z.infer<typeof HighlightSchema>

export { HighlightSchema, Highlight }
