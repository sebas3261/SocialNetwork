
export interface AuthState{
    user?: any,
    isLogged: boolean
}

type ActionsProps = {type:"LOGIN",payload: any} | {type:"LOGOUT"}

export const authReducer = (state:any, actions:any)=> {
    switch(actions.type){
        case "LOGIN":
            return {
                ...state,
                user: {
                    uid: actions.payload.uid,
                    ...actions.payload.userData  // Los datos adicionales del usuario
                },
                isLogged: true
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