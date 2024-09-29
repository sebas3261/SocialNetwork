import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/authContext/AuthContext'; // Asegúrate de importar correctamente el contexto
import { Stack } from 'expo-router';
import { Toptabs } from '@/components/toptabs';

export default function Profile() {
  const { state } = useContext(AuthContext); // Accediendo al estado del contexto
  const user = state.user.username|| "Anonymous";
  const posts = state.user.post?.toString() || "-1";
  const folowers = state.user.folowers?.toString() || "-1";
  const folowing = state.user.folowing?.toString() || "-1";
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<boolean>(false);

  useEffect(() => {
    setTheme(colorScheme === "dark");
  }, [colorScheme]);

  const iconColor = theme ? "white" : "black";
  
  let profile = "@/assets/images/whiteprofile.png"; // Ruta a la imagen del perfil

  const dynamicStyle = StyleSheet.create({
    background: {
      backgroundColor: theme ? '#151718' : 'white',
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 20,
      marginTop: -10,
      color: theme? 'white' : 'black',
    },
    or: {
      color: theme? 'white' : 'black',
    },
    input: {
      borderRadius: 20,
      width: 300,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: theme? 'white' : 'black',
      color: theme? 'white' : 'black',
    },
    bio: {
      marginLeft: 20,
      color: theme? 'white' : 'black',
    }
  });

  return (
    <View style={dynamicStyle.background}>
      <View style={styles.container}>
        <Image style={styles.image} source={require(profile)} />
        <View style={styles.data}>
          <Text style={dynamicStyle.or}>{posts}</Text>
          <Text style={dynamicStyle.or}>posts</Text>
        </View>
        <View style={styles.data}>
          <Text style={dynamicStyle.or}>{folowers}</Text>
          <Text style={dynamicStyle.or}>followers</Text>
        </View>
        <View style={styles.data}>
          <Text style={dynamicStyle.or}>{folowing}</Text>
          <Text style={dynamicStyle.or}>following</Text>
        </View>
      </View>
      <Text style={dynamicStyle.title}>{user}</Text>
      <Text style={dynamicStyle.bio}>Biography...</Text>
      <Toptabs/>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  data: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: -10,
  },
});
