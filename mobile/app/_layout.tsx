import React, { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Redirect, Slot, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@/cache'
import { PaperProvider } from 'react-native-paper'
import { darkTheme, lightTheme } from '@/theme/theme'
import { Appearance } from 'react-native'
import { GlobalProvider } from '@/context/GlobalContext'
import { useApi } from '@/hooks/useApi'
import { useDbUser } from '@/hooks/useUser'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
      Appearance.setColorScheme('light') // Force light mode
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  console.log('colorScheme ---->', colorScheme)
  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
    )
  }
  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack initialRouteName='index'>
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="+not-found" />
    //     <Stack.Screen name="index" options={{headerShown: false}}/>
    //   </Stack>
    //   <StatusBar style="auto" />
    // </ThemeProvider>
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <GlobalProvider>
          <StatusBar style="auto" />
          <ClerkLoaded>
            <Slot />
          </ClerkLoaded>
        </GlobalProvider>
      </PaperProvider>
    </ClerkProvider>
  )
}
