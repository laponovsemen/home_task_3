import {PostInsertModelType, PostViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";

import {client} from "../db";
import {mongoBlogSlicing, mongoPostSlicing} from "../common";
import {blogsCollection} from "../blogs/blogsRepositoryMongoDB";
import {ObjectId} from "mongodb";

export async function getPostById(req: Request, res: Response) {
    const blogId = req.params.id
    if(blogId) {
        const result = await client.db("forum").collection("posts").findOne({_id: new ObjectId(blogId)})
        res.status(200).send(result)
    } else {
        res.sendStatus(404)
    }
}
/*export async function getBlogById(req: Request, res: Response) {
    if(req.params.id) {

        const mongoBlog = await blogsCollection
            .findOne({_id: new ObjectId(req.params.id)},
                {projection : {id : 1, name: 1,description: 1, websiteUrl: 1, isMembership: 1, createdAt: 1}})
        if(mongoBlog){

            res.status(200).send(mongoBlogSlicing(mongoBlog))
        }else{
            res.sendStatus(404)
        }

    } else {
        res.sendStatus(404)
    }
}*/
export async function getAllPosts(req: Request, res: Response) {
     const result = await client.db("forum").collection<PostViewModelType>("posts").find({}).toArray()
     res.status(200).send(result.map(post => mongoPostSlicing(post)))

}

export async function deletePostById(req: Request, res: Response) {
     const result = await client.db("forum").collection("posts").deleteOne({id : req.params.id})
     res.status(204).send(result)
}

export async function createPost(req: Request, res: Response) {
    const blog = await client.db("forum").collection("blogs").findOne({_id : new ObjectId(req.body.blogId)})
    if(blog) {
        const newPost: PostInsertModelType = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: blog.name,
            createdAt: blog.createdAt,

        }

        const insertedPost = await client.db("forum").collection("posts").insertOne(newPost)

        res.status(201).send({
            id: insertedPost.insertedId,
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt,}
        )
    } else {
        res.sendStatus(400)
    }
}

export async function updatePost(req: Request, res: Response) {
    const postToUpdate = await client.db("forum").collection("posts").findOne({_id: new ObjectId(req.params.id)})
    if (postToUpdate) {
        const updatedPost = {

            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: postToUpdate.createdAt,
            isMembership: postToUpdate.isMembership,
        }
        await client.db("forum").collection("posts").updateOne({_id: new ObjectId(req.params.id)},{$set: {updatedPost}})
        res.status(204)
    } else {
        res.sendStatus(404)
    }
}

export async function deleteAllPosts() {
    await client.db("forum").collection<PostViewModelType>("posts").deleteMany({})
}
