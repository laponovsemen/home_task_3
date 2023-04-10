import {Request, Response, Router} from "express";
import {_blogs, createBlog, deleteBlogByID, getAllBlogs, readBlogByID} from "../repositiries/blogsRepositoryMongo";
import {basicAuthGuardMiddleware, createBlogBodyValidator, readBlogIDValidator} from "../middleware";


export const blogsRouter = Router({})
blogsRouter.get("/",async (req: Request, res: Response) => {
    const result = await getAllBlogs()
    res.status(200).send(result)
})

blogsRouter.post("/",
    basicAuthGuardMiddleware,
    createBlogBodyValidator,
    async (req: Request, res: Response) => {
        const result = await createBlog(req.body)
        res.status(201).send(result)
    })

blogsRouter.get("/:id", async (req: Request, res: Response) => {
    const result = await readBlogByID(req.params.id)
    if (result) {
        res.status(200).send(result)
    } else {
        res.sendStatus(404)
    }
})

blogsRouter.put("/:id",
    basicAuthGuardMiddleware,
    readBlogIDValidator,
    async (req: Request, res: Response) => {
        const result = await readBlogByID(req.params.id.toString())
        if (result) {
            const index = _blogs.indexOf(result)
            _blogs[index].name = req.body.name
            _blogs[index].description = req.body.description
            _blogs[index].websiteUrl = req.body.websiteUrl
            res.status(204).send(_blogs[index])
        } else {
            res.sendStatus(404)
        }
    })

blogsRouter.delete("/:id",basicAuthGuardMiddleware, async (req: Request, res: Response) => {
    const result = await deleteBlogByID(req.params.id.toString())
    if (result) {

        res.status(204).send(result)
    } else {
        res.sendStatus(404)
    }
})