import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Text } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<boolean>(false);

  useEffect(() => {
    setTheme(colorScheme === "dark");
  }, [colorScheme]);

  const iconColor = theme ? "white" : "black";

  return (
    <Stack>
      <Stack.Screen name="index" 
        options={{
          title: "",
          headerStyle: { backgroundColor: theme ? "#151718" : "white" },
          headerLeft: () => (
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: iconColor,
                marginLeft: '37%'
              }}
            >
              New post
            </Text>
          )}}
      />
    </Stack>
  );
}
