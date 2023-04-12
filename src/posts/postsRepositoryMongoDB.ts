import {BlogViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";
import {createNewBlogId} from "../common";
import {client} from "../db";




export async function getPostById(req: Request, res: Response) {
    const blogId = req.params.id
    if(blogId) {
        await res.status(200).send(client.db("forum").collection("blogs").findOne({id: blogId}))
    } else {
        await res.sendStatus(404)
    }

}
export async function getAllPosts(req: Request, res: Response) {
    await res.status(200).send(client.db("forum").collection("blogs").find({}))
}

export async function deletePostById(req: Request, res: Response) {
    await res.status(200).send(client.db("forum").collection("blogs").deleteOne({id : req.params.id}))
}



export async function createPost(req: Request, res: Response) {
    const newPost = {
        id:	+(new Date()).toISOString(),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId:	req.body.blogId,
        blogName: await client.db("forum").collection("blogs").findOne({id : req.body.blogId}),
        isMembership: false,
        createdAt : new Date().toISOString()
    }
    await client.db("forum").collection("posts").insertOne(newPost)
    res.status(201).send(newPost)
}

export function updatePost(req: Request, res: Response) {

}


export async function deleteAllPosts() {
    await client.db("forum").collection("posts").deleteMany({})

}
