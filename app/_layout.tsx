import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" options={{title : 'Inicio'}}/>
      <Stack.Screen name="signin" options={{title : 'Sign In'}}/>
      <Stack.Screen name="signup" options={{title : 'Sign Up'}}/>
      <Stack.Screen name="(tabs)"/>
    </Stack>
  );
}
