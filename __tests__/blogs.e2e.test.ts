// @ts-ignore
import request from "supertest"
import {app} from "../src/settings";
import {before} from "node:test";
describe('DELETE BLOGS',  () => {

    it("should  return status code 204 after deleting all blogs ",  async () =>{
        await request(app)
            .delete("/testing/all-data")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204)
    });

    it("",  async () => {
        const result = await request(app)
            .get("/")
            .expect(200)
        expect(result.text).toEqual("API started")
    });
});

describe('GET ALL BLOGS',  () => {
    beforeAll(async () => {
        await request(app)
            .delete("/testing/all-data")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204)
    })

    it("should  return status code 200 and empty array ",  async () =>{
        const readRequest = await request(app)
            .get("/blogs")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(200)
        expect(readRequest.body).toEqual([])
    });

    it("should  return status code 200 and empty array after creating ",  async () =>{
        //deleting all data
        await request(app)
            .delete("/testing/all-data")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204)
        const createRequest = await request(app)
            .post("/blogs")
            .send({name : "Semen",
                description: "studiyng in KSMA",
                websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(200)
        //creating new blog

    });
});

describe('POST ALL BLOGS',  () => {
    before(async () => {
        await request(app)
            .delete("/testing/all-data")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204)
    })

    it("should  return status code 200 and newly created blog // id : '0'",  async () =>{
        //Posting new Blog
        await request(app)
            .delete("/testing/all-data")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        const createRequest = await request(app)
            .post("/blogs")
            .send({name : "Semen",
                description: "studiyng in KSMA",
                websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(201)
        //Checking of response Data
        expect(createRequest.body).toEqual({id : "0",
            name : "Semen",
            description: "studiyng in KSMA",
            websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})

    });
    //checking for proper id
    it("should  return status code 200 and newly created blog // id : '1' ",  async () =>{
        //Posting new Blog
        const createRequest = await request(app)
            .post("/blogs")
            .send({name : "Semen",
                description: "studiyng in KSMA",
                websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(201)
        //Checking of response Data
        expect(createRequest.body).toEqual({id : "1",
            name : "Semen",
            description: "studiyng in KSMA",
            websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})

    });
    /*it("should  return status code 200 and empty array ",  async () =>{
    });*/
});

describe('GET BLOG BY ID',  () => {
    before(async () => {
        await request(app)
            .delete("/testing/all-data")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204)
    })


    //checking for proper id
    it("should  return status code 200 and get newly created blog // id : '0' ",  async () =>{
        //deleting DB
        await request(app)
            .delete("/testing/all-data")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        //Posting new Blog
        const createRequest = await request(app)
            .post("/blogs")
            .send({name : "Semen",
                description: "studiyng in KSMA",
                websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(201)
        //Checking of response Data
        expect(createRequest.body).toEqual({id : "0",
            name : "Semen",
            description: "studiyng in KSMA",
            websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})

        const readRequest = await request(app)
            .get("/blogs/0")
            .expect(200)
        expect(readRequest.body).toEqual({id : "0",
            name : "Semen",
            description: "studiyng in KSMA",
            websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})
    });

});

describe('DELETE BLOG BY ID',  () => {

    it("should return 404 when blog not found , 401 when Not_Authorized and 204 when blog deleted// id : '0'",  async () =>{
        //Posting new Blog
        const createRequest = await request(app)
            .post("/blogs")
            .send({name : "Semen",
                description: "studiyng in KSMA",
                websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(201)
        //Checking of response Data
        expect(createRequest.body).toEqual({id : "1",
            name : "Semen",
            description: "studiyng in KSMA",
            websiteUrl: "https://samurai.it-incubator.io/lessons/homeworks?id=63077bcee5fc0a055535227d"})

        //deleting this blog by id
        await request(app)
            .delete("/blogs/1")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204)
        await request(app)
            .delete("/blogs/1000")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(404)
        await request(app)
            .delete("/blogs/1000")
            .set('Authorization', 'Basic YWRtaW46cXdsdfsdfglcnR5')
            .expect(401)
    });
});

describe('PUT BLOG BY ID',  () => {
    before(async () => {
        await request(app)
            .delete("/testing/all-data")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(204)
    })


});