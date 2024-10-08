
export interface AuthState{
    user?: any,
}

interface newDataPropos {
    name?: String;
    lastname?: String;
    username?: String;
    age?: number;
    phone?: number;
    post?: number;
    folowers?: number;
    folowing?: number;
    bio?: String;
    Image?: String;
}

type ActionsProps = {type:"GET",payload: newDataPropos} | {type:"LOGOUT"}

export const useInfoReducer = (state:any, actions:any)=> {
    switch(actions.type){
        case "GET":
            return {
                ...state,
                user: actions.payload,
            }
            case "LOGOUT":
            return{
                ...state,
                user: undefined
            }
        default:
            return state
    }
}