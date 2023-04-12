// @ts-ignore
import request from "supertest"
import {app} from "../../src/settings";
import {before} from "node:test";

describe("TESTING ROUTE", () => {
    it("should return status code 204 that means everything is deleted", () => {
        request(app)
            .delete("/testing/all-data")
            .expect(204)
    })
})

