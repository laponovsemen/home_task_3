import express from "express";
import {postsRouter, startRouter, testingRouter} from "./app";
import {blogsRouter} from "./routes/blogs.router";


export const app = express();

app.use(express.json())

app.use("", startRouter)
app.use("/blogs", blogsRouter)
app.use("/posts", postsRouter)
app.use("/testing/all-data", testingRouter)