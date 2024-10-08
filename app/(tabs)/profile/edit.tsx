import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import React, { useContext, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import ModalCamera from "@/components/modalCamera";
import { DataContext } from "@/context/dataContext/dataContext";

export default function EditProfile() {
  const [isVisible, setIsVisble] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(undefined as any);
  const [isShowFoto, setIsShowFoto] = useState(true);
  const {
    stateUser: { user },
    updateUser,
  } = useContext(DataContext);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [isname, setisName] = useState(false);
  const [Newuser, setNewUser] = useState("");
  const [isUser, setisUser] = useState(false);
  const [bio, setBio] = useState("");
  const [isBio, setIsBio] = useState(false);
  const [isPic, setIsPic] = useState(false);

  const update = async (type: String, data: any) => {
    try {
      await updateUser(type, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.all}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setIsVisble(true);
            setIsPic(true);
            setIsShowFoto(false);
          }}
        >
          <View style={styles.photoButton}>
            {isShowFoto && user.Image ?(
              <Image style={styles.profileImage} source={{ uri: user.Image }} />
            ) : currentPhoto && currentPhoto.uri ? (
              <Image
                style={styles.profileImage}
                source={{ uri: currentPhoto.uri }}
                contentFit="cover"
                transition={1000}
              />
            ) : (
              <FontAwesome5 name="plus" size={30} color="black" />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsVisble(true);
            setIsPic(true);
            setIsShowFoto(false);
          }}
        >
          <Text style={styles.editText}>Edit picture</Text>
        </TouchableOpacity>

        {isVisible && (
          <ModalCamera
            isVisible={isVisible}
            onSave={(photo) => setCurrentPhoto(photo)}
            onClose={() => setIsVisble(false)}
          />
        )}
      </View>

      <Modal visible={isname} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.head}>
              <TouchableOpacity
                style={styles.leftButtonContainer}
                onPress={() => setisName(false)}
              >
                <Text style={styles.closeButton}>&lt;</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Edit Name</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#A0A3A7"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#A0A3A7"
              value={lastname}
              onChangeText={setLastname}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                if (name != "") {
                  update("name", name);
                }
                if (lastname != "") {
                  update("lastname", lastname);
                }
                setisName(false);
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isUser} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.head}>
              <TouchableOpacity
                style={styles.leftButtonContainer}
                onPress={() => setisUser(false)}
              >
                <Text style={styles.closeButton}>&lt;</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Edit User</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="New User"
              placeholderTextColor="#A0A3A7"
              value={Newuser}
              onChangeText={setNewUser}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                if (Newuser != "") {
                  update("username", Newuser);
                }
                setisUser(false);
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isBio} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.head}>
              <TouchableOpacity
                style={styles.leftButtonContainer}
                onPress={() => setIsBio(false)}
              >
                <Text style={styles.closeButton}>&lt;</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Edit Bio</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="New Bio"
              placeholderTextColor="#A0A3A7"
              value={bio}
              onChangeText={setBio}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                if (bio != "") {
                  update("bio", bio);
                }
                setIsBio(false);
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setisName(true)}>
        <View style={styles.info}>
          <Text style={styles.header}>Name</Text>
          <Text style={styles.text}>
            {user.name} {user.lastname}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setisUser(true)}>
        <View style={styles.info}>
          <Text style={styles.header}>User</Text>
          <Text style={styles.text}>{user.username}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsBio(true)}>
        <View style={styles.info}>
          <Text style={styles.header}>Bio</Text>
          <Text style={styles.text}>{user.bio || "No bio available"}</Text>
        </View>
      </TouchableOpacity>

      {isPic && (
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            update("Image", currentPhoto.uri);
            setIsPic(false);
          }}
        >
          <Text style={styles.doneButtonText}>Upload Profile pic</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomColor: "#E8ECEF",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  photoButton: {
    width: 120,
    height: 120,
    backgroundColor: "#F3F4F6",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  editText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#0798F2",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#E8ECEF",
    borderBottomWidth: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: 80,
    fontWeight: "700",
    fontSize: 18,
    color: "#333",
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#555",
    paddingBottom: 5,
    borderBottomColor: "#E8ECEF",
    borderBottomWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E8ECEF",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  doneButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0798F2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  doneButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0798F2",
  },
  head: {
    width: "100%",
    flexDirection: "row", // Para alinear horizontalmente
    justifyContent: "center", // Centrar el contenido
    alignItems: "center",
    marginBottom: 20,
  },
  leftButtonContainer: {
    // Nuevo estilo para el botón de regresar
    position: "absolute",
    left: 0,
  },
});
