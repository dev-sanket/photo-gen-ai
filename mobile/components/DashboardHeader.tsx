import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Animated
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { ThemedText } from './ThemedText'
import { UserResource } from '@clerk/types'
import { useRouter } from 'expo-router'
import IconButton from './IconButton'
import { Avatar } from 'react-native-paper'

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
  const [userImageLoading, setUserImageLoading] = useState(false)

  const scrollY = useRef(new Animated.Value(0)).current

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200], // Scroll range
    outputRange: [60, 0], // Header size range
    extrapolate: 'clamp' // Clamp the values
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS === 'ios' ? theme.spacing.xxxl : theme.spacing.xxl
        }
      ]}
    >
      <ThemedText type="subtitle" style={{ color: theme.colors.text }}>
        {headerText || 'PhotoGen.AI'}
      </ThemedText>
      <View style={styles.rightContainer}>
        <IconButton
          icon="plus"
          iconPosition="left"
          size={18}
          color={theme.colors.warning}
          style={styles.walletContainer}
          onPress={() => console.log('Pressed')}
        >
          <ThemedText
            type="default"
            style={{
              color: theme.colors.backdrop,
              fontSize: theme.fonts.bodySmall.fontSize
            }}
          >
            $500 coins
          </ThemedText>
        </IconButton>

        {userImageLoading ? (
          <ActivityIndicator animating={true} size={'small'} />
        ) : (
          <TouchableOpacity
            style={{ width: 32, height: 32 }}
            onPress={() => router.push(`/(tabs)/(profile)/${user.id}`)}
          >
            <Avatar.Image
              source={{ uri: user.imageUrl }}
              size={32}
              onLoadStart={() => {
                // console.log('Image loading start')
                setUserImageLoading(true)
              }}
              onLoad={() => {
                // console.log('Image loading end')
                setUserImageLoading(false)
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  )
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      // paddingTop: theme.spacing.xxl,
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
      flex: 0.6,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    walletContainer: {
      // marginTop: theme.spacing.xs,
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
