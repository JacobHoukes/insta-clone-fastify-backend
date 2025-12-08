import Fastify from "fastify"
import multipart from "@fastify/multipart"
import fastifyStatic from "@fastify/static"
import path from "path"
import { databasePlugin } from "./core/database/database.plugin"
import { postsRoutes } from "./modules/posts/posts.routes"
import { reelsRoutes } from "./modules/reels/reels.routes"
import { taggedRoutes } from "./modules/tagged/tagged.routes"
import { highlightsRoutes } from "./modules/highlights/highlights.routes"

const fastify = Fastify({
    logger: true,
})

fastify.register(multipart)

fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), "public"),
    prefix: "/",
})

fastify.register(databasePlugin)
fastify.register(postsRoutes)
fastify.register(reelsRoutes)
fastify.register(taggedRoutes)
fastify.register(highlightsRoutes)

fastify.get("/", async (_request, _reply) => {
    return { hello: "world" }
})

const port = Number(process.env.PORT) || 3000
const host = "0.0.0.0"

const start = async () => {
    try {
        await fastify.listen({ port, host })
        console.log(`🚀 Server is now listening on http://${host}:${port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
