import React, { useCallback, useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, View, Image, StyleSheet, Alert, ScrollView } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import * as Yup from 'yup'
import { Formik } from 'formik'
import FormInput from '@/components/FormInput'
import { AppTheme, useAppTheme } from '@/theme/theme'
import CustomButton from '@/components/ui/Button'

export default function Page() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const router = useRouter()
  const theme = useAppTheme()

  const styles = getStyles(theme)
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Too short name').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Too short password!')
      .required('Password is required')
  })

  // Handle the submission of the sign-in form
  const onSignUpPress = useCallback(
    async (values: { email: string; password: string; name: string }) => {
      if (!isLoaded) return
      setLoading(true)
      // Start the sign-in process using the email and password provided
      try {
        // console.log('fnme--->', values.name.split(' ')[0])
        // console.log('lnme--->', values.name.split(' ')[1])
        const signupResponse = await signUp.create({
          emailAddress: values.email,
          password: values.password
        })

        const signupCode = await signUp.prepareEmailAddressVerification({
          strategy: 'email_code'
        })
        setLoading(false)
        // console.log('signupCode ---> ', signupCode)
        router.push({
          pathname: '/(auth)/verify-email',
          params: { email: values.email }
        })
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        // console.error(JSON.stringify(err, null, 2))
        setLoading(false)
        const error = err as any
        Alert.alert('Error in Signup', error.errors[0].longMessage, [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ])
      }
    },
    [isLoaded, signUp, setActive, router]
  )

  return (
    <View style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View
          style={{ marginTop: theme.spacing.xxxl * 2, alignItems: 'center' }}
        >
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

        <View style={{ marginTop: theme.spacing.md }}>
          <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => await onSignUpPress(values)}
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
                  label="Full Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Enter your full Name"
                  error={touched.name ? errors.name : undefined}
                />
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
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity> */}

                <CustomButton
                  text="Signup"
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
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: theme.spacing.lg,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text>Already have an account?</Text>
          <Link href="../sign-in" style={{ marginLeft: 5, color: '#6366f1' }}>
            <Text>Sign in</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  )
}
const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    formContainer: { padding: theme.spacing.md },
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
