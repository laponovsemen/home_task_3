import {Router} from 'express'
import {createPost, deletePostById, getAllPosts, getPostById, updatePost} from "./postsRepositoryMongoDB";
import {basicAuthGuardMiddleware} from "../common";
import {CreatePostValidation, UpdatePostValidation} from "./postsValidator";

export const postsRouter = Router({})

postsRouter.get("", getAllPosts)
postsRouter.post("",basicAuthGuardMiddleware,CreatePostValidation,  createPost)
postsRouter.get("/:id", getPostById)
postsRouter.put("/:id",basicAuthGuardMiddleware,UpdatePostValidation,  updatePost)
postsRouter.delete("/:id",basicAuthGuardMiddleware, deletePostById)