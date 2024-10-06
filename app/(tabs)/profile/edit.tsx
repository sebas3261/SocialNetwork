import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import React, { useContext, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import ModalCamera from "@/components/modalCamera";
import { DataContext } from "@/context/dataContext/dataContext";

export default function EditProfile() {
  const [isVisible, setIsVisble] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(undefined as any);
  const { stateUser: { user } } = useContext(DataContext);

  return (
    <View style={styles.all}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setIsVisble(true)}>
          <View style={styles.photoButton}>
            {currentPhoto && currentPhoto.uri ? (
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

        <TouchableOpacity onPress={() => setIsVisble(true)}>
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

      <TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.header}>Name</Text>
          <Text style={styles.text}>{user.name} {user.lastname}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.header}>User</Text>
          <Text style={styles.text}>{user.username}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.header}>Bio</Text>
          <Text style={styles.text}>{user.bio || "No bio available"}</Text>
        </View>
      </TouchableOpacity>
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
});
