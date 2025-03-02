import React from 'react'
import { Image, StyleSheet, Platform, View } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { useAuth, useUser } from '@clerk/clerk-expo'
import DashboardHeader from '@/components/DashboardHeader'

export default function DashboardHomeScreen() {
  const theme = useAppTheme()
  const { getToken, userId } = useAuth()
  const { user } = useUser()

  const styles = getStyles(theme)
  return (
    <View style={styles.container}>
      {user && <DashboardHeader user={user} />}
      <View style={styles.body}>
        <View style={styles.headerText}>
          <ThemedText type="title">Good Morning</ThemedText>
        </View>
      </View>
    </View>
  )
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    body: {
      flex: 1,
      padding: 12
    },
    headerText: {
      marginTop: theme.spacing.md
    }
  })
