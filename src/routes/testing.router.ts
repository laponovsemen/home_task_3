import {Request, Response, Router} from "express";
import {deleteAllBlogsData} from "../repositiries/blogsRepositoryMongo";
import {deleteAllPostsData} from "../repositiries/postsRepositoryMongo";

export const testingRouter = Router({})

testingRouter.delete("/", async (req: Request, res: Response) => {
    await deleteAllBlogsData()
    await deleteAllPostsData()
    res.sendStatus(204)
})