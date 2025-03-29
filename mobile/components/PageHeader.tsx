import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import IconButton from './IconButton'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { ThemedText } from './ThemedText'
import { Avatar } from 'react-native-paper'

interface IPageHeader {
  pageTitle: string
  left?: boolean
  right?: boolean
}

const PageHeader: React.FC<IPageHeader> = ({
  pageTitle,
  left = true,
  right = true
}) => {
  const theme = useAppTheme()
  const router = useRouter()

  const { user } = useUser()
  const isIOS = Platform.OS === 'ios'

  const styles = getStyles(theme)
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftPos}>
        {left && (
          <IconButton
            icon="chevron.left"
            color={theme.colors.textLight}
            size={18}
            style={styles.backButton}
            onPress={() => router.back()}
          />
        )}
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
          {pageTitle}
        </ThemedText>
      </View>
      <View style={styles.rightPos}>
        {right && (
          <TouchableOpacity
            style={{ width: 32, height: 32 }}
            onPress={() => router.push(`/(tabs)/(profile)/${user?.id}`)}
          >
            <Avatar.Image source={{ uri: user?.imageUrl }} size={32} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    headerContainer: {
      paddingTop: Platform.select({
        ios: theme.spacing.xxl * 1.5,
        android: theme.spacing.xxl
      }),
      paddingHorizontal: theme.spacing.sm,
      flexDirection: 'row',
      paddingBottom: theme.spacing.md
      // borderBottomColor: '#000',
      // borderBottomWidth: 1
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
      alignItems: 'flex-start',
      marginLeft: theme.spacing.xs
    },
    centerPos: {
      flex: 0.6,
      alignItems: 'center',
      justifyContent: 'center'
    },
    rightPos: {
      flex: 0.3,
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginRight: theme.spacing.xs
    }
  })
export default PageHeader
