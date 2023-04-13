
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
    if(!errors.isEmpty()){
        res.status(401).send({errorsMessages : errors.array()})
    } else {
        next()
    }
}

export const ValidationErrors = (req: Request, res : Response, next : NextFunction) => {
    const errors = validationResult(req)
    //console.log(errors, 'errors in middleware')
    if(!errors.isEmpty()){
        res.status(400).send({errors : errors.array()})
    } else {
        next()
    }
}

export const mongoBlogSlicing = ( Obj2: any) =>  {
    const Obj1 = {
        id : Obj2.id,
        name:	Obj2.name,
        description: Obj2.description,
        websiteUrl: Obj2.websiteUrl,
        isMembership: Obj2.isMembership,
        createdAt : Obj2.createdAt}
    return Obj1
}