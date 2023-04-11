import {Router} from 'express'
import {deleteAllBlogs} from "../blogs/blogsRepository";
import {deleteAllInformation} from "./testingRepository";

export const testingRouter = Router({})


testingRouter.delete("", deleteAllInformation)