import React, { useCallback, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'
import CustomButton from '@/components/ui/Button'
import { IconSymbol } from '@/components/ui/IconSymbol'
import IconButton from '@/components/IconButton'

const VerifyEmailScreen = () => {
  const { signUp, setActive, isLoaded } = useSignUp()
  const theme = useAppTheme()
  const router = useRouter()
  const routerParams = useLocalSearchParams()

  const styles = getStyles(theme)
  console.log('router parama ---->', routerParams)

  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)

  const onVerifyPress = async () => {
    try {
      if (!isLoaded) return

      setLoading(true)
      console.log('OTP--->', verificationCode)
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode
      })
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      }
    } catch (err) {
      //   console.error(JSON.stringify(err, null, 2))
      setLoading(false)
      const error = err as any
      Alert.alert('Error in Signin', error.errors[0].longMessage, [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ])
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* <View
          style={{
            marginTop: theme.spacing.xxl,
            alignItems: 'center',
            marginBottom: theme.spacing.xxl
          }}
        >
          <Image
            source={require('../../assets/images/icon.png')} // Change to your logo path
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            resizeMode="contain"
          />
        </View> */}
        <View
          style={{ alignItems: 'flex-start', marginTop: theme.spacing.xxl }}
        >
          <ThemedText type="subtitle" style={{ textAlign: 'center' }}>
            Please check your Email
          </ThemedText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: theme.spacing.xs
            }}
          >
            <ThemedText
              type="default"
              style={{
                color: '#4b5563',
                marginTop: theme.spacing.sm,
                fontSize: theme.fonts.bodyMedium.fontSize,
                fontWeight: theme.fonts.bodyMedium.fontWeight
              }}
            >
              We have send code to
            </ThemedText>
            <ThemedText
              type="default"
              style={{
                fontWeight: theme.fonts.labelMedium.fontWeight,
                color: theme.colors.text,
                marginLeft: theme.spacing.xs,
                marginTop: theme.spacing.xs + 2
              }}
            >
              {routerParams.email}
            </ThemedText>
            <IconButton
              icon="pencil.and.ellipsis.rectangle"
              size={25}
              color={theme.colors.errorContainer}
              style={{
                marginLeft: theme.spacing.xs,
                width: 25,
                height: 25,
                borderWidth: 0,
                borderColor: theme.colors.background,
                backgroundColor: 'transparent'
              }}
              onPress={() => router.back()}
            />
          </View>
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
            onFilled={(text) => {
              console.log('OTP ----> ', text)
              setVerificationCode(text)
            }}
          />
        </View>
      </ScrollView>

      <View
        style={{
          width: '100%',
          bottom: -theme.spacing.xl
        }}
      >
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
      padding: theme.spacing.lg
    },
    headerText: {
      fontSize: theme.fonts.titleLarge.fontSize,
      fontWeight: theme.fonts.labelLarge.fontWeight
    }
  })
