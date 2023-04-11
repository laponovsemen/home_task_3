import {BlogViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";


export let blogs : BlogViewModelType[] = []
export function getBlogById(req: Request, res: Response) {
    const foundBlog = blogs.find(blog => blog.id === req.params.id)
    if(foundBlog){
        res.status(200).send(foundBlog)
    } else {
        res.sendStatus(404)
    }
}
export function getAllBlogs(req: Request, res: Response) {
    res.status(200).send(blogs)
}

export function deleteBlogById(req: Request, res: Response) {
    const foundBlog = blogs.find(blog => blog.id === req.params.id)
    if(foundBlog){
        blogs = blogs.filter(blog => blog.id !== req.params.id)
        res.status(204)
    } else {
        res.sendStatus(404)
    }
}



export function createBlog(req: Request, res: Response) {
    blogs.splice(0, blogs.length - 1)
}
updateBlog

export function updateBlog(req: Request, res: Response) {
    blogs.splice(0, blogs.length - 1)
}




