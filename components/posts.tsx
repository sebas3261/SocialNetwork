import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/dataContext/dataContext";
import { PostProps } from "@/interfaces/postsinterfaces";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener instalado este paquete

export default function Posts() {
  const { state, getPosts } = useContext(DataContext);
  const [isPressed, setPressed] = useState(false);
  const [CurrentImg, setCurrentImg] = useState();
  const [CurrentDescription, setCurrentDescription] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentLocation, setCurrenLocation] = useState("");

  useEffect(() => {
    // Llamamos a getPosts para cargar los posts cuando el componente se monta
    getPosts();
  }, []);

  // Obtener el ancho de la pantalla
  const screenWidth = Dimensions.get("window").width;

  // Renderiza cada post
  const renderPost = ({ item }: { item: PostProps }) => (
    <View style={[styles.postContainer, { width: screenWidth / 3 - 2 }]}>
      <TouchableOpacity
        onPress={() => {
          setPressed(true);
          setCurrentImg(item.image);
          setCurrentDescription(item.description);
          setCurrentUser(item.user);
          setCurrenLocation(item.address);
        }}
      >
        <Image source={{ uri: item.image }} style={styles.postImage} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={isPressed}>
        <View style={styles.postTop}>
          <TouchableOpacity onPress={() => setPressed(false)}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.user}>{currentUser}</Text>
          <View style={styles.locationContainer}>
            <Text
              style={styles.location}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {currentLocation}
            </Text>
          </View>
        </View>
        <Image source={{ uri: CurrentImg }} style={styles.postImage} />
        <Text>{CurrentDescription}</Text>
      </Modal>
      <FlatList
        data={state.posts} // Usa el estado para obtener los posts
        renderItem={renderPost}
        numColumns={3} // Establece 3 columnas
        columnWrapperStyle={styles.row} // Estilo para las filas
        showsVerticalScrollIndicator={false} // Opcional: quita el indicador de scroll
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    margin: 1, // Margen de 1 píxel en todos los lados
    alignItems: "center",
  },
  postImage: {
    width: "100%",
    aspectRatio: 1, // Asegura que las imágenes sean cuadradas
  },
  row: {
    justifyContent: "space-between",
  },
  postTop: {
    marginTop: 40,
    padding: 20,
    paddingLeft: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Alinea verticalmente
  },
  user: {
    fontWeight: "bold",
    flex: 1, // Ocupa la mitad izquierda junto con el botón
    textAlign: "center", // Centra el texto en su mitad del espacio disponible
  },
  locationContainer: {
    flex: 1, // Ocupa la mitad derecha
    alignItems: "flex-end", // Alinea el texto a la derecha
  },
  location: {
    flexShrink: 1, // Permite que el texto se ajuste con puntos suspensivos
    textAlign: "right", // Alinea el texto a la derecha
  },
});
