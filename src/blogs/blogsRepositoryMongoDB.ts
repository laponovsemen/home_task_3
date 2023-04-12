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



export async function createBlog(req: Request, res: Response) {

    const newBlog = {
        id: +(new Date()).toISOString(),
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
        createdAt: new Date().toISOString(),
        isMembership: false,
    }
    await res.status(201).send(client.db("forum").collection("blogs").insertOne(newBlog))
    res.status(201).send(newBlog)
}

export async function deleteAllBlogs() {
    await client.db("forum").collection("blogs").deleteMany({})

}

export async function updateBlog(req: Request, res: Response) {
    const blogToUpdate = await client.db("forum").collection("blogs").findOne({id : req.params.id})
    if(blogToUpdate) {
        const updatedBlog = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: blogToUpdate.createdAt,
            isMembership: blogToUpdate.isMembership,
        }
        await res.status(201).send(client
            .db("forum")
            .collection("blogs")
            .updateOne( { "id" : req.params.id },
            { $set: {updatedBlog}}))

        res.status(201).send(updatedBlog)
    } else {
        await  res.sendStatus(404)
    }

}







