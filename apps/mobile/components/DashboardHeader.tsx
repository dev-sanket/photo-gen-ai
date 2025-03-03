import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { ThemedText } from './ThemedText'
import { UserResource } from '@clerk/types'
import { Ionicons } from '@expo/vector-icons'
import { IconSymbol } from './ui/IconSymbol'
import { useRouter } from 'expo-router'

interface DashboardHeaderProps {
  user: UserResource
  headerText?: string
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  headerText
}) => {
  const theme = useAppTheme()
  const router = useRouter()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={{ color: theme.colors.text }}>
        {headerText || 'PhotoGen.AI'}
      </ThemedText>
      <View style={styles.rightContainer}>
        <View style={styles.walletContainer}>
          <IconSymbol
            name="plus.circle"
            size={18}
            color={theme.colors.warning}
            style={{ marginRight: theme.spacing.xs }}
          />
          <ThemedText
            type="default"
            style={{
              color: theme.colors.backdrop,
              fontSize: theme.fonts.bodySmall.fontSize
            }}
          >
            $500 coins
          </ThemedText>
        </View>
        <TouchableOpacity
          onPress={() => router.push(`/(tabs)/(profile)/${user.id}`)}
        >
          <Image
            source={{ uri: user.imageUrl }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: theme.spacing.xxxl,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // Android shadow
      elevation: 5,
      // iOs shadow
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    rightContainer: {
      flexDirection: 'row',
      flex: 0.7,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    walletContainer: {
      marginTop: theme.spacing.xs,
      justifyContent: 'center',
      paddingHorizontal: 5,
      paddingVertical: 2,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.inverseOnSurface,
      flexDirection: 'row',
      borderRadius: 25,
      backgroundColor: theme.colors.inverseOnSurface
    }
  })
export default DashboardHeader
