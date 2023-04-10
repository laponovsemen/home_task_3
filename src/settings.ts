import express from "express";
import {blogsRouter} from "./routes/blogs.router";
import {startRouter} from "./routes/start.router";
import {postsRouter} from "./routes/posts.router";
import {testingRouter} from "./routes/testing.router";


export const app = express();

app.use(express.json())
app.use("", startRouter)
app.use("/blogs", blogsRouter)
app.use("/posts", postsRouter)
app.use("/testing/all-data", testingRouter)