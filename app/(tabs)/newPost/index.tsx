import { View, Text, TouchableOpacity, ScrollView, useColorScheme, Modal } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useContext, useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalCamera from '@/components/modalCamera';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { DataContext } from '@/context/dataContext/dataContext';

export default function NewPost() {

    const { newPost } = useContext(DataContext);
    const [isVisible, setIsVisble] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(undefined as any);
    const [locationText, setLocationText] = useState("")
    const [description, setDescription] = useState("");

    const [location, setLocation] = useState(null as Location.LocationObject | null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isSaving, setIsSaving] = useState(false);

  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<boolean>(false);

  useEffect(() => {
    setTheme(colorScheme === "dark");
  }, [colorScheme]);

  const iconColor = theme ? "white" : "black";

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log("Mi ubicacion: ", {
                location
            })
            setLocation(location);
        })();
    }, []);

    const getAddress = async () => {

        if (location == null) return;

        try {
            console.log(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.coords?.latitude}&lon=${location.coords?.longitude}`);
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.coords?.latitude}&lon=${location.coords?.longitude}`)

            const data = await response.json();
            console.log({
                data
            })
            setLocationText(data.display_name)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSavePost = async () => {
        setIsSaving(true);
      try{
        await newPost({
          address: locationText,
          description,
          image: currentPhoto.uri,
          date: new Date(),
          user : ""
      })
      setDescription("");
      setCurrentPhoto(null);
      setLocationText("");
      setIsSaving(false);
      }catch(error){
        console.log(error);
      }
        
    }

    const dynamicStyle = {
      background: {
        backgroundColor: theme ? '#151718' : 'white',
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      title: {
        fontSize: 50,
        marginBottom: 20,
        color: theme? 'white' : 'black'
      },
      or: {
        color: theme? 'white' : 'black',
      },
      input: {
        backgroundColor: theme ? '#151718' : 'white',
        minHeight: 100,
        borderColor: theme? 'white' : 'black',
        color: theme? 'white' : 'black',
      },
    };

    return (
        <ScrollView
            style={dynamicStyle.background}
            contentContainerStyle={{
                gap: 25
            }}

        >
            <TouchableOpacity
                onPress={() => setIsVisble(true)}
            >
                <Modal
                    transparent={false}
                    visible={isSaving}
                    animationType="fade"
                    onRequestClose={() => setIsSaving(false)}
                    
                >
                    <View style={{backgroundColor: theme? "#151718": "white" ,width:"100%", height:"100%",display: "flex", justifyContent:"center", alignItems:"center"}}>
                        <Text style={{color:iconColor,fontSize: 40, fontWeight:"bold"}}>Posting...</Text>
                    </View>
                </Modal>
                <View
                    style={{
                        backgroundColor: 'grey',
                        paddingHorizontal: 20,
                        aspectRatio: 1 / 0.8,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {
                        currentPhoto && currentPhoto.uri ?
                            <Image
                                style={{
                                    width: '100%',
                                    height: "100%"
                                }}
                                source={{ uri: currentPhoto.uri }}
                                contentFit="cover"
                                transition={1000}
                            /> :
                            <>
                                <FontAwesome5 name="plus" size={80} color="white" />
                                <Text
                                    style={{
                                        fontWeight: '800',
                                        fontSize: 18,
                                        color: 'white'
                                    }}
                                >Seleccionar foto</Text>
                            </>
                    }
                </View>
            </TouchableOpacity>
            <TextInput
                mode="outlined"
                multiline
                numberOfLines={4}
                label='Descripcion'
                placeholder='Escribe la descripcion del post...'
                value={description}
                onChangeText={setDescription}
                style={dynamicStyle.input}
            />
            <TouchableOpacity
                onPress={getAddress}
            >
                <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 10
                        }}
                    >
                        <MaterialIcons name="location-on" size={24} color="black" />
                        <Text style={dynamicStyle.or}>Agregar Ubicación</Text>
                    </View>
                    <View>
                        <MaterialIcons name="chevron-right" size={24} color={iconColor} />
                    </View>
                </View>
                <Text style={dynamicStyle.or}>
                    {locationText}
                </Text>
                </View>
            </TouchableOpacity>
            <ModalCamera
                isVisible={isVisible}
                onSave={(photo) => {
                    setCurrentPhoto(photo);
                }}
                onClose={() => { setIsVisble(false) }}
            />
            <Button
                    onPress={handleSavePost}
                >
                    <Text>Guardar post</Text>
            </Button>

        </ScrollView >
    )
}