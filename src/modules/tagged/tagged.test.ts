import Fastify from "fastify"
import { taggedRoutes } from "./tagged.routes"

describe("GET /tagged/grid", () => {
    it("should return a list of tagged items with a 200 status code", async () => {
        const app = Fastify()

        const mockTagged = [
            {
                id: 1,
                img_url: "http://example.com/img1.jpg",
                caption: "Tagged post 1",
                tagged_user_id: 2,
                created_at: "2025-01-01 10:00:00",
            },
            {
                id: 2,
                img_url: "http://example.com/img2.jpg",
                caption: "Tagged post 2",
                tagged_user_id: 2,
                created_at: "2025-01-01 10:05:00",
            },
        ]

        app.decorate("transactions", {
            tagged: {
                getAll: jest.fn().mockReturnValue(mockTagged),
                getById: jest.fn(),
            },
        } as any)

        app.register(taggedRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/tagged/grid",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockTagged)
    })
})

describe("GET /tagged/:id", () => {
    it("should return a tagged item by id with a 200 status code", async () => {
        const app = Fastify()

        const taggedItem = {
            id: 5,
            img_url: "http://example.com/img5.jpg",
            caption: "Tagged item",
            tagged_user_id: 2,
            created_at: "2025-01-01 12:00:00",
        }

        app.decorate("transactions", {
            tagged: {
                getAll: jest.fn(),
                getById: jest.fn().mockReturnValue(taggedItem),
            },
        } as any)

        app.register(taggedRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/tagged/5",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(taggedItem)
    })
})
