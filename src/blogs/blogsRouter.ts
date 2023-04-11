import {Router} from 'express'
import {createBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlog} from "./blogsRepository";

export const blogsRouter = Router({})

blogsRouter.get("", getAllBlogs)
blogsRouter.post("", createBlog)
blogsRouter.get("/:id", getBlogById)
blogsRouter.put("/:id", updateBlog)
blogsRouter.delete("/:id", deleteBlogById)
