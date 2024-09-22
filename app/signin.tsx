import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Alert, Animated, Keyboard, KeyboardEvent, Platform, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/context/authContext/AuthContext';

export default function Signin() {
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>(""); 
  const router = useRouter(); 
  const [loading, setLoading] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<boolean>(false);

  const animatedMarginBottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTheme(colorScheme === "dark");
  }, [colorScheme]);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event: KeyboardEvent) => {
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

  const handleSignIn = async () => {
    if (!user || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await login(user, password);
      router.push("/(tabs)/home");
    } catch (error) {
      Alert.alert("Login Error", "Unable to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyle = {
    background: {
      backgroundColor: theme ? 'black' : 'white',
      padding: 20,
      borderRadius: 10,
      flex: 1,
    },
    title: {
      fontSize: 50,
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
    <View style={dynamicStyle.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={[styles.inner, { marginBottom: animatedMarginBottom }]}>
        <Text style={dynamicStyle.title}>Instagram</Text>
        <TextInput
          style={dynamicStyle.input}
          placeholder='email'
          placeholderTextColor="gray"
          onChangeText={setUser}  
          value={user}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={dynamicStyle.input}
          placeholder='password'
          placeholderTextColor="gray"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.button]} 
          onPress={handleSignIn} 
          disabled={loading} 
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <Text style={dynamicStyle.or}>-or-</Text>
        <Button
          title="Create an account"
          onPress={() => router.push("/signup")}
        />
      </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonDisabled: {
    backgroundColor: '#B0C4DE',
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
  },
  
});

