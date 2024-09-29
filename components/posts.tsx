import { View, Text , StyleSheet, Image, FlatList} from 'react-native'
import React, { useContext, useEffect } from 'react'
import { DataContext } from '@/context/dataContext/dataContext';
import { PostProps } from '@/interfaces/postsinterfaces';


export default function Posts() {

    const { state, getPosts } = useContext(DataContext);
    useEffect(() => {
        // Llamamos a getPosts para cargar los posts cuando el componente se monta
        getPosts();
      }, []);
    
      // Renderiza cada post
      const renderPost = ({ item }: { item: PostProps }) => (
        <View style={styles.postContainer}>
          <Image source={{ uri: item.image }} style={styles.postImage} />
        </View>
      ); 
    return (
        <View>
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
      }
});