import { View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, Button, Animated, Platform, TextInput, useColorScheme } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'expo-router'
import { AuthContext } from '@/context/authContext/AuthContext'

export default function userdata() {
  const [name, onChangeName] = React.useState("")
  const [lastname, onChangeLastname] = React.useState("")
  const [number, onChangereNumber] = React.useState("")
  const [age, onChangeAge] = React.useState('');
  const [user, onChangeUser] = React.useState('');
  const {update} = useContext(AuthContext) 

  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<boolean>(false);

  const animatedMarginBottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTheme(colorScheme === "dark");
  }, [colorScheme]);
  
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        animateMarginBottom(event.endCoordinates.height);
      }
    );
    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        animateMarginBottom(0);
      }
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const animateMarginBottom = (toValue: number) => {
    Animated.timing(animatedMarginBottom, {
      toValue,
      duration: 300, // Duración de la animación
      useNativeDriver: false, // No se puede usar el driver nativo con propiedades de diseño
    }).start();
  };

  const dynamicStyle = {
    background: {
      backgroundColor: theme ? '#151718' : 'white',
      padding: 20,
      borderRadius: 10,
      flex: 1,
    },
    title: {
      fontSize: 45,
      marginBottom: 20,
      color: theme? 'white' : 'black'
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
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={dynamicStyle.background}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View style={[styles.inner, { marginBottom: animatedMarginBottom }]}>
        <Text
        style={dynamicStyle.title}
        >Let us Know you...</Text>
        <TextInput
          style={dynamicStyle.input}
          placeholder='Name'
          placeholderTextColor="gray" 
          onChangeText={onChangeName}
          value={name}
        />
        <TextInput
          style={dynamicStyle.input}
          placeholder='last name'
          placeholderTextColor="gray" 
          onChangeText={onChangeLastname}
          value={lastname}
        />
         <TextInput
          style={dynamicStyle.input}
          placeholder='user'
          placeholderTextColor="gray" 
          onChangeText={onChangeUser}
          value={user}
        />
        <TextInput
          style={dynamicStyle.input}
          onChangeText={onChangeAge}
          value={age}
          placeholder="age"
          placeholderTextColor="gray"
          keyboardType="numeric"
        />
        <TextInput
          style={dynamicStyle.input}
          onChangeText={onChangereNumber}
          value={number}
          placeholder="phone number"
          placeholderTextColor="gray"
          keyboardType="numeric"
        />
        <Link href={"/(tabs)/home"} asChild>
          <TouchableOpacity style={styles.button}
            onPress={()=>update({
              name,
              lastname,
              phone: Number(number),
              age: Number(age),
              username: user,
              post: 0,
              folowers: 0,
              folowing: 0
            })}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </Link>
        </Animated.View>
      </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 100,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});