import React, { useCallback, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { View, Text, StyleSheet, Image } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import { useSignUp } from '@clerk/clerk-expo'

const VerifyEmailScreen = () => {
  const { signUp, setActive, isLoaded } = useSignUp()
  const theme = useAppTheme()
  const router = useRouter()
  const routerParams = useLocalSearchParams()

  const styles = getStyles(theme)
  console.log('router parama ---->', routerParams)

  const [verificationCode, setVerificationCode] = useState('')

  const onVerifyPress = useCallback(async () => {
    // if (!isLoaded) return
    if (signUp) {
      console.log('Pressed --->')
      await signUp.attemptEmailAddressVerification({
        code: verificationCode
      })
      router.replace('/')
    }
  }, [])

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: theme.spacing.xxl * 3,
          alignItems: 'center',
          marginBottom: theme.spacing.xxl
        }}
      >
        <Image
          source={require('../../assets/images/icon.png')} // Change to your logo path
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          resizeMode="contain"
        />
      </View>
      <View style={{}}>
        <ThemedText type="subtitle" style={{ textAlign: 'center' }}>
          Please check your Email
        </ThemedText>
        <ThemedText type="default">
          We have send code to {routerParams.email}
        </ThemedText>
      </View>
      <View style={{ marginTop: theme.spacing.xl }}>
        <OtpInput
          numberOfDigits={6}
          placeholder="******"
          type="numeric"
          autoFocus={false}
          blurOnFilled={true}
          disabled={false}
          textInputProps={{
            accessibilityLabel: 'One-Time Password'
          }}
          theme={{}}
          onTextChange={(text) => setVerificationCode(text)}
        />
      </View>

      <View style={{ width: '100%', marginTop: theme.spacing.xl }}>
        <Button
          mode="contained"
          rippleColor="#f7f7f9"
          style={{
            width: '100%',
            backgroundColor: theme.colors.primary,
            borderRadius: 5
          }}
          labelStyle={{
            fontSize: theme.fonts.titleMedium.fontSize,
            fontWeight: theme.fonts.titleMedium.fontWeight
          }}
          loading={false}
          disabled={false}
          onPress={onVerifyPress}
        >
          Verify
        </Button>
      </View>
    </View>
  )
}
export default VerifyEmailScreen

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.md
    },
    headerText: {
      fontSize: theme.fonts.titleLarge.fontSize,
      fontWeight: theme.fonts.labelLarge.fontWeight
    }
  })
