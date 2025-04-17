import React, { useEffect } from 'react'
import { Redirect, Stack, router } from 'expo-router'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useDbUser } from '@/hooks/useUser'
import { ThemedText } from '@/components/ThemedText'
import IconButton from '@/components/IconButton'
import { useAppTheme } from '@/theme/theme'
import { Image, TouchableOpacity, View } from 'react-native'
import { Avatar, Chip } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

const DashboardRootLayout = () => {
  const { isSignedIn } = useAuth()
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }

  const { fetchUserData } = useDbUser()
  const theme = useAppTheme()
  const { user } = useUser()
  const { user: dbUser } = useDbUser()
  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchUserData()
  //   }, 700)
  // }, [])

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index"
        options={{
          headerShown: true,
          title: 'PhotoGen.AI',
          headerTitleAlign: 'left',
          headerBackVisible: false,
          headerRight: (props) => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
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

                <TouchableOpacity
                  style={{ width: 38, height: 38 }}
                  onPress={() => router.push(`/(tabs)/(profile)/${user?.id}`)}
                >
                  <Avatar.Image source={{ uri: user?.imageUrl }} size={38} />
                </TouchableOpacity>
              </View>
            )
          }
        }} />
      <Stack.Screen
        name="all-images"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          animation: 'fade',
          presentation: 'fullScreenModal',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="coins"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

export default DashboardRootLayout
