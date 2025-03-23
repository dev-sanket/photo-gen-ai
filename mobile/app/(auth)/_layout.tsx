import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href="/(tabs)/(dashboard)/" />
  }

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false, title: 'Sign Up' }}
      />
      <Stack.Screen
        name="verify-email"
        options={{ headerShown: true, title: 'Verify Email' }}
      />
    </Stack>
  )
}
