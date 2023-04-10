import {BlogInputModelType, BlogViewModelType} from "../appTypes";
import {blogsCollection, client, postsCollection} from "./db";

let counter = 1

//deleting all data in both databases
export async function deleteAllBlogsData () {
    blogsCollection.deleteMany({})

}
//Read all blogs
export async function getAllBlogs(): Promise<BlogViewModelType[]>{
    return client.db("forum").collection<BlogViewModelType>("blogs").find({}).toArray()
}
//create new blog according to BlogInputModelType
export async function  createBlog(Object:BlogInputModelType): Promise<BlogViewModelType> {
    const newBlog = {
        id: counter.toString(),
        name : Object.name,
        description : Object.description,
        websiteUrl : Object.websiteUrl,
        createdAt : new Date().toISOString()
    }
    blogsCollection.insertOne({newBlog})
    counter++
    return newBlog
}
//create new blog according to BlogViewModelType
