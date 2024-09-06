import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function signin() {
  return (
    <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
    >
      <Text>signin</Text>
      <Link href={"/(tabs)/home"} asChild>
        <Button title="Sign in"/>
      </Link>
    </View>
  )
}