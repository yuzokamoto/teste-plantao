import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";


const userBusiness = new UserBusiness()

export class UserController {
    signUpController = async (
        req: Request,
        res: Response
    ) => {
        try {

            const { name, email, password } = req.body

            const token = await userBusiness.signUpBusiness(
                name,
                email,
                password
            )
            res
                .status(201)
                .send({
                    message: "Usuário criado!",
                    token
                })

        } catch (error) {
            res.status(400,).send(error.message)
        }
    }

    loginController = async (
        req: Request,
        res: Response
    ) => {
        try {

            const { email, password } = req.body

            const token = await userBusiness.loginBusiness(email, password)

            res
                .status(200)
                .send({
                    message: "Usuário logado!",
                    token
                })

        } catch (error) {
            res.status(400).send(error.message)
        }
    }

}