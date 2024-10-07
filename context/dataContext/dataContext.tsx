import { createContext, useContext, useEffect, useReducer } from "react";
import { dataReducer } from "./dataReducer";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { DefaultResponse, PostProps } from "@/interfaces/postsinterfaces";
import { addDoc, collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { AuthContext } from "../authContext/AuthContext";
import { allpostReducer } from "./allpostReducer";
import { AuthState, useInfoReducer } from "./userInfoReducer";

export interface DataState {
    posts: []; // Asegúrate de que PostProps define los campos de una publicación

}

const dataStateDefault = {
    posts: [], // Inicializamos los posts como un array vacío

}



interface DataContextProps {
    state: DataState,
    newPost: (newPost: PostProps) => Promise<DefaultResponse>
    getPosts: () => void; // Elimina el parámetro de getPosts
    getAllPosts: () => Promise<{
        id: string;
    }[]>
    state2: DataState
    getUserinfo: () => Promise<void>
    stateUser: AuthState
    updateUser: (type: String, data: any) => Promise<void>
}

export const DataContext = createContext({} as DataContextProps);

export function DataProvider({ children }: any) {

    const [state, dispatch] = useReducer(dataReducer, dataStateDefault);
    const [state2, dispatch2] = useReducer(allpostReducer, dataStateDefault);
    const [stateUser, dispatchUser] = useReducer(useInfoReducer, dataStateDefault)
    const { state: { user } } = useContext(AuthContext)

    useEffect(() => {

    }, []);


    const uploadImage = async (uri: string) => {
        const storage = getStorage();
        const storageRef = ref(storage, 'posts/'+ Date.now());
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const snapshot =await uploadBytes(storageRef,blob);
            const url = await getDownloadURL(storageRef);
            console.log('Uploaded a raw string!');
            console.log({
                snapshot
            })
            return url?? "";
        } catch (error) {
            console.log(error)
        }
    }

    const getUserinfo = async () =>{
        try{
            const ref = doc(db, "users", user.uid);
            const userDoc = await getDoc(ref);

            const userData = userDoc.data();

            dispatchUser({type: "GET", payload: userData})
        }
        catch(error){
            console.log(error);
        }
    }

    const getPosts = async () => {
        try {
            if (!user || !user.uid) {
                throw new Error("User is not defined or user.uid is undefined");
            }
            
            const postRef = collection(db, "posts");
            const q = query(postRef, where("postedBy", "==", user.uid));
            
            const querySnapshot = await getDocs(q);
            
            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            
            dispatch({type: "getMyPosts", payload: posts});
            return posts;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const getAllPosts = async () => {

        try{
            const postRef = collection(db, "posts");
            const querySnapshot = await getDocs(postRef);
            
            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            dispatch2({type: "getPosts", payload: posts});
            return posts;  

        }catch(error){
            console.log(error);
            return [];
        }
    }
    
    


    const newPost = async (newPost: PostProps): Promise<DefaultResponse> => {
        try {
            const urlImage = await uploadImage(newPost.image);

            const docRef2 = doc(db, 'users', user.uid);

            const docRef = await addDoc(collection(db, "posts"), {
                ...newPost,
                image: urlImage,
                date: new Date(),
                username: user.email,
                postedBy: user.uid,
                likes: 0,
                user: stateUser.user.username
            });
            console.log("estos son los posts guardados",getPosts())
            console.log("Document written with ID: ", docRef.id);
            await getPosts()
            await updateDoc(docRef2, {
                'post': increment(1)
            });
            return {
                isSuccess: true,
                message: "Creado con exito"
            }
            
        } catch (error) {
            console.log(error);
            return {
                isSuccess: false,
                message: "Hubo un error: " + error
            }
        }
    }

    const updatePost = async () => {
    }

    const deletePost = async () => {
    }

    const uploadUserImage = async (uri: string) => {
        const storage = getStorage();
        const storageRef = ref(storage, 'User/'+ user.uid);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const snapshot =await uploadBytes(storageRef,blob);
            const url = await getDownloadURL(storageRef);
            console.log('Uploaded a raw string!');
            console.log({
                snapshot
            })
            return url?? "";
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async(type: String, data:any) => {
        const docRef = doc(db, 'users', user.uid);
        try{
        if(type == "Image"){
            const urlImage = await uploadUserImage(data);
            await updateDoc(docRef, {
                "Image": urlImage
            });
        }
        else{
            await updateDoc(docRef, {
                [type.toString()]: data.toString()
            });
        }
        }catch(error){
            console.log(error)
        }
        getUserinfo()
    }


    return <DataContext.Provider
        value={{
            state,
            newPost,
            getPosts,
            getAllPosts,
            state2,
            getUserinfo,
            stateUser,
            updateUser
        }}
    >
        {children}
    </DataContext.Provider>
}