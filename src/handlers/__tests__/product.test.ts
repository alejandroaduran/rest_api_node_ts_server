import request from "supertest";
import server from "../../server";

describe("Post /api/products", () => {
    it("should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({})
        expect(response.status).toBe(400) //bad request
        expect(response.body).toHaveProperty("errors")
    })


    it("should display validation errors for invalid price", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Test Product",
            price: -10
        })
        expect(response.status).toBe(400) //bad request
        expect(response.body).toHaveProperty("errors")
    })

    it("should create a new product", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Test Product",
            price: 50
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("data")

        expect(response.status).not.toBe(500)
        expect(response.body).not.toHaveProperty("error")
    })
})

describe("Get /api/products", () => {
    it("get a JSON response with products", async () => {
        const response = await request(server).get("/api/products")
        expect(response.status).toBe(200) //ok
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toBeInstanceOf(Array)
        expect(response.body.data.length).toBeGreaterThan(0)

        expect(response.body).not.toHaveProperty("error")
        expect(response.status).not.toBe(500)
    })
})
