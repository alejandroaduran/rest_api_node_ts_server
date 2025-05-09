/* describe("Nuestro primer test", () => {
    test("debe revisar 1+1=2", () => {
        expect(1 + 1).toBe(2)
    })

    test("debe revisar 1+1 != 3", () => {
        expect(1 + 1).not.toBe(3)
    })
}) */

import request from "supertest";
import server from "../server";

describe("GET /api", () => {
    test("should send a JSON response", async () => {
        const res = await request(server).get("/api")
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/)
        expect(res.body.msg).toBe("Desde API")
        
        expect(res.status).not.toBe(404)
    })
})