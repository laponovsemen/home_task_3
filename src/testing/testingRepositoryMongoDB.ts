import {deleteAllBlogs} from "../blogs/blogsRepositoryMongoDB";
import {Response,Request} from "express";
import {deleteAllPosts} from "../posts/postsRepositoryMongoDB";



export function deleteAllInformation(req: Request, res: Response) {
    deleteAllBlogs()
    deleteAllPosts()
    res.sendStatus(204)
}