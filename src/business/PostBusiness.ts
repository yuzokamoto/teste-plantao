import { PostDatabase } from "../data/postDataBase";
import { generateId } from "../services/idGenerator";
import { POST_TYPES, postDTO } from "../model/post";
import { authenticationData } from "../model/authentication";
import { getTokenData } from "../services/authenticator";

const postDatabase = new PostDatabase()

export class PostBusiness {
    [id: string]: any;

    createpostBusiness = async (
        photo: string,
        description: string,
        type: POST_TYPES,
        token:string
    ) => {

        if (
            !photo ||
            !description ||
            !type ||
            !token
        ) {
            throw new Error("Preencha todos os campos")
        }
      
        const tokenData: authenticationData = getTokenData(token)
  
        const id: string = generateId()

     const newPost: postDTO = { id, photo, description, type, author_id: tokenData.id }

        
        await postDatabase.createPost(
            
              newPost
            
        )
    }

    GetPostByIdBusiness = async (
        id: string, token:string
    ):Promise<any>=> {
        const tokenData: authenticationData = getTokenData(token)
        const result = await postDatabase.getPostbyId(id)
        
        if (!result) {
            throw new Error("Post não encontrado")
        }

        const postInfo = {
            id: result.id,
            photo: result.photo,
            description: result.description,
            type: result.type,
            createdAt: result.created_at,
            author_id: result.author_id
        }

        return postInfo
    }

}