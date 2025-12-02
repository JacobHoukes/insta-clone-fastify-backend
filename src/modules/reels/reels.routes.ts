import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createReelsService } from "./reels.service";

export async function reelsRoutes(
  app: FastifyInstance,
  _opts: FastifyPluginOptions
) {
  const reelsService = createReelsService(app.transactions);

  app.get("/reels/grid", async (_request, reply) => {
    const reels = await reelsService.getAll();
    reply.send(reels);
  });
}

