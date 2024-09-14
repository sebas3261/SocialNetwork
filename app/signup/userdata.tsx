import { View, Text, TouchableWithoutFeedback, Keyboard, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useContext } from 'react'
import { Link } from 'expo-router'
import { AuthContext } from '@/context/authContext/AuthContext'

export default function userdata() {
  const [name, onChangeName] = React.useState("")
  const [lastname, onChangeLastname] = React.useState("")
  const [number, onChangereNumber] = React.useState("")
  const [age, onChangeAge] = React.useState('');
  const [user, onChangeUser] = React.useState('');
  const {update} = useContext(AuthContext) 
  
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
        >Let us Know you...</Text>
        <TextInput
          style={styles.input}
          placeholder='Name'
          placeholderTextColor="gray" 
          onChangeText={onChangeName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder='last name'
          placeholderTextColor="gray" 
          onChangeText={onChangeLastname}
          value={lastname}
        />
         <TextInput
          style={styles.input}
          placeholder='user'
          placeholderTextColor="gray" 
          onChangeText={onChangeUser}
          value={user}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeAge}
          value={age}
          placeholder="age"
          placeholderTextColor="gray"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
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
              username: user
            })}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
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