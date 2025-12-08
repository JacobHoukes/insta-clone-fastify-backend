import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { postsService } from "./posts.service"
import { z } from "zod"

const createPostSchema = z.object({
    caption: z.string().min(1, "Caption cannot be empty.").optional(),
})

const postsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = postsService(fastify)

    fastify.post("/posts", async (request, reply) => {
        if (!request.isMultipart()) {
            reply.code(415).send({ message: "Request must be multipart" })
            return
        }

        let caption = ""
        let imageFile: { buffer: Buffer; filename: string } | undefined

        const incomingFormData = request.parts()

        for await (const part of incomingFormData) {
            if (part.type === "field" && part.fieldname === "caption") {
                caption = part.value as string
            } else if (part.type === "file") {
                const buffers: Buffer[] = []
                for await (const chunk of part.file) {
                    buffers.push(chunk)
                }
                imageFile = {
                    buffer: Buffer.concat(buffers),
                    filename: part.filename,
                }
            }
        }
        const newPost = await service.create({
            caption,
            imageFile,
        })

        return reply.code(201).send(newPost)
    })

    fastify.get("/posts", async (request, reply) => {
        const posts = fastify.transactions.posts.getAll()
        return reply.code(200).send(posts)
    })

    fastify.delete("/posts/:id", async (request, reply) => {
        const { id } = request.params as { id: string }

        try {
            fastify.transactions.posts.delete(Number(id))

            return reply.code(204).send()
        } catch (error) {
            return reply.code(404).send({ message: "Failed to delete post" })
        }
    })
}

export { postsRoutes }
