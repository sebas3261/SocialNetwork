import React from 'react'
import {Tabs} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';

export default function _layout() {
  return (
    <Tabs
        screenOptions={{
            headerShown: false
        }}
    >
        <Tabs.Screen
            name='home'
            options={{
                title:'home',
                tabBarIcon: ({ color }) => (<Octicons name="home" size={24} color="black" />)
            }}
        />
        <Tabs.Screen
            name='search'
            options={{
                title:'search',
                tabBarIcon: ({ color }) => (<Entypo name="magnifying-glass" size={24} color="black" />)
            }}
        />
        <Tabs.Screen
            name='newPost'
            options={{
                title:'new post',
                tabBarIcon: ({ color }) => (<AntDesign name="pluscircleo" size={24} color="black" />)
            }}
        />
         <Tabs.Screen
            name='reels'
            options={{
                title:'reels',
                tabBarIcon: ({ color }) => (<Feather name="video" size={24} color="black" />)
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title:'profile',
                tabBarIcon: ({ color }) => (<Feather name="user" size={24} color="black" />)
            }}
        />
    </Tabs>

  )
}