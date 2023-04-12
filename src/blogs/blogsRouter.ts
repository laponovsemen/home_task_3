import {Router} from 'express'
import {createBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlog} from "./blogsRepositoryMongoDB";
import {
    BlogDescriptionValidation,
    BlogNameValidation, BlogValidationErrors,
    BlogWebsiteUrlValidation,
    CreateBlogValidation
} from "./blogValidators";
import {basicAuthGuardMiddleware} from "../common";

export const blogsRouter = Router({})

blogsRouter.get("", getAllBlogs)
blogsRouter.post("", basicAuthGuardMiddleware,BlogNameValidation, BlogDescriptionValidation, BlogWebsiteUrlValidation, BlogValidationErrors, createBlog)
blogsRouter.get("/:id", getBlogById)
blogsRouter.put("/:id",basicAuthGuardMiddleware, updateBlog)
blogsRouter.delete("/:id",basicAuthGuardMiddleware,  deleteBlogById)
