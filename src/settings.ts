import express from 'express'
import {postsRouter} from "./routers/postsRouter";
import {blogsRouter} from "./routers/blogsRouter";
import {startRouter} from "./routers/startRouter";
import {testingRouter} from "./routers/testingRouter";

export const app = express()

app.use(express.json)

app.use("/", startRouter)
app.use("/posts", postsRouter)
app.use("/blogs", blogsRouter)
app.use("/testing/all-data", testingRouter)