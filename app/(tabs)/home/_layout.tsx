import { Link, Stack } from "expo-router";
import { View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerLeft: () => (
            <Text
              style ={{
                fontSize: 35,
                fontWeight: "bold"
              }}
            >Instagram</Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row"}}>
              <Link href="/(tabs)/home/notifications" style={{paddingRight: 10}} asChild>
                <AntDesign name="hearto" size={24} color="black" />
              </Link>
              <Link href="/(tabs)/home/messages" style={{paddingRight: 10}} asChild>
                <AntDesign name="message1" size={24} color="black" />
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen name="messages" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
