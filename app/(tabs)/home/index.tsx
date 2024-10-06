import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useContext, useCallback, useEffect } from 'react';
import { DataContext } from '@/context/dataContext/dataContext';
import { PostProps } from '@/interfaces/postsinterfaces';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const { state2, getAllPosts } = useContext(DataContext);
  const { getUserinfo } = useContext(DataContext);

  // Cargar la información del usuario cuando se monta el componente
  useFocusEffect(
    useCallback(() => {
      getAllPosts();
      
    }, []) // El array de dependencias vacío asegura que se llame cada vez que la pantalla se enfoca
  );

  useEffect(() => {
    // Llamamos a getPosts para cargar los posts cuando el componente se monta
    getUserinfo();
}, []);

  const renderPost = ({ item }: { item: PostProps }) => (
    <View style={styles.postContainer}>
      <View style={styles.postTop}>
        <Text style={styles.user}>{item.user}</Text>
        <View style={styles.locationContainer}>
          <Text
            style={styles.location}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.address}
          </Text>
        </View>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={state2.posts} // Usa el estado para obtener los posts
        renderItem={renderPost}
        numColumns={1}
        showsVerticalScrollIndicator={false} // Opcional: quita el indicador de scroll
      />
    </View>
  );
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
  },
  row: {
    justifyContent: 'space-between',
  },
  postTop: {
    padding: 20,
    paddingLeft: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Alinea verticalmente
  },
  user: {
    fontWeight: "bold",
    flex: 1, // Ocupa la mitad izquierda junto con el botón
    textAlign: 'center', // Centra el texto en su mitad del espacio disponible
  },
  locationContainer: {
    flex: 1, // Ocupa la mitad derecha
    alignItems: 'flex-end', // Alinea el texto a la derecha
  },
  location: {
    flexShrink: 1, // Permite que el texto se ajuste con puntos suspensivos
    textAlign: 'right', // Alinea el texto a la derecha
  },
});
