export interface dataState{
    user?: any,
    isLogged: boolean
}

type ActionsProps = {type:"getPosts", payload:any} | {type:"LOGOUT"}

export const allpostReducer = (state:any, actions:ActionsProps)=> {
    switch(actions.type){
        case "getPosts":
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