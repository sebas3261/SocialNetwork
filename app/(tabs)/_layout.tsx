import React from 'react'
import {Tabs} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';

export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen
            name='home'
            options={{
                title:'home'
            }}
        />
        <Tabs.Screen
            name='search'
            options={{
                title:'search'
            }}
        />
        <Tabs.Screen
            name='newPost'
            options={{
                title:'new post'
            }}
        />
         <Tabs.Screen
            name='reels'
            options={{
                title:'reels',
                tabBarIcon: ({ color }) => (
                    <Entypo name="video" size={24} color="black" />
                )
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title:'profile'
            }}
        />
    </Tabs>

  )
}