import Fastify from "fastify"
import { postsRoutes } from "./posts.routes"

describe("GET /posts", () => {
    it("should get all posts and return them with a 200 status code", async () => {
        const app = Fastify()

        const mockPosts = [
            {
                id: 1,
                img_url: "http://example.com/img1.png",
                caption: "first post",
            },
            {
                id: 2,
                img_url: "http://example.com/img2.png",
                caption: "second post",
            },
        ]

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn().mockReturnValue(mockPosts),
                create: jest.fn(),
            },
        } as any)

        app.register(postsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/posts",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockPosts)
    })
})

describe("POST /posts", () => {
    it("should create a new post and return it with a 201 status code", async () => {
        const app = Fastify()

        const newPostPayload = {
            img_url: "http://example.com/new-image.jpg",
            caption: "A brand new post from our test!",
        }

        const createdPost = { ...newPostPayload, id: 1 }

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn().mockReturnValue(createdPost),
            },
        } as any)

        app.register(postsRoutes)

        const response = await app.inject({
            method: "POST",
            url: "/posts",
            payload: newPostPayload,
        })

        expect(response.statusCode).toBe(201)
        expect(JSON.parse(response.payload)).toEqual(createdPost)
    })
})
