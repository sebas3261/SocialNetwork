import { View, Text, Image, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { router, Stack, useFocusEffect } from 'expo-router';
import { Toptabs } from '@/components/toptabs';
import { DataContext } from '@/context/dataContext/dataContext';

export default function Profile() {
  const { stateUser: { user }, getUserinfo } = useContext(DataContext); // Accediendo al estado del contexto
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<boolean>(false);

  // Comprobación condicional para asegurar que user existe antes de acceder a sus propiedades
  const name = user?.name ? user.name.toString() : "Anonymous";
  const posts = user?.post ? user.post.toString() : "0";
  const followers = user?.folowers ? user.folowers.toString() : "0";
  const following = user?.folowing ? user.folowing.toString() : "0";

  useEffect(() => {
    setTheme(colorScheme === "dark");
  }, [colorScheme]);

  useFocusEffect(
    useCallback(() => {
      getUserinfo();
      
    }, []) // El array de dependencias vacío asegura que se llame cada vez que la pantalla se enfoca
  );

  const iconColor = theme ? "white" : "black";
  
  const profileImage =  require('@/assets/images/whiteprofile.png'); // Ajuste dinámico de la imagen según el tema

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
      color: theme ? 'white' : 'black',
    },
    or: {
      color: theme ? 'white' : 'black',
    },
    input: {
      borderRadius: 20,
      width: 300,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: theme ? 'white' : 'black',
      color: theme ? 'white' : 'black',
    },
    bio: {
      marginLeft: 20,
      color: theme ? 'white' : 'black',
    }
  });

  // Render condicional para mostrar solo si `user` está definido
  if (!user) {
    return (
      <View style={dynamicStyle.background}>
        <Text style={dynamicStyle.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyle.background}>
      <View style={styles.container}>
        <Image style={styles.image} source={profileImage} />
        <View style={styles.data}>
          <Text style={dynamicStyle.or}>{posts}</Text>
          <Text style={dynamicStyle.or}>posts</Text>
        </View>
        <View style={styles.data}>
          <Text style={dynamicStyle.or}>{followers}</Text>
          <Text style={dynamicStyle.or}>followers</Text>
        </View>
        <View style={styles.data}>
          <Text style={dynamicStyle.or}>{following}</Text>
          <Text style={dynamicStyle.or}>following</Text>
        </View>
      </View>
      <Text style={dynamicStyle.title}>{name}</Text>
      <Text style={dynamicStyle.bio}>Biography...</Text>
      <View style={styles.butonscont}>
        <TouchableOpacity onPress={()=> router.push('/profile/edit')}>
          <View style={styles.editbut}>
            <Text style={styles.text}>Edit profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.editbut}>
            <Text style={styles.text}>Share profile</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Toptabs />
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
  butonscont:{
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-around",
    padding: 10
  },
  editbut:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F5F7",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    height: 40,
    width: 180
  },
  text: {
    fontWeight: "700"
  }
});
