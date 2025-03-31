import React, { useState } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { Avatar, TextInput } from 'react-native-paper'

import DateTimePicker from '@react-native-community/datetimepicker'
import * as Yup from 'yup'
import FormInput from '@/components/FormInput'
import IconButton from '@/components/IconButton'
import PageHeader from '@/components/PageHeader'
import CustomButton from '@/components/ui/Button'
import { AppTheme, useAppTheme } from '@/theme/theme'
import moment from 'moment'

const UpdateProfileScreen = () => {
  const theme = useAppTheme()
  const { signOut, getToken } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const styles = getStyles(theme)

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    dob: Yup.string()
  })

  return (
    <View style={styles.container}>
      <PageHeader pageTitle="Edit Profile" right={false} />
      <View style={styles.body}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: theme.colors.background
          }}
        >
          <View
            style={{
              alignItems: 'center',
              borderRadius: 90,
              padding: theme.spacing.sm
            }}
          >
            <Avatar.Image source={{ uri: user?.imageUrl }} size={92} />
            <IconButton
              icon="camera.fill"
              size={16}
              color={theme.colors.primary}
              style={{
                position: 'absolute',
                top: 10,
                right: 7,
                backgroundColor: '#fff',
                borderRadius: 50,
                borderWidth: 2,
                borderColor: theme.colors.surfaceVariant,
                padding: theme.spacing.xs
              }}
              onPress={() => console.log('pressed')}
            />
          </View>
        </View>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            dob: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => console.log(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched
          }) => (
            <View
              style={{
                alignItems: 'flex-start',
                marginTop: theme.spacing.md,
                padding: theme.spacing.md
                // backgroundColor: theme.colors.inverseOnSurface,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ flex: 0.48 }}>
                  <FormInput
                    label="First Name"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    placeholder={'Enter First Name'}
                  />
                </View>
                <View style={{ flex: 0.48 }}>
                  <FormInput
                    label="Last Name"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    placeholder={'Enter First Name'}
                  />
                </View>
              </View>
              <View
                style={{
                  width: '100%'
                }}
              >
                <FormInput
                  label="Email Address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder={'Enter Email Address'}
                />
              </View>
              <View
                style={{
                  width: '100%'
                }}
              >
                <FormInput
                  disabled
                  label="DOB"
                  value={values.dob}
                  placeholder={'30/12/2002'}
                  outlineStyle={{
                    borderColor: theme.colors.outline
                  }}
                  style={{ color: theme.colors.text }}
                  right={
                    <TextInput.Icon
                      icon="calendar"
                      color={theme.colors.primary}
                      onPress={() => {
                        setShowDatePicker(!showDatePicker)
                      }}
                    />
                  }
                />
                {showDatePicker && (
                  <DateTimePicker
                    display="spinner"
                    value={new Date()}
                    onChange={(_: any, date?: Date) => {
                      setShowDatePicker(false)
                      if (_.type === 'dismissed') {
                        console.log('User cancelled the picker')
                      } else if (showDatePicker) {
                        setFieldValue('dob', moment(date).format('DD/MM/YYYY'))
                        console.log('Selected date:', date)
                      }
                    }}
                    maximumDate={new Date()}
                  />
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
      <View
        style={{
          bottom: Platform.select({
            ios: theme.spacing.xxl,
            android: theme.spacing.md
          }),
          paddingHorizontal: theme.spacing.md
        }}
      >
        <CustomButton
          text="Update"
          onPress={() => console.log('press')}
          loading={false}
          disable={false}
        />
      </View>
    </View>
  )
}

export default UpdateProfileScreen

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
      // marginTop: Platform.select({
      //   ios: theme.spacing.xxl,
      //   android: theme.spacing.xl
      // })
    },
    body: {
      flex: 1,
      padding: theme.spacing.md
      // marginTop: theme.spacing.xxl
    }
  })
