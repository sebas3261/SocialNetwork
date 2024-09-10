import React from 'react'
import {Tabs} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

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
                tabBarIcon: ({ color }) => (<Entypo name="home" size={24} color="black" />)
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
                tabBarIcon: ({ color }) => (<Entypo name="video" size={24} color="black" />)
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title:'profile',
                tabBarIcon: ({ color }) => (<AntDesign name="user" size={24} color="black" />)
            }}
        />
    </Tabs>

  )
}