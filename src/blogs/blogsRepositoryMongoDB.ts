import {BlogViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";
import {createNewBlogId} from "../common";
import {client} from "../db";
import {blogs} from "./blogsRepository";


export let _blogs = []
export async function getBlogById(req: Request, res: Response) {
    await res.status(200).send(client.db("forum").collection("blogs").find({id : req.params.id}))

}
export async function getAllBlogs(req: Request, res: Response) {
    await res.status(200).send(client.db("forum").collection("blogs").find({}))
}

export async function deleteBlogById(req: Request, res: Response) {
    await client.db("forum").collection("blogs").deleteOne({id: req.params.id})
}



export function createBlog(req: Request, res: Response) {

}

export async function deleteAllBlogs() {
    await client.db("forum").collection("blogs").deleteMany({})

}

export function updateBlog(req: Request, res: Response) {
    const foundBlog = blogs.find(blog => blog.id === req.params.id)

    if(foundBlog){
        const index = blogs.indexOf(foundBlog)
        const updatedBlog = {
            "id": foundBlog.id,
            "name": req.body.name,
            "description": req.body.description,
            "websiteUrl": req.body.websiteUrl,
            "createdAt": foundBlog.createdAt,
            "isMembership": foundBlog.isMembership // always true
        }
        blogs[index] = updatedBlog
        res.sendStatus(204)

    } else {
        res.status(404)
    }



}







