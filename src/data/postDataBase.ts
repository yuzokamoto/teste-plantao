import {  postDTO } from "../model/post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

    createPost = async ({id,
        photo,
        description,
        type ,
        author_id
    }:postDTO) => {
        await BaseDatabase.connection()
            .insert({
            
                id,
                photo,
                description,
                type ,
                author_id,
            })
            .into("labook_posts")
    }

    getPostbyId = async (id: string): Promise<any> => {
        const queryResult = await BaseDatabase.connection("labook_posts")
            .select("*")
            .where({ id })
console.log(queryResult )
        return queryResult[0]
    }
}