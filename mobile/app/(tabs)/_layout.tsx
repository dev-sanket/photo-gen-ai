import { Tabs, useNavigation, usePathname, useRouter } from 'expo-router'
import React from 'react'
import { Platform, View } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useAppTheme } from '@/theme/theme'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const theme = useAppTheme()
  const isDarkMode = colorScheme === 'dark'

  return (
    <Tabs
      initialRouteName="(dashboard)"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: () => <View style={{ backgroundColor: 'red', height: 100   }} />,
        tabBarStyle: {
          display: usePathname() === '/update-profile' ? 'none' : 'flex',
          position: Platform.select({
            ios: 'absolute'
          })
        }
        // tabBarStyle: Platform.select({
        //   ios: {
        //     // Use a transparent background on iOS to show the blur effect
        //     position: 'absolute'
        //   },
        //   default: {}
        // })
      }}
    >
      <Tabs.Screen
        name="(dashboard)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'house.fill' : 'house'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="(generate)"
        options={{
          title: 'Generate',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'wand.and.stars.inverse' : 'wand.and.stars'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="(pack)"
        options={{
          title: 'Packs',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'square.stack.fill' : 'square.stack'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'User',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'person.circle.fill' : 'person.circle'}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}
