import {Request, Response, Router} from "express";
import {_posts, createPosts, getAllPosts, readPostByID} from "../repositiries/postsRepositoryMongo";
import {basicAuthGuardMiddleware, createPostBodyValidator} from "../middleware";

export const postsRouter= Router({})
postsRouter.get("/", async (req: Request, res: Response) => {
    const result = await getAllPosts()
    res.send(result).status(204)
})

postsRouter.post("/",basicAuthGuardMiddleware,createPostBodyValidator , async (req: Request, res: Response) => {
    const result = await createPosts(req.body)
    res.status(201).send(result)
})

postsRouter.get("/:id", async (req: Request, res: Response) => {
    const result = await readPostByID(req.params.id)
    if (result) {
        res.status(200).send(result)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put("/:id", basicAuthGuardMiddleware,createPostBodyValidator , async (req: Request, res: Response) => {
    // coderewue
    const post  = _posts.filter(x => x.id === req.params.id)[0]
    const indexOfPost = _posts.indexOf(post)
    if(post){
        _posts[indexOfPost].title = req.body.title
        _posts[indexOfPost].shortDescription = req.body.shortDescription
        _posts[indexOfPost].content = req.body.content
        _posts[indexOfPost].blogId = req.body.blogId
        res.status(204).send(_posts[indexOfPost])
    } else {
        res.sendStatus(404)
    }
})

postsRouter.delete("/:id", basicAuthGuardMiddleware,async (req: Request, res: Response) => {
    const post  = _posts.filter(x => x.id === req.params.id)[0]
    const indexOfPost = _posts.indexOf(post)
    if(post){
        _posts.splice(indexOfPost, 1)
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})