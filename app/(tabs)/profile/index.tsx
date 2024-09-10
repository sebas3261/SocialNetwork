import { View, Text , Image, StyleSheet} from 'react-native'
import React from 'react'

export default function profile() {
  let profile = "@/assets/images/whiteprofile.png"

  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.image} source={require(profile)}/>
        <View style={styles.data}>
          <Text style={styles.dataText}>50</Text>
          <Text >posts</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.dataText}>100</Text>
          <Text >followers</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.dataText}>20</Text>
          <Text >folowing</Text>
        </View>
      </View>
      <Text style={styles.name}>Name</Text>
      <Text style={{marginLeft: 20}}>Biography...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  data: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30
  },
  dataText: {
    fontWeight: "700"
  },
  name:{
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: -10
  }
});