import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/dataContext/dataContext";
import { PostProps } from "@/interfaces/postsinterfaces";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener instalado este paquete
import { StatusBar } from "react-native"; // Importa esto para ajustar el espaciado dinámico

export default function Posts() {
  const { state, getPosts, deletePost } = useContext(DataContext);
  const [isPressed, setPressed] = useState(false);
  const [CurrentImg, setCurrentImg] = useState<string | undefined>();
  const [CurrentDescription, setCurrentDescription] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentLocation, setCurrenLocation] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const screenWidth = Dimensions.get("window").width;

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

  const handleDeletePost = async () => {
    setIsSaving(true); // Activa el estado de guardado antes de eliminar
    await deletePost(CurrentImg?.toString()); // Espera a que se complete la eliminación
    setIsVisible(false);
    setPressed(false);
    setIsSaving(false); // Desactiva el estado de guardado después de completar
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={isPressed} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setPressed(false)}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <View style={styles.userInfoContainer}>
              <Text style={styles.user}>{currentUser}</Text>
              <Text
                style={styles.location}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {currentLocation}
              </Text>
            </View>

            {/* Icono de 3 puntos para configuraciones */}
            <TouchableOpacity
              style={styles.moreOptions}
              onPress={() => setIsVisible(true)}
            >
              <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Image source={{ uri: CurrentImg }} style={styles.fullImage} />

          <View style={styles.descriptionContainer}>
            <Text style={styles.userDescription}>{currentUser}</Text>
            <Text style={styles.description}>{CurrentDescription}</Text>
          </View>
        </View>

        <Modal visible={isVisible} animationType="slide" transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer2}>
              <Text style={styles.modalTitle}>Post options</Text>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Edit Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={handleDeletePost} // Llama a la función de eliminación
              >
                <Text style={styles.optionText}>Delete Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal visible={isSaving} animationType="fade">
            <View style={styles.deletingContainer}>
              <Text style={styles.deletingText}>Deleting...</Text>
            </View>
          </Modal>
        </Modal>
      </Modal>

      <FlatList
        data={state.posts}
        renderItem={renderPost}
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        // Añadido para centrar el contenido en filas
        contentContainerStyle={{ justifyContent: state.posts.length < 3 ? 'center' : 'flex-start' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    margin: 1,
    alignItems: "center",
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
  },
  row: {
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: StatusBar.currentHeight || 30, // Ajuste dinámico para evitar que quede sobre la barra de notificaciones
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between", // Asegura que la flecha, el texto y el ícono se distribuyan correctamente
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  userInfoContainer: {
    flexDirection: "column",
    marginLeft: 10,
    flex: 1,
  },
  user: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  location: {
    color: "#555",
    fontSize: 14,
    marginTop: 5,
    textAlign: "left",
    flexShrink: 1,
  },
  moreOptions: {
    paddingRight: 10, // Alinea el icono de 3 puntos a la derecha
  },
  fullImage: {
    width: "100%",
    height: 400, // Ajuste de altura para que la imagen esté más cerca del encabezado
    resizeMode: "cover",
  },
  descriptionContainer: {
    padding: 15,
    flexDirection: "row",
  },
  userDescription: {
    fontWeight: "bold",
    marginRight: 5,
  },
  description: {
    color: "#333",
    fontSize: 16,
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end", // Posiciona el modal al fondo
    backgroundColor: "rgba(0, 0, 0, 0)", // Fondo oscuro con transparencia
  },
  modalContainer2: {
    backgroundColor: "#FFF",
    padding: 20,
    height: "50%", // Ocupa la mitad de la pantalla
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center", // Centra verticalmente
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10, // Sombra para Android
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Color más oscuro para el título
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // Color más claro para las divisiones
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#007BFF", // Color para el texto de las opciones
  },
  closeButton: {
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#FF3B30", // Color para el botón de cerrar
    textAlign: "center",
  },
  deletingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro con transparencia
  },
  deletingText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFF", // Color del texto blanco
  },
});
