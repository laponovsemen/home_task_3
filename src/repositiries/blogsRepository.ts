import {BlogInputModelType, BlogViewModelType} from "../appTypes";

export let blogs : Array<BlogViewModelType> = []

//deleting all data in both databases
export async function deleteAllBlogsData () {
    blogs = []
}
//Read all blogs
export async function getAllBlogs(): Promise<BlogViewModelType[]>{
    return blogs
}
//create new blog according to BlogInputModelType
export async function  createBlog(Object:BlogInputModelType): Promise<BlogViewModelType> {
    const newBlog = {
        id : blogs.length.toString(),
        name : Object.name,
        description : Object.description,
        websiteUrl : Object.websiteUrl
    }
    blogs.push(newBlog)
    return newBlog
}
//create new blog according to BlogViewModelType
export async function  readBlogByID(idOfBlog : string) : Promise<BlogViewModelType> {
    return blogs.filter(n => n.id === idOfBlog)[0]
}

export async function  deleteBlogByID(idOfBlog : string) : Promise<boolean> {
    for(let i =0; i < blogs.length; i++){
        if(blogs[i].id === idOfBlog){
            blogs.splice(i,1)
            return true
        }
    }
    return false
}