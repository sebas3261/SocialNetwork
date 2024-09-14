import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button, Alert, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import { AuthContext } from '@/context/authContext/AuthContext'

export default function Signin() {
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>(""); 
  const router = useRouter(); 
  const [loading, setLoading] = useState<boolean>(false); 

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

  return (
      <View style={styles.container}>
        <ScrollView
          style={{
            flex:1
          }}
          contentContainerStyle = {{flexGrow:1, gap:70, justifyContent:"center"}}
          nestedScrollEnabled={true}
        >
          <View style={styles.container}>
          <Text style={styles.title}>Instagram</Text>
          <TextInput
            style={styles.input}
            placeholder='email'
            placeholderTextColor="gray"
            onChangeText={setUser}  
            value={user}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
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
          <Text>-or-</Text>
          <Button
            title="Create an account"
            onPress={() => router.push("/signup")}
          />
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    marginBottom: 80
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
  buttonDisabled: {
    backgroundColor: '#B0C4DE',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
