import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

const DashboardRootLayout = () => {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[user]" options={{ headerShown: false }} />
    </Stack>
  )
}

export default DashboardRootLayout
