import {Router} from 'express'
import {deleteAllInformation} from "./testingRepositoryMongoDB";
import {basicAuthGuardMiddleware} from "../common";

export const testingRouter = Router({})


testingRouter.delete("",  deleteAllInformation)