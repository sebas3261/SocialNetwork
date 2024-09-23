import { View, Text, TouchableWithoutFeedback, Keyboard, TextInput, StyleSheet, TouchableOpacity, Button, Alert, Animated, Platform, useColorScheme } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, router } from 'expo-router'
import { AuthContext } from '@/context/authContext/AuthContext'

export default function Signup() {

  const { signUp } = useContext(AuthContext)  
  const [email, onChangeUser] = React.useState("")
  const [password, onChangePassword] = React.useState("")
  const [repassword, onChangeRePassword] = React.useState("")

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
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const verify = async () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = regexEmail.test(email);
    
    const regexContrasenaSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const contrasenaSegura = regexContrasenaSegura.test(password);
    
    if (!contrasenaSegura || !emailValido) {
      Alert.alert("Error", "Email or password are not valid, paswords must have 8 characters, Caps and a special character");
      return;
    }

    try {
      await signUp(email, password);
      router.push("/signup/userdata");
    } catch (error) {
      Alert.alert("Error", "Something went wrong signing up");
    }
  };

  const dynamicStyle = {
    background: {
      backgroundColor: theme ? '#151718' : 'white',
      padding: 20,
      borderRadius: 10,
      flex: 1,
    },
    title: {
      fontSize: 40,
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
        <Animated.View style={[styles.inner, { marginBottom: animatedMarginBottom }]}>
          <Text style={dynamicStyle.title}>Create an account</Text>
          <TextInput
            style={dynamicStyle.input}
            placeholder='email'
            placeholderTextColor="gray" 
            onChangeText={onChangeUser}
            value={email}
            autoCapitalize="none"
          />
          <TextInput
            style={dynamicStyle.input}
            placeholder='password'
            placeholderTextColor="gray" 
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry
          />
          <TextInput
            style={dynamicStyle.input}
            placeholder='repeat password'
            placeholderTextColor="gray" 
            onChangeText={onChangeRePassword}
            value={repassword}
            secureTextEntry
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={verify}
            disabled={password !== repassword || !password || !repassword}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <Link href={"/signin"} asChild>
            <Button title="Already have an account?" />
          </Link>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingTop: 50,
    fontSize: 45,
    marginBottom: 20
  },
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
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});