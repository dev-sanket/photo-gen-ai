import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar, Button } from 'react-native-paper'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { AppTheme, useAppTheme } from '@/theme/theme'
import PageHeader from '@/components/PageHeader'
import { ThemedText } from '@/components/ThemedText'

const ProfileScreen = () => {
  const theme = useAppTheme()
  const { signOut, getToken } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const styles = getStyles(theme)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken()
        console.log('Token:', token)
        if (!token) {
          router.replace('/(auth)/sign-in')
        }
      } catch (error) {
        console.error('Check auth error:', error)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut()
      console.log('User logged out successfully')
      router.replace('/(auth)/sign-in')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View
            style={{
              alignItems: 'center',
              borderWidth: 1,
              // borderColor: theme.colors.backdrop,
              borderRadius: theme.roundness * 2,
              padding: theme.spacing.md,
              // Android shadow
              elevation: 5,
              // iOs shadow
              shadowColor: theme.colors.text,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              backgroundColor: theme.colors.background
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderColor: theme.colors.tertiary,
                borderRadius: 90,
                padding: theme.spacing.sm
              }}
            >
              <Avatar.Image source={{ uri: user?.imageUrl }} size={92} />
            </View>
            <View style={{ marginTop: theme.spacing.md }}>
              <ThemedText
                type="default"
                style={{
                  textAlign: 'center',
                  fontSize: theme.fonts.headlineSmall.fontSize,
                  fontWeight: theme.fonts.labelLarge.fontWeight
                }}
              >
                {user?.fullName}
              </ThemedText>
              <ThemedText
                type="default"
                style={{
                  textAlign: 'center',
                  color: theme.colors.textLight,
                  fontSize: theme.fonts.labelMedium.fontSize,
                  fontWeight: theme.fonts.labelMedium.fontWeight
                }}
              >
                {user?.emailAddresses.at(0)?.emailAddress}
              </ThemedText>
            </View>

            <View
              style={{
                width: '100%',
                marginTop: theme.spacing.xxl,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              {[0, 1, 2].map((ele) => (
                <View
                  key={ele}
                  style={{
                    backgroundColor: theme.colors.tertiaryContainer,
                    paddingHorizontal: theme.spacing.md * 1.5,
                    paddingVertical: theme.spacing.xl,
                    borderWidth: 1,
                    borderColor: theme.colors.tertiaryContainer,
                    borderRadius: theme.roundness * 2,
                    // Android shadow
                    elevation: 5,
                    // iOs shadow
                    shadowColor: theme.colors.text,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84
                  }}
                >
                  <ThemedText
                    type="default"
                    style={{
                      fontSize: theme.fonts.headlineSmall.fontSize,
                      fontWeight: theme.fonts.headlineLarge.fontWeight
                    }}
                  >
                    350
                  </ThemedText>
                  <ThemedText
                    type="default"
                    style={{
                      textAlign: 'center',
                      color: theme.colors.textLight,
                      fontSize: theme.fonts.labelMedium.fontSize,
                      fontWeight: theme.fonts.labelMedium.fontWeight
                    }}
                  >
                    Coins
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
          {/* <Button mode="contained" onPress={handleLogout}>
            Logout
          </Button> */}
        </View>
      </ScrollView>
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
      padding: theme.spacing.md,
      marginTop: theme.spacing.xxl
    }
  })
export default ProfileScreen
