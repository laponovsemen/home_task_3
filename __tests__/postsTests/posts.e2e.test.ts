// @ts-ignore
import request from "supertest"
import {app} from "../../src/settings";
import {before} from "node:test";

describe("POSTS ROUTE", () => {
    it("should return all posts", async () => {
        const result = await request(app)
            .get("/posts")
            .expect(200)
        expect(result.body).toEqual([])
    })
})

