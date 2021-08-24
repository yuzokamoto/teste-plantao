import { UserDatabase } from "../data/UserDatabase"
import { generateToken } from "../services/authenticator"
import { generateId } from "../services/idGenerator"
import { user } from "../model/user";
import { HashManager } from "../services/HashManager";



const hashManager = new HashManager()
const userDatabase = new UserDatabase()

export class UserBusiness {
    signUpBusiness = async (
        name: string,
        email: string,
        password: string
    ) => {
        if (!name || !email || !password) {
            throw new Error("Preencha todos os campos")
        }

        const id: string = generateId()

        const cypherPassword = await hashManager.hash(password)

        const user = {
            id,
            name,
            email,
            password: cypherPassword
        }

        await userDatabase.createUser(user);

        const token: string = generateToken({ id })

        return token
    }

    
    loginBusiness = async (
        email: string,
        password: string
    ) => {

        if (!email || !password) {
            throw new Error("Preencha todos os campos")
        }

        const user: user = await userDatabase.login(email)
        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const passwordIsCorrect: boolean = await hashManager.compare(password, user.password)

        if (!passwordIsCorrect) {
            throw new Error("Senha incorreta")
        }

        const token: string = generateToken({ id: user.id })

        return token

    }

}