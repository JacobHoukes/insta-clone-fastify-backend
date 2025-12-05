import type { FastifyInstance } from "fastify"
import { CreatePostDto } from "./posts.types"
import { fileStorageService } from "../../common/file-storage.service"

// this service takes a caption and optional image file
// saves image to hard drive if provided
// saves caption and image URL to database
// returns created post

type CreatePostServiceArgs = {
    caption: string
    imageFile?: { buffer: Buffer; filename: string } //the ? means optional
}

const postsService = (fastify: FastifyInstance) => {
    return {
        create: async (data: CreatePostServiceArgs) => {
            fastify.log.info("Creating a new post")

            let img_url = ""

            if (data.imageFile) {
                img_url = await fileStorageService.saveImage(
                    data.imageFile.buffer,
                    data.imageFile.filename
                )
            }

            const postData: CreatePostDto = {
                img_url,
                caption: data.caption,
            }

            const post = await fastify.transactions.posts.create(postData)
            return post
        },
    }
}

export { postsService }
