export enum POST_TYPES {
    NORMAL = "normal",
    EVENT = "event"
 }
 
 export type post = {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    createdAt: Date,
    author_id: string
 }

 export type postDTO = {
   id: string,
   photo: string,
   description: string,
   type: POST_TYPES,
   author_id: string
}