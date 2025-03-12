import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import IconButton from '@/components/IconButton'
import { ThemedText } from '@/components/ThemedText'
import { useAppTheme } from '@/theme/theme'

const GenerateRootLayout = () => {
  const { isSignedIn } = useAuth()
  const theme = useAppTheme()

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
              <IconButton
                icon="plus"
                iconPosition="left"
                size={16}
                color={theme.colors.warning}
                style={{
                  justifyContent: 'center',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  alignItems: 'center',
                  //   borderWidth: 1,
                  //   borderColor: theme.colors.inversePrimary,
                  flexDirection: 'row',
                  borderRadius: 25,
                  backgroundColor: theme.colors.inverseOnSurface
                }}
                onPress={() => console.log('Pressed')}
              >
                <ThemedText
                  type="default"
                  style={{
                    color: theme.colors.backdrop,
                    fontSize: theme.fonts.titleSmall.fontSize
                  }}
                >
                  $500
                </ThemedText>
              </IconButton>
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
