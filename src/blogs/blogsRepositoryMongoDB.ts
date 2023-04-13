import {BlogInsertModelType, BlogViewModelType} from "../appTypes";
import {NextFunction, Request, Response} from "express";
import {createNewBlogId, mongoBlogSlicing} from "../common";
import {client} from "../db";



export let blogsCollection = client.db("forum").collection<BlogViewModelType>("blogs")
export async function getBlogById(req: Request, res: Response) {
    // if(req.params.id) {
        const mongoBlog = await blogsCollection.findOne({_id: req.params.id})
        const result = mongoBlogSlicing(mongoBlog)
        console.log(result)
        res.status(200).send(result)
        /*if(result){
            res.status(200).send(result)
        }else{
            res.sendStatus(404)
        }

    } else {
        res.sendStatus(404)
    }*/
}
export async function getAllBlogs(req: Request, res: Response) {
    const result = await blogsCollection.find({}).toArray()  //{ projection: { name : 0}}
    res.status(200).send(result.map(blog => mongoBlogSlicing(blog)))
}

export async function deleteBlogById(req: Request, res: Response) {
    if(req.params.id){
        // @ts-ignore
        await client.db("forum").collection("blogs").deleteOne({_id: req.params.id})
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }


}



export async function createBlog(req: Request, res: Response) {

    const newBlog = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
        createdAt: new Date().toISOString(),
        isMembership: false,
    }

    const result = await client.db("forum").collection<BlogInsertModelType>("blogs").insertOne(newBlog)  // Need to check / bad decision

    res.status(201).send({
        id: result.insertedId,
        name: newBlog.name,
        description: newBlog.description,
        websiteUrl: newBlog.websiteUrl,
        createdAt: newBlog.createdAt,
        isMembership: newBlog.isMembership,
    })
}

export async function deleteAllBlogs() : Promise<boolean> {
    await client.db("forum").collection<BlogViewModelType>("blogs").deleteMany({})
    return true
}

export async function updateBlog(req: Request, res: Response) {
    const blogToUpdate = await client.db("forum").collection<BlogViewModelType>("blogs").findOne({id : req.params.id})
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
        res.sendStatus(404)
    }

}







