import type { FastifyInstance, FastifyPluginOptions } from "fastify"
import { createTaggedService } from "./tagged.service"

export async function taggedRoutes(
    app: FastifyInstance,
    _opts: FastifyPluginOptions
) {
    const taggedService = createTaggedService(app.transactions)

    app.get("/tagged/grid", async (_request, reply) => {
        const tagged = await taggedService.getAll()
        reply.send(tagged)
    })

    app.get<{ Params: { id: string } }>(
        "/tagged/:id",
        async (request, reply) => {
            const id = Number(request.params.id)
            const tagged = await taggedService.getById(id)
            reply.send(tagged)
        }
    )
}
