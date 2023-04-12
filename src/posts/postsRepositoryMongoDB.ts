import {BlogViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";
import {createNewBlogId} from "../common";
import {client} from "../db";




export async function getBlogById(req: Request, res: Response) {
    const blogId = req.params.id
    if(blogId) {
        await res.status(200).send(client.db("forum").collection("blogs").findOne({id: blogId}))
    } else {
        await res.sendStatus(404)
    }

}
export function getAllBlogs(req: Request, res: Response) {

}

export function deleteBlogById(req: Request, res: Response) {

}



export function createBlog(req: Request, res: Response) {

}

export async function deleteAllPosts() {
    await client.db("forum").collection("posts").deleteMany({})

}
