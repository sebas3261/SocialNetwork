import { createContext, useReducer } from "react";
import { authReducer, AuthState } from "./AuthReducer";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

const defaultValues: AuthState = {
    user: undefined,
    isLogged: false
}

interface AuthContextProps {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    update: (newData: newDataPropos) => Promise<void>;
}

interface newDataPropos {
    name?: String;
    lastname?: String;
    username?: String;
    age?: number;
    phone?: number;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, defaultValues);

    const auth = getAuth();

    
    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            
            dispatch({ type: "LOGIN", payload: user });
        } catch (error) {
            throw error;
        }
    };

   
    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            
            dispatch({ type: "LOGIN", payload: user });


        } catch (error) {
            throw error;
        }
    };

    const update = async(newData: newDataPropos)=>{

        try {
            console.log({newData, uid:state.user.uid,toSave:{...state.user,...newData} })
            await setDoc(doc(db,"users",state.user.uid),{...newData,email:state.user.email})
        } catch (error) {
            console.log(error)            
        }

        dispatch({ type: "LOGIN", payload: {...state.user, ...newData} });

    }

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                signUp,
                update
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
