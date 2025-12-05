import type { FastifyInstance } from "fastify"
import { CreatePostDto, createPostDtoSchema } from "./posts.types"
import { fileStorageService } from "../../common/file-storage.service";

type CreatePostServiceArgs = {
  caption: string;
  imageFile?: { buffer: Buffer; filename: string };
};

const postsService = (fastify: FastifyInstance) => {
  return {
    create: async (data: CreatePostServiceArgs) => {
      fastify.log.info(`Creating a new post`)

      let img_url = "";

      if (data.imageFile) {
        img_url = await fileStorageService.saveImage(
          data.imageFile.buffer,
          data.imageFile.filename,
        );
      }

      const postData: CreatePostDto = {
        img_url,
        caption: data.caption,
      };

      const post = await fastify.transactions.posts.create(postData);
      return post;
    };
  };
};

export { postsService };
