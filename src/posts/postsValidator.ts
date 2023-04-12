import {body, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {ValidationErrors} from "../common";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

export const PostTitleValidation = body("title")
    .exists()
    .withMessage(" no title field in body ")
    .isString()
    .withMessage("the field title is not a sting")
    .bail()
    .trim()
    .isLength({min : 1, max : 30})
    .withMessage("the length of title field is more than 30 chars")

export const PostShortDescriptionValidation = body("shortDescription")
    .isString()
    .withMessage("the field shortDescription is not a sting")
    .bail()
    .trim()
    .isLength({min : 1, max : 100})
    .withMessage("the length of shortDescription field is more than 100 chars")

export const PostContentValidation = body("content")
    .isString()
    .withMessage("the field content is not a sting")
    .bail()
    .trim()
    .isURL()
    .withMessage("the content field is not URL")
    .bail()
    .isLength({min : 1, max : 1000})
    .withMessage("the length of content field is more than 1000 chars")

export const PostBlogIdValidation = body("blogId")
    .isString()
    .withMessage("the field blogId is not a sting")
    .trim()
    .withMessage("the content field is not blogId")


export const UpdatePostValidation = []
export const CreatePostValidation = [PostTitleValidation, PostShortDescriptionValidation, PostContentValidation, PostBlogIdValidation, ValidationErrors]