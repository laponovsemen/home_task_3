import {BlogInputModelType, BlogViewModelType} from "../appTypes";
import {client} from "./db";

export let _blogs : Array<BlogViewModelType> = []

//deleting all data in both databases
export async function deleteAllBlogsData () {
    client.db("homeWork3").collection("blogs").deleteMany({})

}
//Read all blogs
export async function getAllBlogs(): Promise<BlogViewModelType[]>{
    return client.db("homeWork3").collection<BlogViewModelType>("blogs").find({}).toArray()
}
//create new blog according to BlogInputModelType
export async function  createBlog(Object:BlogInputModelType): Promise<BlogViewModelType> {
    const newBlog = {
        id : _blogs.length.toString(),
        name : Object.name,
        description : Object.description,
        websiteUrl : Object.websiteUrl
    }
    _blogs.push(newBlog)
    return newBlog
}
//create new blog according to BlogViewModelType
export async function  readBlogByID(idOfBlog : string) : Promise<BlogViewModelType> {
    return _blogs.filter(n => n.id === idOfBlog)[0]
}

export async function  deleteBlogByID(idOfBlog : string) : Promise<boolean> {
    for(let i =0; i < _blogs.length; i++){
        if(_blogs[i].id === idOfBlog){
            _blogs.splice(i,1)
            return true
        }
    }
    return false
}