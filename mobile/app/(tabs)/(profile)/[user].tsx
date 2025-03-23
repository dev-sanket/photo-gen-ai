import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Button } from 'react-native-paper'
import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

const ProfileScreen = () => {
  const { signOut, getToken } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken()
        console.log('Token:', token)
        if (!token) {
          router.replace('/(auth)/sign-in')
        }
      } catch (error) {
        console.error('Check auth error:', error)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut()
      console.log('User logged out successfully')
      router.replace('/(auth)/sign-in')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ProfileScreen</Text>
      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </View>
  )
}

export default ProfileScreen
