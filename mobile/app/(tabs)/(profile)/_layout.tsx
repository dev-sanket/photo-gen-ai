import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function Layout() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }
  return (
    <Stack initialRouteName="[user]">
      <Stack.Screen name="[user]" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="privacy" options={{ headerShown: true }} />
      <Stack.Screen name="support" options={{ headerShown: true }} />
      <Stack.Screen name="faqs" options={{ headerShown: true }} />
      <Stack.Screen
        name="update-profile"
        options={{
          animation: 'fade',
          presentation: 'fullScreenModal',
          headerShown: false
        }}
      />
    </Stack>
  )
}
