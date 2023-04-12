import {Router} from 'express'
import {createPost, deletePostById, getAllPosts, getPostById, updatePost} from "./postsRepositoryMongoDB";

export const postsRouter = Router({})

postsRouter.get("", getAllPosts)
postsRouter.post("", createPost)
postsRouter.get("/:id", getPostById)
postsRouter.put("/:id", updatePost)
postsRouter.delete("/:id", deletePostById)