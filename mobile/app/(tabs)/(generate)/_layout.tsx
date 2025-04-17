import React from 'react'
import { Redirect, router, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import IconButton from '@/components/IconButton'
import { ThemedText } from '@/components/ThemedText'
import { useAppTheme } from '@/theme/theme'
import { Chip } from 'react-native-paper'
import { Image } from 'react-native'
import { useDbUser } from '@/hooks/useUser'
const GenerateRootLayout = () => {
  const { isSignedIn } = useAuth()
  const theme = useAppTheme()
  const { user: dbUser } = useDbUser()
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Generate Photos',
          headerTitleAlign: 'left',
          headerBackVisible: false,
          headerRight: (props) => {
            return (
              <Chip
                mode="flat"
                icon={() =>
                  <Image
                    source={require('@/assets/images/coin.png')}
                    style={{ width: 24, height: 24 }}
                  />
                }
                style={{
                  backgroundColor: theme.colors.inverseOnSurface,
                  paddingHorizontal: theme.spacing.xs * 1.5,
                  paddingVertical: theme.spacing.xs * 0.5,
                  borderRadius: theme.roundness * 222,
                  marginRight: theme.spacing.md,
                }}
                onPress={() => router.push('/coins')}
              >
                {dbUser?.coins}
              </Chip>

            )
          }
        }}
      />
      <Stack.Screen
        name="preview-image"
        options={{
          headerShown: false,
          title: 'Preview',
          headerTitleAlign: 'left',
          headerBackVisible: true
        }}
      />
    </Stack>
  )
}

export default GenerateRootLayout
