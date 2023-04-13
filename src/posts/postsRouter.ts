import {Router} from 'express'
import {createPost, deletePostById, getAllPosts, getPostById, updatePost} from "./postsRepositoryMongoDB";
import {basicAuthGuardMiddleware, ValidationErrors} from "../common";
import {
    PostBlogIdValidation, PostContentValidation,
    PostShortDescriptionValidation,
    PostTitleValidation,
} from "./postsValidator";

export const postsRouter = Router({})
const postDataValidation = [PostTitleValidation, PostShortDescriptionValidation, PostContentValidation, PostBlogIdValidation, ValidationErrors]
postsRouter.get("", getAllPosts)
postsRouter.post("",basicAuthGuardMiddleware,postDataValidation,  createPost)
postsRouter.get("/:id", getPostById)
postsRouter.put("/:id",basicAuthGuardMiddleware,postDataValidation,  updatePost)
postsRouter.delete("/:id",basicAuthGuardMiddleware, deletePostById)