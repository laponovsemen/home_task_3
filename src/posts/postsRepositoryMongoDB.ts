import {PostInsertModelType, PostViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";

import {client} from "../db";
import {mongoBlogSlicing, mongoPostSlicing} from "../common";
import {blogsCollection} from "../blogs/blogsRepositoryMongoDB";

export async function getPostById(req: Request, res: Response) {
    const blogId = req.params.id
    if(blogId) {
        const result = await client.db("forum").collection("posts").findOne({id: blogId})
        res.status(200).send(result)
    } else {
        res.sendStatus(404)
    }
}
export async function getAllPosts(req: Request, res: Response) {
     const result = await client.db("forum").collection<PostViewModelType>("posts").find({}).toArray()
     res.status(200).send(result.map(post => mongoPostSlicing(post)))

}

export async function deletePostById(req: Request, res: Response) {
     const result = await client.db("forum").collection("posts").deleteOne({id : req.params.id})
     res.status(200).send(result)
}

export async function createPost(req: Request, res: Response) {
    const blog = await client.db("forum").collection("blogs").findOne({id : req.body.blogId})
    if(blog) {
        const newPost: PostInsertModelType = {
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
    const postToUpdate = await client.db("forum").collection("posts").findOne({id: req.params.id})
    if (postToUpdate) {
        const updatedPost = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: postToUpdate.createdAt,
            isMembership: postToUpdate.isMembership,
        }
        await client.db("forum").collection("posts").updateOne({"id": req.params.id},{$set: {updatedPost}})
        res.status(204)
    } else {
        res.sendStatus(404)
    }
}

export async function deleteAllPosts() {
    await client.db("forum").collection<PostViewModelType>("posts").deleteMany({})
}
