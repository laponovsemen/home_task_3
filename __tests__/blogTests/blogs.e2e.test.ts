// @ts-ignore
import request from "supertest"
import {app} from "../../src/settings";
import {before} from "node:test";


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
            websiteUrl : "https://samurai.it-incubator.io/pc",
            createdAt : expect.any(String),
            isMembership : false
        })
    })

    it("should return STATRUS CODE 401 and created  blogs //Authorization field is incorrect", async () => {
        request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .post("/blogs")
            .set(auth, ";errrrwwrwerwrwrwerrwerewrewredllfkklbklhsdl")
            .send({
                name : "string", //maxLength: 15
                description : "string",// maxLength: 500
                websiteUrl : "https://samurai.it-incubator.io/pc/video-content/watch/6255d0837db18afb3691560d" // maxLength: 100 pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
            })
            .expect(401)

    })



})