import { PostInputModelType, PostViewModelType} from "../appTypes";

import {blogsCollection} from "./db";



export async function deleteAllPostsData (){
    await blogsCollection.deleteMany({})
    return
}
/*
export async function  getAllPosts(): Promise<PostViewModelType[]> {
    return db.client()
}

export async function  createPosts(Object:PostInputModelType): Promise<PostViewModelType> {
    const newPost : PostViewModelType = {
        id : _posts.length.toString(),
        title : Object.title,
        shortDescription : Object.shortDescription,
        content : Object.content,
        blogId : Object.blogId,
        blogName : _blogs[_blogs.indexOf(_blogs.filter(n => n.id === Object.blogId)[0])].name
    }
    _posts.push(newPost)
    return newPost
}

export async function  readPostByID(idOfPost : string): Promise<PostViewModelType> {
    return _posts.filter(n => n.id === idOfPost)[0]
}*/
