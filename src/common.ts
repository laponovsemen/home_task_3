
import {BlogViewModelType} from "./appTypes";
import {NextFunction, Request, Response} from "express";
import {header, validationResult} from "express-validator";

export function createNewBlogId(array : BlogViewModelType[]) {
    return (array.length + 1).toString()
}


export const basicAuthGuardMiddleware  = (req : Request, res: Response, next : NextFunction) => {
    header("Authorization")
        .exists()
        .withMessage("no authorization field")
        .isString()
        .withMessage("Authorization field is not a string")
        .custom((value, { req }) => value.split(" ")[0] !== "Basic")
        .withMessage("Autorization is not Basic")
        .custom((value, { req }) =>  value.split(" ")[1] !== "YWRtaW46cXdlcnR5")
        .withMessage("wrong login and password")
    const errors = validationResult(req)
    console.log(errors, 'errors')
    console.log('i`m check the header')
    if(!errors.isEmpty()){
        console.log('i dgaf')
        res.status(401).send({errorsMessages : errors.array()})
    } else {
        next()
    }
}