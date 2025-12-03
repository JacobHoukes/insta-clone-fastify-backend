// tagged.routes.test.ts

import Fastify from "fastify"

import { taggedRoutes } from "./tagged.routes"

describe("Tagged routes", () => {

    it("GET /tagged/grid – should return a list of tagged items with a 200 status code", async () => {

        const app = Fastify()

        const mockTagged = [

            {

                id: 1,

                image_url: "http://example.com/image1.jpg",

                caption: "Tagged 1",

                user_id: 42,

            },

            {

                id: 2,

                image_url: "http://example.com/image2.jpg",

                caption: "Tagged 2",

                user_id: 42,

            },

        ]

        app.decorate("transactions", {

            posts: {

                create: jest.fn(),

                getAll: jest.fn(),

                getById: jest.fn(),

            },

            reels: {

                getAll: jest.fn(),

            },

            tagged: {

                getAll: jest.fn().mockReturnValue(mockTagged),

                getById: jest.fn(),

            },

        })

        app.register(taggedRoutes)

        const response = await app.inject({

            method: "GET",

            url: "/tagged/grid",

        })

        expect(response.statusCode).toBe(200)

        expect(JSON.parse(response.payload)).toEqual(mockTagged)

    })

    it("GET /tagged/:id – should return a single tagged item by id with 200 status code", async () => {

        const app = Fastify()

        const taggedItem = {

            id: 123,

            image_url: "http://example.com/tagged123.jpg",

            caption: "Tagged item 123",

            user_id: 99,

        }

        app.decorate("transactions", {

            posts: {

                create: jest.fn(),

                getAll: jest.fn(),

                getById: jest.fn(),

            },

            reels: {

                getAll: jest.fn(),

            },

            tagged: {

                getAll: jest.fn(),

                getById: jest.fn().mockReturnValue(taggedItem),

            },

        })

        app.register(taggedRoutes)

        const response = await app.inject({

            method: "GET",

            url: /tagged/${taggedItem.id},

        })

        expect(response.statusCode).toBe(200)

        expect(JSON.parse(response.payload)).toEqual(taggedItem)

    })

})


