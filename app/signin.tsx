import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function signin() {
  const [user, onChangeUser] = React.useState("")
  const [password, onChangePasword] = React.useState("")
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
          style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
          }}
      >
        <Text
          style={{
            fontSize: 50,
            marginBottom: 80
          }}
        >Instagram</Text>
        <TextInput
          style={styles.input}
          placeholder='user:'
          placeholderTextColor="gray" 
          onChangeText={onChangeUser}
          value={user}
        />
        <TextInput
          style={styles.input}
          placeholder='pasword:'
          placeholderTextColor="gray" 
          onChangeText={onChangePasword}
          value={password}
        />
        <Link href={"/(tabs)/home"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </Link>
        <Text>-or-</Text>
        <Link href={"/signup"} asChild>
          <Button
            title='Create an acount'
          />
        </Link>
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
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

