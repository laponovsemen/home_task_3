import {BlogViewModelType, PostViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";


export let posts : PostViewModelType[] = []
export function getPostById(req: Request, res: Response) {
    const foundBlog = posts.find(blog => blog.id === req.params.id)
    if(foundBlog){
        res.status(200).send(foundBlog)
    } else {
        res.sendStatus(404)
    }
}
export function getAllPosts(req: Request, res: Response) {
    res.status(200).send(posts)
}

export function deletePostById(req: Request, res: Response) {
    const foundBlog = posts.find(blog => blog.id === req.params.id)
    if(foundBlog){
        posts = posts.filter(blog => blog.id !== req.params.id)
        res.status(204)
    } else {
        res.sendStatus(404)
    }
}



export function  createPost() {

}
export function  updatePost() {

}
