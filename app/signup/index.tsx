import { View, Text, TouchableWithoutFeedback, Keyboard, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function signup() {
  const [user, onChangeUser] = React.useState("")
  const [password, onChangePasword] = React.useState("")
  const [repassword, onChangerePasword] = React.useState("")
  
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
          fontSize: 45,
          marginBottom: 50
        }}
        >Create an acount</Text>
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
        <TextInput
          style={styles.input}
          placeholder='repeat pasword:'
          placeholderTextColor="gray" 
          onChangeText={onChangerePasword}
          value={repassword}
        />
        <Link href={"/signup/userdata"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/signin"} asChild>
          <Button title="Already have an acount?"/>
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