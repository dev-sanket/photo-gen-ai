import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { ThemedText } from './ThemedText'
import { Avatar } from 'react-native-paper'

const PageHeader = () => {
  const theme = useAppTheme()
  const router = useRouter()

  const { user } = useUser()

  const styles = getStyles(theme)
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftPos}>
        <IconButton
          iconFamily="feather"
          icon="chevron.left"
          color={theme.colors.textLight}
          size={18}
          style={styles.backButton}
          onPress={() => router.back()}
        />
      </View>

      <View style={styles.centerPos}>
        <ThemedText
          type="default"
          style={{
            fontSize: theme.fonts.titleLarge.fontSize,
            fontWeight: theme.fonts.labelLarge.fontWeight,
            color: theme.colors.text
          }}
        >
          Photos
        </ThemedText>
      </View>
      <View style={styles.rightPos}>
        <TouchableOpacity
          style={{ width: 32, height: 32 }}
          onPress={() => router.push(`/(tabs)/(profile)/${user?.id}`)}
        >
          <Avatar.Image source={{ uri: user?.imageUrl }} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    headerContainer: {
      paddingTop: theme.spacing.xxl * 1.5,
      paddingHorizontal: theme.spacing.sm,
      flexDirection: 'row',
      marginBottom: theme.spacing.md
    },
    backButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
      borderWidth: 1,
      borderRadius: 6,
      borderColor: theme.colors.outline
    },
    leftPos: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    centerPos: {
      flex: 0.6,
      alignItems: 'center',
      justifyContent: 'center'
    },
    rightPos: { flex: 0.3, alignItems: 'flex-end' }
  })
export default PageHeader
