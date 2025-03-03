import React, { useCallback, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import { useSignUp } from '@clerk/clerk-expo'
import CustomButton from '@/components/ui/Button'

const VerifyEmailScreen = () => {
  const { signUp, setActive, isLoaded } = useSignUp()
  const theme = useAppTheme()
  const router = useRouter()
  const routerParams = useLocalSearchParams()

  const styles = getStyles(theme)
  console.log('router parama ---->', routerParams)

  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)

  const onVerifyPress = useCallback(async () => {
    try {
      if (!isLoaded) return

      setLoading(true)

      const verifiedUser = await signUp.attemptEmailAddressVerification({
        code: verificationCode
      })
      await setActive({ session: verifiedUser.createdSessionId })
      router.replace('/')
    } catch (err) {
      //   console.error(JSON.stringify(err, null, 2))
      setLoading(false)
      const error = err as any
      Alert.alert('Error in Signin', error.errors[0].longMessage, [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ])
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
          onFilled={(text) => setVerificationCode(text)}
        />
      </View>

      <View style={{ width: '100%', marginTop: theme.spacing.xl }}>
        {/* <Button
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
        </Button> */}

        <CustomButton
          text="Verify Code"
          loading={loading}
          disable={loading}
          onPress={onVerifyPress}
        />
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
