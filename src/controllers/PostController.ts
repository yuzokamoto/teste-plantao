import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

const postBusiness = new PostBusiness()

export class PostController {
    createPostController = async (
        req: Request,
        res: Response
    ) => {
        try {

            const { photo, description, type } = req.body

            const token: string = req.headers.authorization as string

           

            await postBusiness.createpostBusiness(
                photo,
                description,
                type,
                token
                
            )

            res.status(201).send("Post criado!")

        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    GetPostByIdController = async (
        req: Request,
        res: Response
    ) => {
        try {
            const { id } = req.params
            const token: string = req.headers.authorization as string

            const result = await postBusiness.GetPostByIdBusiness(id, token)

            res.status(200).send(result)

        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

