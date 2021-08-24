
import { user } from '../model/user';
import { BaseDatabase } from './BaseDatabase';

const userTable = "labook_users";


export class UserDatabase extends BaseDatabase {

createUser = async ({id, name, email, password}:user): Promise<void> => {
  await BaseDatabase.connection(userTable)
      .insert({
        id,
        name,
        email,
        password
      })
      
      console.log(password)
      console.log(BaseDatabase)
  }

  async login (email:string){ 
    const queryResult = await BaseDatabase.connection()
    .select("*")
    .where({ email })
    .from(userTable)

    const user: user = {
        id: queryResult[0].id,
        name: queryResult[0].name,
        email: queryResult[0].email,
        password: queryResult[0].password
     }

     if (!queryResult[0]) {
        throw new Error("Invalid credentials")
     }
     return user
}
}