import { View, Text, TouchableWithoutFeedback, Keyboard, TextInput, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useContext } from 'react'
import { Link, router } from 'expo-router'
import { AuthContext } from '@/context/authContext/AuthContext'

export default function signup() {

  const {signUp} = useContext(AuthContext)  
  const [email, onChangeUser] = React.useState("")
  const [password, onChangePasword] = React.useState("")
  const [repassword, onChangerePasword] = React.useState("")

  const verify= async()=>{
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = regexEmail.test(email);
    
    // Validar contraseña con expresión regular
    const regexContrasenaSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const contrasenaSegura = regexContrasenaSegura.test(password);
    
    // Si el correo o la contraseña no son válidos, mostrar alerta
    if (!contrasenaSegura || !emailValido) {
      Alert.alert("Error", "Email or password are not valid");
      return;
    }
  
    try {
      // Intentar registrar al usuario
      await signUp(email, password);
      // Redirigir a la página de registro de datos de usuario
      router.push("/signup/userdata");
    } catch (error) {
      // Manejar errores al intentar registrar
      Alert.alert("Error", "Something went wrong signing up");
    }

  };
  
  
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
          placeholder='email'
          placeholderTextColor="gray" 
          onChangeText={onChangeUser}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder='pasword'
          placeholderTextColor="gray" 
          onChangeText={onChangePasword}
          value={password}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder='repeat pasword'
          placeholderTextColor="gray" 
          onChangeText={onChangerePasword}
          value={repassword}
          secureTextEntry
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={verify}
          disabled = {password !== repassword || !password || !repassword}
          >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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