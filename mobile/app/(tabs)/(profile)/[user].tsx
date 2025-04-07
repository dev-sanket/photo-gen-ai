import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar, Button, List } from 'react-native-paper'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { AppTheme, useAppTheme } from '@/theme/theme'
import PageHeader from '@/components/PageHeader'
import { ThemedText } from '@/components/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Ionicons } from '@expo/vector-icons'

const ProfileScreen = () => {
  const theme = useAppTheme()
  const { signOut, getToken } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const styles = getStyles(theme)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken({ template: 'jwt-test' })
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

  return (
    <View style={styles.container}>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
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
              <ThemedText type="default" style={styles.emailText}>
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
                <View key={ele} style={styles.infoCard}>
                  <ThemedText type="default" style={styles.infoMainText}>
                    350
                  </ThemedText>

                  <ThemedText type="default" style={styles.infoText}>
                    Coins
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
          <View
            style={[
              styles.profileCard,
              {
                marginTop: theme.spacing.xxl,
                alignItems: 'flex-start',
                padding: 0,
                backgroundColor: theme.colors.inverseOnSurface
              }
            ]}
          >
            <List.Section style={{ margin: 0 }}>
              {/* <List.Item
                title="Account Details"
                left={() => (
                  <Avatar.Icon
                    icon={'account'}
                    size={32}
                    color={theme.colors.primary}
                    style={{ backgroundColor: theme.colors.primaryContainer }}
                  />
                )}
                right={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: theme.spacing.sm
                    }}
                  >
                    <IconSymbol
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      name="chevron.right"
                      type="feather"
                      size={16}
                      color={theme.colors.outlineVariant}
                    />
                  </View>
                )}
                style={{
                  padding: theme.spacing.md,
                  width: '100%',
                  borderBottomColor: theme.colors.outlineVariant,
                  borderBottomWidth: StyleSheet.hairlineWidth
                }}
                titleStyle={{
                  fontSize: theme.fonts.titleMedium.fontSize,
                  fontWeight: theme.fonts.titleMedium.fontWeight
                }}
                onPress={() => router.push('/[update-profile]')}
              /> */}

              <List.Item
                title="Settings"
                left={() => (
                  <Avatar.Icon
                    icon={() => (
                      <Ionicons
                        name="settings-outline"
                        size={22}
                        color={theme.colors.primary}
                      />
                    )}
                    size={32}
                    color={theme.colors.primary}
                    style={{ backgroundColor: theme.colors.primaryContainer }}
                  />
                )}
                right={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: theme.spacing.sm
                    }}
                  >
                    <IconSymbol
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      name="chevron.right"
                      size={16}
                      color={theme.colors.outlineVariant}
                    />
                  </View>
                )}
                style={{
                  padding: theme.spacing.md,
                  width: '100%',
                  borderBottomColor: theme.colors.outlineVariant,
                  borderBottomWidth: StyleSheet.hairlineWidth
                }}
                titleStyle={{
                  fontSize: theme.fonts.titleMedium.fontSize,
                  fontWeight: theme.fonts.titleMedium.fontWeight
                }}
                onPress={() => router.push('/settings')}
              />

              <List.Item
                title="Privacy & Security"
                left={() => (
                  <Avatar.Icon
                    icon={'shield-lock-outline'}
                    size={32}
                    color={theme.colors.primary}
                    style={{ backgroundColor: theme.colors.primaryContainer }}
                  />
                )}
                right={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: theme.spacing.sm
                    }}
                  >
                    <IconSymbol
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      name="chevron.right"
                      size={16}
                      color={theme.colors.outlineVariant}
                    />
                  </View>
                )}
                style={{
                  padding: theme.spacing.md,
                  width: '100%',
                  borderBottomColor: theme.colors.outlineVariant,
                  borderBottomWidth: StyleSheet.hairlineWidth
                }}
                titleStyle={{
                  fontSize: theme.fonts.titleMedium.fontSize,
                  fontWeight: theme.fonts.titleMedium.fontWeight
                }}
                onPress={() => router.push('/privacy')}
              />
              <List.Item
                title="FAQs"
                left={() => (
                  <Avatar.Icon
                    icon={'information-outline'}
                    size={32}
                    color={theme.colors.primary}
                    style={{ backgroundColor: theme.colors.primaryContainer }}
                  />
                )}
                right={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: theme.spacing.sm
                    }}
                  >
                    <IconSymbol
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      name="chevron.right"
                      size={16}
                      color={theme.colors.outlineVariant}
                    />
                  </View>
                )}
                style={{
                  padding: theme.spacing.md,
                  width: '100%',
                  borderBottomColor: theme.colors.outlineVariant,
                  borderBottomWidth: StyleSheet.hairlineWidth
                }}
                titleStyle={{
                  fontSize: theme.fonts.titleMedium.fontSize,
                  fontWeight: theme.fonts.titleMedium.fontWeight
                }}
                onPress={() => router.push('/faqs')}
              />
              <List.Item
                title="Help & Support"
                left={() => (
                  <Avatar.Icon
                    icon={'ticket-account'}
                    size={32}
                    color={theme.colors.primary}
                    style={{ backgroundColor: theme.colors.primaryContainer }}
                  />
                )}
                right={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: theme.spacing.sm
                    }}
                  >
                    <IconSymbol
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      name="chevron.right"
                      size={16}
                      color={theme.colors.outlineVariant}
                    />
                  </View>
                )}
                style={{
                  padding: theme.spacing.md,
                  width: '100%'
                  // borderBottomColor: theme.colors.outlineVariant,
                  // borderBottomWidth: StyleSheet.hairlineWidth
                }}
                titleStyle={{
                  fontSize: theme.fonts.titleMedium.fontSize,
                  fontWeight: theme.fonts.titleMedium.fontWeight
                }}
                onPress={() => router.push('/support')}
              />
              {/* <List.Item
                title="Logout"
                left={() => (
                  <Avatar.Icon
                    icon={'logout'}
                    size={32}
                    color={theme.colors.error}
                    style={{ backgroundColor: theme.colors.errorContainer }}
                  />
                )}
                style={{
                  padding: theme.spacing.md,
                  width: '100%'
                }}
                titleStyle={{
                  color: theme.colors.error,
                  fontSize: theme.fonts.titleMedium.fontSize,
                  fontWeight: theme.fonts.titleMedium.fontWeight
                }}
                onPress={handleLogout}
              /> */}
            </List.Section>
          </View>
          <ThemedText
            type="default"
            style={{
              marginTop: theme.spacing.xxl,
              textAlign: 'center',
              color: theme.colors.textLight,
              fontSize: theme.fonts.bodySmall.fontSize,
              fontWeight: theme.fonts.bodySmall.fontWeight
            }}
          >
            Version - {'1.1.1'}
          </ThemedText>
          <View style={{ height: 70 }}></View>
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
    },
    profileCard: {
      alignItems: 'center',
      // borderWidth: 1,
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
    },
    emailText: {
      textAlign: 'center',
      color: theme.colors.textLight,
      fontSize: theme.fonts.labelMedium.fontSize,
      fontWeight: theme.fonts.labelMedium.fontWeight
    },
    avatarContainer: {
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.inversePrimary,
      borderRadius: 90,
      padding: theme.spacing.sm
    },
    infoCard: {
      backgroundColor: theme.colors.primaryContainer,
      paddingHorizontal: theme.spacing.md * 1.5,
      paddingVertical: theme.spacing.xl,
      borderRadius: theme.roundness * 2,
      // Android shadow
      elevation: 5,
      // iOs shadow
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    infoText: {
      textAlign: 'center',
      color: theme.colors.textLight,
      fontSize: theme.fonts.labelMedium.fontSize,
      fontWeight: theme.fonts.labelMedium.fontWeight
    },
    infoMainText: {
      fontFamily: theme.fonts.bodyLarge.fontFamily,
      fontSize: theme.fonts.headlineSmall.fontSize,
      fontWeight: theme.fonts.headlineLarge.fontWeight
    }
  })
export default ProfileScreen
