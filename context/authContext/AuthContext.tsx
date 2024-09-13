import { createContext, useReducer } from "react";
import { authReducer, AuthState } from "./AuthReducer";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const defaultValues: AuthState = {
    user: undefined,
    isLogged: false
}

interface AuthContextProps {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, defaultValues);

    const auth = getAuth();

    
    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            
            dispatch({ type: "LOGIN", payload: { name: user.email } });
        } catch (error) {
            throw error;
        }
    };

   
    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            
            dispatch({ type: "LOGIN", payload: { name: user.email } });
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                signUp
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
