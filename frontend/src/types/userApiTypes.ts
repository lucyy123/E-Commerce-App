import { User } from "./types"

export type userMessageResponse ={
    success:boolean,
    message:string
}
export type userResponse ={
    success:boolean,
    user: User
}
export type UserReducerInitState={
    loading:boolean,
    user: User | null
}