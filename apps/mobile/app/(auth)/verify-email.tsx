import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { View, Text, StyleSheet, Image } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'

const VerifyEmailScreen = () => {
  const theme = useAppTheme()
  const styles = getStyles(theme)
  const [verificationCode, setVerificationCode] = useState('')

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: -theme.spacing.xxl * 5,
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
          We have send code to {'test@gmail.com'}
        </ThemedText>
      </View>
      <View style={{ marginTop: theme.spacing.xl }}>
        <OtpInput
          numberOfDigits={4}
          placeholder="******"
          type="numeric"
          autoFocus={false}
          blurOnFilled={true}
          disabled={false}
          textInputProps={{
            accessibilityLabel: 'One-Time Password'
          }}
          theme={{
            containerStyle: {
              borderWidth: 1,
              borderColor: '#000'
            }
          }}
          onTextChange={(text) => setVerificationCode(text)}
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
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.md
    },
    headerText: {
      fontSize: theme.fonts.titleLarge.fontSize,
      fontWeight: theme.fonts.labelLarge.fontWeight
    }
  })
