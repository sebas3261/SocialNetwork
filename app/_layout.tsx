import { Stack } from "expo-router";
import "../utils/firebaseConfig"
import { AuthProvider } from "@/context/authContext/authContext";

export default function RootLayout() {
    return (
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="index" options={{title : 'Inicio'}}/>
          <Stack.Screen name="signin" options={{title : 'Sign In'}}/>
        </Stack>
      </AuthProvider>
    );
  }