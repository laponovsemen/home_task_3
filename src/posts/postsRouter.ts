import {Router} from 'express'
import {createPost, deletePostById, getAllPosts, getPostById, updatePost} from "./postsRepositoryMongoDB";
import {basicAuthGuardMiddleware} from "../common";

export const postsRouter = Router({})

postsRouter.get("", getAllPosts)
postsRouter.post("",basicAuthGuardMiddleware, createPost)
postsRouter.get("/:id", getPostById)
postsRouter.put("/:id",basicAuthGuardMiddleware, updatePost)
postsRouter.delete("/:id",basicAuthGuardMiddleware, deletePostById)