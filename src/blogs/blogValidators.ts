import {body, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {ValidationErrors} from "../common";

const reg = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

    export const BlogNameValidation = body("name")
    .isString()
    .withMessage("the field name is not a sting")
    .bail()
    .trim()
    .isLength({min : 1, max : 15})
    .withMessage("the length of name field is more than 15 chars")

export const BlogDescriptionValidation = body("description")
    .isString()
    .withMessage("the field description is not a sting")
    .bail()
    .trim()
    .isLength({min : 1, max : 500})
    .withMessage("the length of description field is more than 500 chars")

export const BlogWebsiteUrlValidation = body("websiteUrl")
    .isString()
    .withMessage("the field websiteUrl is not a sting")
    .bail()
    .trim()
    .isURL()
    .withMessage("the websiteUrl field is not URL")
    .bail()
    .isLength({min : 1, max : 100})
    .withMessage("the length of websiteUrl field is more than 500 chars")



export const CreateBlogValidation = [BlogNameValidation, BlogDescriptionValidation, BlogWebsiteUrlValidation, ValidationErrors]