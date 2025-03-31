import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'

const PackListingScreen = () => {
  const theme = useAppTheme()
  const router = useRouter()

  const { user } = useUser()

  const styles = getStyles(theme)
  return (
    <View>
      <Text>PackListingScreen</Text>
    </View>
  )
}

export default PackListingScreen
const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    body: {
      flex: 1,
      padding: theme.spacing.md
    }
  })
