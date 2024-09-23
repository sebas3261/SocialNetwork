import React, { useEffect, useState } from 'react'
import {Tabs} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { useColorScheme } from 'react-native';

export default function _layout() {
    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState<boolean>(false);

    useEffect(() => {
        setTheme(colorScheme === "dark");
      }, [colorScheme]);

    const iconColor = theme ? 'white' : 'black';
    return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: theme? '#151718' : 'white'
            }
        }}
    >
        <Tabs.Screen
            name='home'
            options={{
                title:'home',
                tabBarIcon: ({ color }) => (<Octicons name="home" size={24} color={iconColor} />)
            }}
        />
        <Tabs.Screen
            name='search'
            options={{
                title:'search',
                tabBarIcon: ({ color }) => (<Entypo name="magnifying-glass" size={24} color={iconColor}  />)
            }}
        />
        <Tabs.Screen
            name='newPost'
            options={{
                title:'new post',
                tabBarIcon: ({ color }) => (<AntDesign name="pluscircleo" size={24} color={iconColor}  />)
            }}
        />
         <Tabs.Screen
            name='reels'
            options={{
                title:'reels',
                tabBarIcon: ({ color }) => (<Feather name="video" size={24} color={iconColor}  />)
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title:'profile',
                tabBarIcon: ({ color }) => (<Feather name="user" size={24} color={iconColor}  />)
            }}
        />
    </Tabs>

  )
}