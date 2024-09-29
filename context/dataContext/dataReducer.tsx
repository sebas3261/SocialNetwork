export interface dataState{
    user?: any,
    isLogged: boolean
}

type ActionsProps = {type:"getMyPosts", payload:any}

export const dataReducer = (state:any, actions:ActionsProps)=> {
    switch(actions.type){
        case "getMyPosts":
            return {
                ...state,
                posts: actions.payload, // Actualizamos los posts con el payload
            }
        default:
            return state
    }
}