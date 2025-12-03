import type { FastifyInstance, FastifyPluginOptions } from "fastify"
import { createHighlightsService } from "./highlights.service"

export async function highlightsRoutes(
    app: FastifyInstance,
    _opts: FastifyPluginOptions
) {
    const highlightsService = createHighlightsService(app.transactions)

    app.get("/highlights/grid", async (_request, reply) => {
        const highlights = await highlightsService.getAll()
        reply.send(highlights)
    })

    app.get<{ Params: { id: string } }>(
        "/highlights/:id",
        async (request, reply) => {
            const id = Number(request.params.id)
            const highlight = await highlightsService.getById(id)
            reply.send(highlight)
        }
    )
}
