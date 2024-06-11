import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather, AntDesign } from "@expo/vector-icons"

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="homeScreen"
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name='home' size={size} color={color} />
            )

          }}
        />
        <Tabs.Screen
          name="searchScreen"
          options={{
            headerShown: false,
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <Feather name='search' size={size} color={color} />
            )

          }}
        />
        <Tabs.Screen
          name="favoriteScreen"
          options={{
            headerShown: false,
            tabBarLabel: "Favorite",
            tabBarIcon: ({ color, size }) => (
              <Feather name='heart' size={size} color={color} />
            )

          }}
        />
        <Tabs.Screen
          name="profileScreen"
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name='user' size={size} color={color} />
            )

          }}
        />
      </Tabs>
    </>

  );
}
