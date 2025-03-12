import { useSSO, useUser } from '@clerk/clerk-expo'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import * as Linking from 'expo-linking'
import React, { useCallback, useState } from 'react'

const SocialLoginButton = ({
  strategy
}: {
  strategy: 'facebook' | 'google' | 'apple'
}) => {
  const getStrategy = () => {
    if (strategy === 'facebook') {
      return 'oauth_facebook'
    } else if (strategy === 'google') {
      return 'oauth_google'
    } else if (strategy === 'apple') {
      return 'oauth_apple'
    }
    return 'oauth_facebook'
  }

  //   const { startOAuthFlow } = useOAuth({ strategy: getStrategy() })
  const { startSSOFlow } = useSSO()

  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const buttonText = () => {
    if (isLoading) {
      return 'Loading...'
    }

    if (strategy === 'facebook') {
      return 'Continue with Facebook'
    } else if (strategy === 'google') {
      return 'Continue with Google'
    } else if (strategy === 'apple') {
      return 'Continue with Apple'
    }
  }

  const buttonIcon = () => {
    if (strategy === 'facebook') {
      return <Ionicons name="logo-facebook" size={26} color="#1977F3" />
    } else if (strategy === 'google') {
      return <Ionicons name="logo-google" size={26} color="#DB4437" />
    } else if (strategy === 'apple') {
      return <Ionicons name="logo-apple" size={26} color="black" />
    }
  }

  const onSocialLoginPress = useCallback(async () => {
    try {
      setIsLoading(true)
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: getStrategy(),
        redirectUrl: Linking.createURL('/(tabs)')
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        console.log('Session created', createdSessionId)
        setActive!({ session: createdSessionId })
        await user?.reload()
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={onSocialLoginPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        buttonIcon()
      )}
      {/* <Text style={styles.buttonText}>{buttonText()}</Text> */}
      <View />
    </TouchableOpacity>
  )
}

export default SocialLoginButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 0.3,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    // Android Shadow
    elevation: 5,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'medium'
  }
})
