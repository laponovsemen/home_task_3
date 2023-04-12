import { PostViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";

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
    const blog = await client.db("forum").collection("blogs").findOne({id : req.body.blogId})
    if(blog) {
        const newPost: PostViewModelType = {
            id: (+(new Date())).toString(),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        await client.db("forum").collection("posts").insertOne(newPost)
        res.status(201).send(newPost)
    } else {
        res.sendStatus(400)
    }

}

export async function updatePost(req: Request, res: Response) {
    const postToUpdate = await client.db("forum").collection("blogs").findOne({id: req.params.id})
    if (postToUpdate) {
        const updatedPost = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: postToUpdate.createdAt,
            isMembership: postToUpdate.isMembership,
        }
        res.status(201).send(client
            .db("forum")
            .collection("blogs")
            .updateOne({"id": req.params.id},
                {$set: {updatedPost}}))

        res.status(201).send(updatedPost)
    } else {
        res.sendStatus(404)
    }
}


export async function deleteAllPosts() {
    await client.db("forum").collection("posts").deleteMany({})

}
