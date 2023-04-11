// @ts-ignore
import request from "supertest"
import {app} from "../src/settings";
import {before} from "node:test";

describe("BLOGS ROUTE", () => {
    it("should return all blogs", async () => {
        const result = await  request(app)
            .get("/blogs")
            .expect(200)
        expect(result.body).toEqual([])
    })
})

