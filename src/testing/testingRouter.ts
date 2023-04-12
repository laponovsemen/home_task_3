import {Router} from 'express'
import {deleteAllInformation} from "./testingRepository";
import {basicAuthGuardMiddleware} from "../common";

export const testingRouter = Router({})


testingRouter.delete("",basicAuthGuardMiddleware,  deleteAllInformation)