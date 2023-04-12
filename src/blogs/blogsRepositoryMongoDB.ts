import {BlogViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";
import {createNewBlogId} from "../common";
import {client} from "../db";
import {blogs} from "./blogsRepository";


export let _blogs = []
export async function getBlogById(req: Request, res: Response) {
    const blogId = req.params.id
    if(blogId) {
        await res.status(200).send(client.db("forum").collection("blogs").findOne({id: blogId}))
    } else {
        await res.sendStatus(404)
    }

}
export function getAllBlogs(req: Request, res: Response) {
    res.status(200).send(_blogs)
}

export function deleteBlogById(req: Request, res: Response) {

}



export function createBlog(req: Request, res: Response) {
    const newBlog = {
        "id": createNewBlogId(blogs),
        "name": req.body.name,
        "description": req.body.description,
        "websiteUrl": req.body.websiteUrl,
        "createdAt": new Date().toISOString(),
        "isMembership": true // always true
    }
    blogs.push(newBlog)
    res.status(201).send(newBlog)
}

export function deleteAllBlogs() {


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







