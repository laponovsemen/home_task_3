// @ts-ignore
import request from "supertest"
import {app} from "../../src/settings";
import {before} from "node:test";
export const auth = 'Authorization'
export const basic = 'Basic YWRtaW46cXdlcnR5'
describe("POSTS ROUTE", () => {
    it("should return all posts", async () => {
        await request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .get("/posts")
            .expect(200)
        expect(result.body).toEqual([])
    })
})

