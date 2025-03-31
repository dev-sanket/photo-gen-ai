import React from 'react'
import PageHeader from '@/components/PageHeader'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { useAuth, useUser } from '@clerk/clerk-expo'
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import { List, Switch, ProgressBar, Avatar } from 'react-native-paper'
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { IconSymbol } from '@/components/ui/IconSymbol'

const SettingsScreen = () => {
  const theme = useAppTheme()
  const { signOut, getToken } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const styles = getStyles(theme)
  const [darkMode, setDarkMode] = React.useState(false)
  const [notifications, setNotifications] = React.useState(true)

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
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <PageHeader pageTitle="Setting" right={false} />
      <View style={styles.body}>
        <ThemedText
          type="default"
          style={{
            marginVertical: theme.spacing.md,
            color: theme.colors.backdrop,
            fontSize: theme.fonts.titleMedium.fontSize,
            fontWeight: theme.fonts.titleMedium.fontWeight
          }}
        >
          ACCOUNT
        </ThemedText>
        <List.Section
          style={{
            margin: 0,
            padding: 0,
            // Android shadow
            elevation: 5,
            // iOs shadow
            shadowColor: theme.colors.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            backgroundColor: theme.colors.inverseOnSurface,
            borderRadius: theme.roundness * 2,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.sm
          }}
        >
          <List.Item
            title="John Doe"
            description="john.doe@example.com"
            left={() => (
              <Avatar.Image source={{ uri: user?.imageUrl }} size={56} />
            )}
            right={() => (
              <TouchableOpacity onPress={() => router.push('/update-profile')}>
                <ThemedText
                  type="default"
                  style={{
                    color: theme.colors.primary,
                    fontSize: theme.fonts.titleMedium.fontSize,
                    fontWeight: theme.fonts.titleMedium.fontWeight
                  }}
                >
                  Edit
                </ThemedText>
              </TouchableOpacity>
            )}
            style={{
              padding: theme.spacing.md,
              width: '100%',
              borderBottomColor: theme.colors.outlineVariant,
              borderBottomWidth: StyleSheet.hairlineWidth
            }}
          />
          {/* Password Section */}
          <List.Item
            title="Password"
            right={() => (
              <IconSymbol name="chevron.right" color={theme.colors.backdrop} />
            )}
          />
        </List.Section>
        <ThemedText
          type="default"
          style={{
            marginVertical: theme.spacing.md,
            color: theme.colors.backdrop,
            fontSize: theme.fonts.titleMedium.fontSize,
            fontWeight: theme.fonts.titleMedium.fontWeight
          }}
        >
          PREFERENCES
        </ThemedText>
        <List.Section
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: '#fff',
            borderRadius: theme.roundness * 4
          }}
        >
          {/* Preferences Section */}

          <List.Item
            title="Dark Mode"
            left={() => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar.Icon
                  icon={() => (
                    <MaterialIcons
                      name="dark-mode"
                      size={22}
                      color={theme.colors.primary}
                    />
                  )}
                  size={32}
                  style={{ backgroundColor: theme.colors.primaryContainer }}
                />
              </View>
            )}
            right={() => (
              <Switch value={darkMode} onValueChange={setDarkMode} />
            )}
            style={{
              padding: theme.spacing.md,
              width: '100%',
              borderBottomColor: theme.colors.outlineVariant,
              borderBottomWidth: StyleSheet.hairlineWidth
            }}
          />

          <List.Item
            title="Notifications"
            left={() => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar.Icon
                  icon={() => (
                    <Ionicons
                      name="notifications"
                      size={22}
                      color={theme.colors.primary}
                    />
                  )}
                  size={32}
                  style={{ backgroundColor: theme.colors.primaryContainer }}
                />
              </View>
            )}
            right={() => (
              <Switch value={notifications} onValueChange={setNotifications} />
            )}
            style={{
              padding: theme.spacing.md,
              width: '100%',
              borderBottomColor: theme.colors.outlineVariant,
              borderBottomWidth: StyleSheet.hairlineWidth
            }}
          />

          <List.Item
            title="Language"
            description="English"
            left={() => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar.Icon
                  icon={() => (
                    <Ionicons
                      name="language-outline"
                      size={22}
                      color={theme.colors.primary}
                    />
                  )}
                  size={32}
                  style={{ backgroundColor: theme.colors.primaryContainer }}
                />
              </View>
            )}
            right={() => (
              <IconSymbol name="chevron.right" color={theme.colors.backdrop} />
            )}
            style={{
              padding: theme.spacing.md,
              width: '100%'
            }}
          />
          <List.Item
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
          />
        </List.Section>
      </View>

      {/* Storage Section */}
      {/* <List.Subheader>STORAGE AND DATA</List.Subheader> */}

      {/* <View style={styles.storageContainer}>
        <List.Item title="Storage Used" description="450MB / 1GB" />
        <ProgressBar
          progress={0.45}
          color={theme.colors.primary}
          style={styles.progressBar}
        />
      </View> */}

      {/* <List.Item
        title="Clear Cache"
        titleStyle={{ color: 'red' }}
        left={() => <List.Icon icon="trash-can-outline" color="red" />}
      /> */}
    </ScrollView>
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
      padding: theme.spacing.md
      // marginTop: theme.spacing.xxl
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20
    },
    storageContainer: {
      paddingHorizontal: 16
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      marginTop: -16,
      marginBottom: 16
    }
  })

export default SettingsScreen
