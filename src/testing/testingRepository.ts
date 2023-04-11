import {blogs} from "../blogs/blogsRepository";
import {Response,Request} from "express";
import {posts} from "../posts/postsRepository";
export function deleteAllPosts() {
    posts.splice(0, posts.length - 1)
}

export function deleteAllBlogs() {
    blogs.splice(0, blogs.length - 1)

}
export function deleteAllInformation(req: Request, res: Response) {
    deleteAllBlogs()
    deleteAllPosts()
    res.sendStatus(204)
}