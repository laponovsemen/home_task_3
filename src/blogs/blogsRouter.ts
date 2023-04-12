import {Router} from 'express'
import {createBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlog} from "./blogsRepositoryMongoDB";
import {
    BlogDescriptionValidation,
    BlogNameValidation,
    BlogWebsiteUrlValidation,
    CreateBlogValidation
} from "./blogValidators";
import {basicAuthGuardMiddleware, ValidationErrors} from "../common";

export const blogsRouter = Router({})

blogsRouter.get("", getAllBlogs)
blogsRouter.post("", basicAuthGuardMiddleware,BlogNameValidation, BlogDescriptionValidation, BlogWebsiteUrlValidation, ValidationErrors, createBlog)
blogsRouter.get("/:id", getBlogById)
blogsRouter.put("/:id",basicAuthGuardMiddleware, updateBlog)
blogsRouter.delete("/:id",basicAuthGuardMiddleware,  deleteBlogById)
