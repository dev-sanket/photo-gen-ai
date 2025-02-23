import React from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import * as Yup from "yup";
import { Formik } from 'formik'
import FormInput from '@/components/FormInput'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()
    
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(6, "Too short!").required("Required"),
      });

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 50, alignItems: 'center', }}>
            <Image
                source={require("../../assets/images/icon.png")} // Change to your logo path
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
                resizeMode="contain"
            />
        </View>
        <View style={{ alignItems: 'center', marginTop: 20}}>
            <ThemedText type="title" style={{fontSize: 22, fontWeight: '700'}}>Welcome to PhotoGen.AI</ThemedText>
            <ThemedText type="default" style={{ color: '#4b5563', fontSize: 16, marginTop: 12 }} >Sign in to start creating amazing photos</ThemedText>
        </View>
        <View style={{ marginTop: 30 }}>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values) => JSON.stringify(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.formContainer}>
                            <FormInput
                                label="Email Address"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                placeholder="Enter your email"
                                error={touched.email ? errors.email : undefined}
                            />
                            <FormInput
                                label="Password"
                                value={values.password}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                placeholder="Enter your password"
                                secureTextEntry
                                error={touched.password ? errors.password : undefined}
                            />
                            <TouchableOpacity style={[styles.button, (!values.email || !values.password) && styles.disabled]} onPress={() => handleSubmit()}>
                                <Text style={styles.buttonText}>Signin</Text>
                            </TouchableOpacity>
                        </View> 
                )}
                
            </Formik>
              
        </View>
           
        <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
            <Text>Don't have an account?</Text>
            <Link href="../sign-up" style={{ marginLeft: 5, color: '#6366f1' }}>
                <Text>Sign up</Text>
            </Link>
        </View>
      
      
    </View>
  )
}

const styles = StyleSheet.create({
    formContainer: { padding: 20 },
    button: { backgroundColor: "#007BFF", padding: 12, borderRadius: 5, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    disabled: { backgroundColor: "#aaa", marginTop: 10 },
  });
  