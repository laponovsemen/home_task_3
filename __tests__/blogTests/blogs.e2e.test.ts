// @ts-ignore
import request from "supertest"
import {app} from "../../src/settings";
import {before} from "node:test";
import exp = require("constants");


const auth = 'Authorization'
const basic = 'Basic YWRtaW46cXdlcnR5'

//BLOGS ROUTE
describe("TESTING OF GETTING ALL BLOGS", () => {
    it("should return all blogs //auth is correct", async () => {
        request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .get("/posts")
            .expect(200)
        expect(result.body).toEqual([])
    })
    it("should return all blogs //auth is incorrect", async () => {
        request(app).delete("/testing/all-data")
        const result = await request(app)
            .get("/posts")
            .expect(200)
        expect(result.body).toEqual([])
    })


})

describe("TESTING OF CREATING BLOGS", () => {
    it("should return STATRUS CODE 201 and created  blogs //Authorization field is correct", async () => {
        request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .post("/blogs")
            .set(auth, basic)
            .send({
                name : "string", //maxLength: 15
                description : "string",// maxLength: 500
                websiteUrl : "https://samurai.it-incubator.io/pc" // maxLength: 100 pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
            })
            .expect(201)
        expect(result.body).toEqual({
            id : expect.any(String),
            name : "string", //maxLength: 15
            description : "string",// maxLength: 500
            websiteUrl : "https://samurai.it-incubator.io/pc",// maxLength: 100 pattern
            createdAt : expect.any(String),
            isMembership : false
        })
    })
    it("should return STATRUS CODE 401 //Authorization field is incorrect", async () => {
        request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .post("/blogs")
            .set(auth, "")
            .send({
                name : "string", //maxLength: 15
                description : "string",// maxLength: 500
                websiteUrl : "https://samurai.it-incubator.io/pc/video-content/watch/6255d0837db18afb3691560d" // maxLength: 100 pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
            })
            .expect(401)
    })
    it("should return STATRUS CODE 400 //Validation field is incorrect, name and description is empty", async () => {
        request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .post("/blogs")
            .set(auth, basic)
            .send({
                name : "", //maxLength: 15
                description : "",// maxLength: 500
                websiteUrl : "https://samurai.it-incubator.io/pc/video-content/watch/6255d0837db18afb3691560d" // maxLength: 100 pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
            })
            .expect(400)
        expect(result.body).toEqual({"errorsMessages": [{"field": "name", "message": "the length of name field is less than 1 chars "},
                {"field": "description", "message": "the length of description field is less than 1"}]}
        )
    })
    it("should return STATRUS CODE 400 //Validation field is incorrect, name is empty", async () => {
        request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .post("/blogs")
            .set(auth, basic)
            .send({
                name : "", //maxLength: 15
                description : "dsfsd",// maxLength: 500
                websiteUrl : "https://samurai.it-incubator.io/pc/video-content/watch/6255d0837db18afb3691560d" // maxLength: 100 pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
            })
            .expect(400)
        expect(result.body).toEqual({"errorsMessages": [{"field": "name", "message": "the length of name field is less than 1 chars "}]}
        )
    })
    it("should return STATRUS CODE 400 //Validation field is incorrect, WebUrl is incrrect", async () => {
        request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .post("/blogs")
            .set(auth, basic)
            .send({
                name : "name", //maxLength: 15
                description : "dsfsd",// maxLength: 500
                websiteUrl : "htt.io/pc/video-content/watch/6255d0837db18afb3691560d" // maxLength: 100 pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
            })
            .expect(400)
        expect(result.body).toEqual({"errorsMessages": [{"field": "websiteUrl", "message": "the websiteUrl field is not URL"}]}
        )
    })
    it("should return STATRUS CODE 400 //Validation field is incorrect, all fields are empty strings", async () => {
        request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .post("/blogs")
            .set(auth, basic)
            .send({
                name : " ", //maxLength: 15
                description : " ",// maxLength: 500
                websiteUrl : " " // maxLength: 100 pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
            })
            .expect(400)
        expect(result.body).toEqual({"errorsMessages": [{"field": "name","message": "the length of name field is less than 1 chars "},
                {"field": "description", "message": "the length of description field is less than 1"},
                {"field": "websiteUrl", "message": "the websiteUrl field is not URL"}

            ]}
        )
    })
})

describe("TESTING OF GETTING BLOG BY ID", () => {
    it("should return status code 404 if blog not found is not found", async () => {
        await request(app).delete("/testing/all-data").set(auth, basic)
        await request(app).get("/blog/399482304723908").expect(404)
    })
    it("should return status code 200 if blog found found", async () => {
        await request(app).delete("/testing/all-data").set(auth, basic)
        const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
            name : "string", //maxLength: 15
            description : "string",// maxLength: 500
            websiteUrl : "https://samurai.it-incubator.io/pc"
        }).expect(201)

        const ID = createdBlog.body.id

        const result = await request(app).get(`/blogs/${ID}`)//.expect(200)
        console.log(result)
        expect(result).toEqual({
            id: ID,
            name : "string", //maxLength: 15
            description : "string",// maxLength: 500
            websiteUrl : "https://samurai.it-incubator.io/pc",
            createdAt: expect.any(String),
            isMembership: false
        })
    })
})