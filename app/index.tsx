import { Link } from "expo-router";
import { Button, Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/signin"} asChild>
        <Button title="sign in"/>
      </Link>
      <Link href={"/signup"} asChild>
        <Button title="sign up"/>
      </Link>
    </View>
  );
}
