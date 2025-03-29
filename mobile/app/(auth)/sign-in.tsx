import React, { useCallback, useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import * as Yup from 'yup'
import { Formik } from 'formik'
import FormInput from '@/components/FormInput'
import SocialLoginButton from '@/components/SocialLoginButton'
import { AppTheme, useAppTheme } from '@/theme/theme'
import CustomButton from '@/components/ui/Button'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const theme = useAppTheme()

  const styles = getStyles(theme)

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Too short!').required('Password is required')
  })

  // Handle the submission of the sign-in form
  const onSignInPress = useCallback(
    async (values: { email: string; password: string }) => {
      if (!isLoaded) return
      setLoading(true)
      // Start the sign-in process using the email and password provided
      try {
        const signInAttempt = await signIn.create({
          identifier: values.email,
          password: values.password
        })
        // If sign-in process is complete, set the created session as active
        // and redirect the user
        if (signInAttempt.status === 'complete') {
          await setActive({ session: signInAttempt.createdSessionId })
          router.replace('/')
        } else {
          // If the status isn't complete, check why. User might need to
          // complete further steps.
          setLoading(false)
          console.error(JSON.stringify(signInAttempt, null, 2))
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        // console.error(JSON.stringify(err, null, 2))
        const error = err as any
        setLoading(false)
        Alert.alert('Error in Signin', error.errors[0].longMessage, [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ])
      }
    },
    [isLoaded, signIn, setActive, router]
  )

  return (
    <View style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: theme.spacing.xxxl, alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/icon.png')} // Change to your logo path
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            resizeMode="contain"
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: theme.spacing.lg }}>
          <ThemedText
            type="title"
            style={{
              fontSize: theme.fonts.titleLarge.fontSize,
              fontWeight: theme.fonts.labelLarge.fontWeight,
              color: theme.colors.text
            }}
          >
            Welcome to PhotoGen.AI
          </ThemedText>
          <ThemedText
            type="default"
            style={{
              color: theme.colors.text,
              fontSize: theme.fonts.bodyLarge.fontSize,
              marginTop: theme.spacing.sm
            }}
          >
            Sign in to start creating amazing photos
          </ThemedText>
        </View>

        <View style={styles.socialButtonsContainer}>
          <SocialLoginButton strategy="facebook" />
          <SocialLoginButton strategy="google" />
          <SocialLoginButton strategy="apple" />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: theme.spacing.md,
            padding: theme.spacing.md,
            alignSelf: 'center'
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: '#e5e7eb' }} />
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: theme.colors.text,
                margin: 5
              }}
            >
              Or continue with
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#e5e7eb' }} />
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values) => await onSignInPress(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
          }) => (
            <View style={styles.formContainer}>
              <FormInput
                label="Email Address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Enter your email"
                error={touched.email ? errors.email : undefined}
              />
              <FormInput
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Enter your password"
                secureTextEntry
                error={touched.password ? errors.password : undefined}
              />
              {/* <TouchableOpacity
                style={[
                  styles.button,
                  !values.email ||
                  !values.password ||
                  errors.email?.length ||
                  errors.password?.length
                    ? styles.disabled
                    : {}
                ]}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Signin</Text>
              </TouchableOpacity> */}

              <CustomButton
                text="Signin"
                loading={loading}
                disable={
                  loading ||
                  !values.email ||
                  !values.password ||
                  (errors.email?.length ?? 0) > 0 ||
                  (errors.password?.length ?? 0) > 0
                }
                onPress={handleSubmit}
                style={[
                  { marginTop: theme.spacing.md },
                  loading ||
                  !values.email ||
                  !values.password ||
                  errors.email?.length ||
                  errors.password?.length
                    ? styles.disabled
                    : {}
                ]}
              />
            </View>
          )}
        </Formik>

        <View
          style={{
            alignItems: 'center',
            marginTop: theme.spacing.lg,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text>Don't have an account?</Text>
          <Link href="../sign-up" style={{ marginLeft: 5, color: '#6366f1' }}>
            <Text>Sign up</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  )
}
const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    formContainer: {
      padding: theme.spacing.md
    },
    button: {
      backgroundColor: '#007BFF',
      padding: 12,
      borderRadius: 5,
      alignItems: 'center'
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    disabled: { backgroundColor: '#aaa', marginTop: 10 },
    socialButtonsContainer: {
      flexDirection: 'row', // Horizontal layout
      justifyContent: 'space-between', // Space between elements
      alignItems: 'center', // Align vertically
      padding: theme.spacing.md,
      marginTop: theme.spacing.lg
    }
  })
