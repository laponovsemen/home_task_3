// @ts-ignore
import request from "supertest"
import {app} from "../../src/settings";
import {before} from "node:test";
export const auth = 'Authorization'
export const basic = 'Basic YWRtaW46cXdlcnR5'

//POSTS ROUTE
describe("TESTING OF CREATING POST BY ID", () => {
    it("should create post", async () => {
        await request(app).delete("/testing/all-data").set(auth, basic)
        const createdBlog = await request(app)
            .post("/blogs")
            .set(auth, basic)
            .send({"name":"new blog",
                "description":"description",
                "websiteUrl":"https://github.com/",
                })
            .expect(201)
        const blogId = createdBlog.body.id
        const result = await request(app)
            .post("/posts")
            .set(auth, basic)
            .send({"content":"new post content",
                "shortDescription":"description",
                "title":"post title",
                "blogId":`${blogId}`})
            .expect(201)
        expect(result.body).toEqual([])
    })
    /*it("should create post", async () => {
        await request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .post("/posts")
            .set(auth, basic)
            .send({"content":"new",
                "shortDescription":"description",
                "title":"post",
                "blogId":"64388d4e9a8e0932536af30e"})
            .expect(400)
        expect(result.body).toEqual([])
    })*/
})



