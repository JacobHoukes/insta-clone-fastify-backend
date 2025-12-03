import Fastify from "fastify"
import { highlightsRoutes } from "./highlights.routes"

describe("GET /highlights/grid", () => {
    it("should return a list of highlights with a 200 status code", async () => {
        const app = Fastify()

        const mockHighlights = [
            {
                id: 1,
                image_url: "http://example.com/hl1.jpg",
                caption: "Highlight 1",
                user_id: 3,
            },
            {
                id: 2,
                image_url: "http://example.com/hl2.jpg",
                caption: "Highlight 2",
                user_id: 3,
            },
        ]

        app.decorate("transactions", {
            highlights: {
                getAll: jest.fn().mockReturnValue(mockHighlights),
                getById: jest.fn(),
            },
        })

        app.register(highlightsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/highlights/grid",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockHighlights)
    })
})

describe("GET /highlights/:id", () => {
    it("should return a single highlight with a 200 status code", async () => {
        const app = Fastify()

        const highlight = {
            id: 3,
            image_url: "http://example.com/hl3.jpg",
            caption: "Highlight 3",
            user_id: 3,
        }

        app.decorate("transactions", {
            highlights: {
                getAll: jest.fn(),
                getById: jest.fn().mockReturnValue(highlight),
            },
        })

        app.register(highlightsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/highlights/3",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(highlight)
    })
})
