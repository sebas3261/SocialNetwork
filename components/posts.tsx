import { View, Text , StyleSheet, Image, FlatList, TouchableOpacity, Modal} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '@/context/dataContext/dataContext';
import { PostProps } from '@/interfaces/postsinterfaces';


export default function Posts() {

    const { state, getPosts } = useContext(DataContext);
    const [isPressed, setPressed]= useState(false)
    const [CurrentImg, setCurrentImg] = useState()
    const [CurrentDescription, setCurrentDescription] = useState("");
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        // Llamamos a getPosts para cargar los posts cuando el componente se monta
        getPosts();
      }, []);
    
      // Renderiza cada post
      const renderPost = ({ item }: { item: PostProps }) => (
        <View style={styles.postContainer}>
          <TouchableOpacity onPress={()=>{
            setPressed(true)
            setCurrentImg(item.image)
            setCurrentDescription(item.description)
            setCurrentUser(item.user)
            console.log(item.username)
          }}>
            <Image source={{ uri: item.image }} style={styles.postImage} />
          </TouchableOpacity>
        </View>
      );  
    return (
        <View>
          <Modal
            visible = {isPressed}
          >
            <View style={styles.postTop}>
            <Text>{currentUser}</Text>
            </View>
            <Image source={{ uri: CurrentImg }} style={styles.postImage} />
            <Text>{CurrentDescription}</Text>
            <TouchableOpacity onPress={()=>setPressed(false)}>
                <Text>return</Text>
            </TouchableOpacity>
          </Modal>
          <FlatList
            data={state.posts} // Usa el estado para obtener los posts
            renderItem={renderPost} 
            numColumns={3} // Establece 3 columnas
            columnWrapperStyle={styles.row} // Estilo para las filas
            showsVerticalScrollIndicator={false} // Opcional: quita el indicador de scroll
      />
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
      },
      postImage: {
        width: '100%', 
        aspectRatio: 1, 
        borderRadius: 10,
      },
      row: {
        justifyContent: 'space-between',
      },
      postTop:{
        marginTop: 20,
        padding: 30,
        display: 'flex',
        justifyContent: "center"
      }
});