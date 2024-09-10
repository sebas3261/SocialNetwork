import { Link, Stack } from "expo-router";
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title : '',
          headerLeft: () => (
            <Text
              style ={{
                fontSize: 30,
                fontWeight: "bold",
                marginLeft: 15
              }}
            >User</Text>
          ),
          headerRight: () => (
            <View style={{ 
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
              }}>
              <Link href="/(tabs)/newPost" style={{paddingRight: 10}} asChild>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </Link>
              <Link href="/profile/settings" style={{paddingRight: 10}} asChild>
                <Entypo name="menu" size={30} color="black" />
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen name="settings"/>
    </Stack>
  );
}
