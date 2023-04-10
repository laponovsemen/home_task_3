import { PostInputModelType, PostViewModelType} from "../appTypes";
import {blogs} from "./blogsRepository";

export let posts : Array<PostViewModelType> = []

export async function deleteAllPostsData (){
    posts = []
    return
}
export async function  getAllPosts(): Promise<PostViewModelType[]> {
    return posts
}

export async function  createPosts(Object:PostInputModelType): Promise<PostViewModelType> {
    const newPost : PostViewModelType = {
        id : posts.length.toString(),
        title : Object.title,
        shortDescription : Object.shortDescription,
        content : Object.content,
        blogId : Object.blogId,
        blogName : blogs[blogs.indexOf(blogs.filter(n => n.id === Object.blogId)[0])].name
    }
    posts.push(newPost)
    return newPost
}

export async function  readPostByID(idOfPost : string): Promise<PostViewModelType> {
    return posts.filter(n => n.id === idOfPost)[0]
}