import { View, Text, TextInput, Switch, TouchableWithoutFeedback, Keyboard,KeyboardEvent, TouchableOpacity, Animated, ActivityIndicator, StyleSheet, Platform, Alert, Modal } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import * as Font from 'expo-font';
import LottieView from 'lottie-react-native'; 
import { AuthContext } from '@/context/authContext/AuthContext';
import { router } from 'expo-router';

export default function SignIn() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const animatedMarginBottom = useRef(new Animated.Value(0)).current;
  const [LogIn, setLogIn] = useState(false);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    loadFonts();
  }, []); 

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event: KeyboardEvent) => {
        animateMarginBottom(150);
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

  const handleSignIn = async () => {
    if (!Email || !Password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLogIn(true)

    try{
      await login(Email, Password);
      router.replace("/(tabs)/home")
    }catch(error){
      setLogIn(false)
      Alert.alert("Login Error", "Unable to sign in. Please check your credentials.");
    }

  }

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        "IG": require('../assets/fonts/ig.otf')
      });
      setFontsLoaded(true);
    } catch (error) {
      console.log("Error loading font: ", error);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.background}>
      <Modal
         visible={LogIn}
    >
  <View style={styles.lottieb}>
    <LottieView 
      source={require('../assets/lottie/Loading.json')}
      autoPlay 
      loop
      style={styles.lottie}
    />
  </View>
</Modal>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View style={[styles.inner, { marginBottom: animatedMarginBottom }]}>
          <Text style={styles.logo}>Instagram</Text>
          <TextInput
            placeholder='email'
            placeholderTextColor="gray"
            onChangeText={setEmail}
            value={Email}
            keyboardType="email-address"
            autoCapitalize='none'
            style={styles.input}
          />
          <TextInput
            placeholder='password'
            placeholderTextColor='gray'
            onChangeText={setPassword}
            value={Password}
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
          />
          <View style={styles.show}>
            <Switch
              value={isPasswordVisible}
              onValueChange={setIsPasswordVisible}
            />
            <Text style={styles.showp}>Show password:</Text>
          </View>
          <TouchableOpacity style={styles.signinb}>
            <Text style={styles.signint} onPress={handleSignIn}>Sign in</Text>
          </TouchableOpacity>
          <Text style={styles.or}>- or -</Text>
          <TouchableOpacity onPress={()=>router.push("/signup")}>
            <Text style={styles.signup}>Sign up</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    height: "100%",
    width: "100%",
  },
  inner:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontFamily: "IG",
    fontSize: 70,
    marginBottom: 20,
  },
  input: {
    borderRadius: 20,
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  show: {
    width: "80%",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15
  },
  showp: {
    fontSize: 15,
    fontWeight: "700",
    marginRight: 10
  },
  signinb: {
    width: 100,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  signint:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  or: {
    marginBottom: 10,
    marginTop: 10
  },
  signup: {
    color: '#007BFF',
    fontSize: 20
  },
  lottieb: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
