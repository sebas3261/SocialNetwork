import { createContext, useContext, useEffect, useReducer } from "react";
import { dataReducer } from "./dataReducer";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { DefaultResponse, PostProps } from "@/interfaces/postsinterfaces";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { AuthContext } from "../authContext/AuthContext";
import { allpostReducer } from "./allpostReducer";
import { AuthState, useInfoReducer } from "./userInfoReducer";

export interface DataState {
  posts: []; // Asegúrate de que PostProps define los campos de una publicación
}

const dataStateDefault = {
  posts: [], // Inicializamos los posts como un array vacío
};

interface DataContextProps {
  state: DataState;
  newPost: (newPost: PostProps) => Promise<DefaultResponse>;
  getPosts: () => void; // Elimina el parámetro de getPosts
  getAllPosts: () => Promise<
    {
      id: string;
    }[]
  >;
  state2: DataState;
  getUserinfo: () => Promise<void>;
  stateUser: AuthState;
  updateUser: (type: String, data: any) => Promise<void>;
  deletePost: (post: any) => Promise<void>;
  removeData: () => Promise<void>
}

export const DataContext = createContext({} as DataContextProps);

export function DataProvider({ children }: any) {
  const [state, dispatch] = useReducer(dataReducer, dataStateDefault);
  const [state2, dispatch2] = useReducer(allpostReducer, dataStateDefault);
  const [stateUser, dispatchUser] = useReducer(
    useInfoReducer,
    dataStateDefault
  );
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {}, []);

  const uploadImage = async (uri: string) => {
    const storage = getStorage();
    const storageRef = ref(storage, "posts/" + Date.now());
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      console.log("Uploaded a raw string!");
      console.log({
        snapshot,
      });
      return url ?? "";
    } catch (error) {
      console.log(error);
    }
  };

  const getUserinfo = async () => {
    try {
      const ref = doc(db, "users", user.uid);
      const userDoc = await getDoc(ref);

      const userData = userDoc.data();

      dispatchUser({ type: "GET", payload: userData });
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      if (!user || !user.uid) {
        throw new Error("User is not defined or user.uid is undefined");
      }

      const postRef = collection(db, "posts");
      const q = query(postRef, where("postedBy", "==", user.uid));

      const querySnapshot = await getDocs(q);

      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({ type: "getMyPosts", payload: posts });
      return posts;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getAllPosts = async () => {
    try {
      const postRef = collection(db, "posts");
      const querySnapshot = await getDocs(postRef);

      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch2({ type: "getPosts", payload: posts });
      return posts;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const newPost = async (newPost: PostProps): Promise<DefaultResponse> => {
    try {
      const urlImage = await uploadImage(newPost.image);

      const docRef2 = doc(db, "users", user.uid);

      const docRef = await addDoc(collection(db, "posts"), {
        ...newPost,
        image: urlImage,
        date: new Date(),
        username: user.email,
        postedBy: user.uid,
        likes: 0,
        user: stateUser.user.username,
      });
      console.log("estos son los posts guardados", getPosts());
      console.log("Document written with ID: ", docRef.id);
      await getPosts();
      await updateDoc(docRef2, {
        post: increment(1),
      });
      return {
        isSuccess: true,
        message: "Creado con exito",
      };
    } catch (error) {
      console.log(error);
      return {
        isSuccess: false,
        message: "Hubo un error: " + error,
      };
    }
  };

  const updatePost = async () => {};

  const deletePost = async (post: String) => {
    const docRef2 = doc(db, "users", user.uid);
    const storage = getStorage();
    const extractedValue = post.split('posts%2F')[1].split('?')[0];
    const desertRef = ref(storage, 'posts/' + extractedValue);
    
    // Primero, borra el archivo en Firebase Storage
    try {
      await deleteObject(desertRef);
      console.log("Archivo eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
      return; // Salimos de la función si hay un error
    }
  
    // Luego, busca el documento del post en Firestore
    const postRef = collection(db, "posts");
    const q = query(postRef, where("image", "==", post)); // Asegúrate de usar el campo correcto que identifica el post
    const querySnapshot = await getDocs(q);
  
    // Elimina el documento encontrado
    if (!querySnapshot.empty) {
      for (const doc of querySnapshot.docs) {
        try {
          await deleteDoc(doc.ref); // Usa doc.ref para obtener la referencia del documento
          console.log(`Documento ${doc.id} eliminado exitosamente`);
        } catch (error) {
          console.error(`Error al eliminar el documento ${doc.id}:`, error);
        }
      }
    } else {
      console.log("No se encontraron documentos para eliminar");
    }
  
    // Finalmente, actualiza el conteo de posts en la colección de usuarios
    try {
      await updateDoc(docRef2, {
        post: increment(-1),
      });
      console.log("Conteo de posts actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el conteo de posts:", error);
    }
  
    // Llama a getPosts si es necesario
    await getPosts();
    await getUserinfo();
  };
  
  

  const uploadUserImage = async (uri: string) => {
    const storage = getStorage();
    const storageRef = ref(storage, "User/" + user.uid);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      console.log("Uploaded a raw string!");
      console.log({
        snapshot,
      });
      return url ?? "";
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (type: String, data: any) => {
    const docRef = doc(db, "users", user.uid);
    try {
      if (type == "Image") {
        const urlImage = await uploadUserImage(data);
        await updateDoc(docRef, {
          Image: urlImage,
        });
      } else {
        await updateDoc(docRef, {
          [type.toString()]: data.toString(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    getUserinfo();
  };

  const removeData = async()=>{
    dispatch({ type: "LOGOUT" });
    dispatch2({ type: "LOGOUT" });
    dispatchUser({ type: "LOGOUT" });
    
  }

  return (
    <DataContext.Provider
      value={{
        state,
        newPost,
        getPosts,
        getAllPosts,
        state2,
        getUserinfo,
        stateUser,
        updateUser,
        deletePost,
        removeData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
