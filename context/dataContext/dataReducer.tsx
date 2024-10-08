export interface dataState{
    user?: any,
    isLogged: boolean
}

type ActionsProps = {type:"getMyPosts", payload:any} | {type:"LOGOUT"}

export const dataReducer = (state:any, actions:ActionsProps)=> {
    switch(actions.type){
        case "getMyPosts":
            return {
                ...state,
                posts: actions.payload, // Actualizamos los posts con el payload
            }
            case "LOGOUT":
            return{
                ...state,
                user: undefined,
                isLogged: false
            }
        default:
            return state
    }
}