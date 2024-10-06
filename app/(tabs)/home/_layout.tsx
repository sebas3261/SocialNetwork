import { Link, Stack } from "expo-router";
import { useColorScheme, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/dataContext/dataContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<boolean>(false);
  

  useEffect(() => {
    setTheme(colorScheme === "dark");
  }, [colorScheme]);

  const iconColor = theme ? "white" : "black";
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerStyle: { backgroundColor: theme ? "#151718" : "white" },
          headerLeft: () => (
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                color: iconColor,
              }}
            >
              Instagram
            </Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Link
                href="/(tabs)/home/notifications"
                style={{ paddingRight: 10 }}
                asChild
              >
                <AntDesign name="hearto" size={24} color={iconColor} />
              </Link>
              <Link
                href="/(tabs)/home/messages"
                style={{ paddingRight: 10 }}
                asChild
              >
                <AntDesign name="message1" size={24} color={iconColor} />
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          title: "",
          headerStyle: { backgroundColor: theme ? "#151718" : "white" },
          headerLeft: () => (
            <Text style={{ color: iconColor, marginLeft: "45%" }}>
              messages
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "",
          headerStyle: { backgroundColor: theme ? "#151718" : "white" },
          headerLeft: () => (
            <Text style={{ color: iconColor, marginLeft: "44%" }}>
              notifications
            </Text>
          ),
        }}
      />
    </Stack>
  );
}
