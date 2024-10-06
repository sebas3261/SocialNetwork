
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
    bio: String;
}

type ActionsProps = {type:"GET",payload: newDataPropos}

export const useInfoReducer = (state:any, actions:any)=> {
    switch(actions.type){
        case "GET":
            return {
                ...state,
                user: actions.payload,
            }
        default:
            return state
    }
}