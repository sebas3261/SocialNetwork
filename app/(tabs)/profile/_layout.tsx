import { Link, Stack } from "expo-router";
import { Text, useColorScheme, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/dataContext/dataContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<boolean>(false);
  const { stateUser: { user } } = useContext(DataContext);

  useEffect(() => {
    setTheme(colorScheme === "dark");
  }, [colorScheme]);

  // Verificamos si `user` está definido antes de acceder a `user.username`
  const name = user?.username ? user.username.toString() : "User";

  const iconColor = theme ? 'white' : 'black';

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: '',
          headerStyle: { backgroundColor: theme ? '#151718' : 'white' },
          headerLeft: () => (
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginLeft: 15,
                color: iconColor
              }}
            >
              {name} {/* Aquí se muestra el nombre del usuario o "User" */}
            </Text>
          ),
          headerRight: () => (
            <View style={{ 
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Link href="/(tabs)/newPost" style={{ paddingRight: 10 }} asChild>
                <AntDesign name="pluscircleo" size={24} color={iconColor} />
              </Link>
              <Link href="/profile/settings" style={{ paddingRight: 10 }} asChild>
                <Entypo name="menu" size={30} color={iconColor} />
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen 
        name="settings"
        options={{
          title: "",
          headerStyle: { backgroundColor: theme ? '#151718' : 'white' },
          headerLeft: () => (
            <Text
              style={{ color: iconColor, fontSize: 30, fontWeight: 'bold', marginLeft: '37%' }}
            >
              Settings
            </Text>
          )
        }}
      />
      <Stack.Screen
        name = "edit"
        options ={{
          title:"Edit profile"
        }}
      />
    </Stack>
  );
}
