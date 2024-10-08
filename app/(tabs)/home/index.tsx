import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useCallback, useEffect } from 'react';
import { DataContext } from '@/context/dataContext/dataContext';
import { PostProps } from '@/interfaces/postsinterfaces';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado este paquete

export default function Home() {
  const { state2, getAllPosts } = useContext(DataContext);
  const { getUserinfo } = useContext(DataContext);

  useFocusEffect(
    useCallback(() => {
      getAllPosts();
    }, [])
  );

  useEffect(() => {
    getUserinfo();
  }, []);

  const renderPost = ({ item }: { item: PostProps }) => (
    <View style={styles.postContainer}>
      {/* Encabezado del post */}
      <View style={styles.postTop}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.user}>{item.user}</Text>
          <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
            {item.address}
          </Text>
        </View>

        {/* Icono de 3 puntos para configuraciones */}
        <TouchableOpacity style={styles.moreOptions}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Imagen del post */}
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={state2.posts}
        renderItem={renderPost}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginVertical: 10, // Espaciado entre cada post
    marginHorizontal: 10,
    backgroundColor: '#FFF', // Fondo blanco para cada post
    borderRadius: 10, // Esquinas redondeadas
    overflow: 'hidden', // Para que la imagen no se salga del contenedor
  },
  postTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userInfoContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  user: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
  },
  location: {
    color: '#555',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left',
    flexShrink: 1, // Para que se ajuste con puntos suspensivos si es necesario
  },
  moreOptions: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  postImage: {
    width: '100%',
    height: 300, // Ajuste de altura para las imágenes del post
    resizeMode: 'cover',
  },
});
