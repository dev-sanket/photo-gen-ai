import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  Text
} from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { useAuth, useUser } from '@clerk/clerk-expo'
import DashboardHeader from '@/components/DashboardHeader'
import { LinearGradient } from 'expo-linear-gradient'
import IconButton from '@/components/IconButton'
import { Link } from 'expo-router'

export default function DashboardHomeScreen() {
  const theme = useAppTheme()
  const { getToken, userId } = useAuth()
  const { user } = useUser()

  const dummyData = [
    { id: '1', imageUrl: 'https://dummyimage.com/640x4:3&text=AI+Apps+rocks' },
    { id: '2', imageUrl: 'https://dummyimage.com/640x4:3&text=AI+Apps+rocks' },
    { id: '3', imageUrl: 'https://dummyimage.com/640x4:3&text=AI+Apps+rocks' },
    { id: '4', imageUrl: 'https://dummyimage.com/640x4:3&text=AI+Apps+rocks' }
  ]

  const styles = getStyles(theme)
  return (
    <View style={styles.container}>
      {user && <DashboardHeader user={user} />}
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.welcomeText}>
            <ThemedText type="default">Good Morning</ThemedText>
            <ThemedText
              type="subtitle"
              style={{ marginLeft: theme.spacing.sm }}
            >
              {user?.firstName}
            </ThemedText>
          </View>
          <View style={styles.headerBadgeContainer}>
            <LinearGradient
              colors={['#ec4899', '#a855f7']}
              start={{ x: 0.2, y: 0.2 }}
              style={styles.headerBadgeItem}
            >
              <ThemedText type="default" style={styles.headerBadgeItemHeading}>
                Available Coins
              </ThemedText>
              <ThemedText
                type="default"
                style={styles.headerBadgeItemSubHeading}
              >
                350
              </ThemedText>
            </LinearGradient>
            <LinearGradient
              colors={['#06b6d4', '#3b82f6']}
              start={{ x: 0.2, y: 0.2 }}
              style={styles.headerBadgeItem}
            >
              <ThemedText type="default" style={styles.headerBadgeItemHeading}>
                Generated Photos
              </ThemedText>
              <ThemedText
                type="default"
                style={styles.headerBadgeItemSubHeading}
              >
                12
              </ThemedText>
            </LinearGradient>
          </View>
          <View style={styles.quickActionContainer}>
            <ThemedText type="default" style={styles.quickActionHeadingText}>
              Quick Actions
            </ThemedText>
            <View
              style={{
                // flex: 0.33,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: theme.spacing.md
              }}
            >
              <IconButton
                icon="plus"
                size={22}
                color="#a855f7"
                onPress={() => console.log('Pressed')}
                style={styles.actionButtonItem}
              >
                <ThemedText type="default" style={styles.actionButtonText}>
                  Upload
                </ThemedText>
              </IconButton>
              <IconButton
                icon="photo.fill"
                size={22}
                color="#a855f7"
                onPress={() => console.log('Pressed')}
                style={styles.actionButtonItem}
              >
                <ThemedText type="default" style={styles.actionButtonText}>
                  Generate
                </ThemedText>
              </IconButton>
              <IconButton
                icon="gift"
                size={22}
                color="#a855f7"
                onPress={() => console.log('Pressed')}
                style={styles.actionButtonItem}
              >
                <ThemedText type="default" style={styles.actionButtonText}>
                  Get Coin
                </ThemedText>
              </IconButton>
            </View>
          </View>

          <View
            style={[
              styles.quickActionContainer,
              { marginTop: theme.spacing.lg }
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // borderWidth: 1,
                // borderColor: 'red',
                marginTop: theme.spacing.sm
              }}
            >
              <ThemedText
                type="default"
                style={[styles.quickActionHeadingText, { marginTop: 0 }]}
              >
                Recent Images
              </ThemedText>
              <Link
                href="/all-images"
                style={{ marginLeft: 5, color: '#6366f1' }}
              >
                <Text>{'View All >>'}</Text>
              </Link>
            </View>
            <FlatList
              nestedScrollEnabled={true}
              numColumns={2}
              data={dummyData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    margin: theme.spacing.sm,
                    borderRadius: theme.roundness,
                    overflow: 'hidden'
                    // borderWidth: 1,
                    // borderColor: 'red'
                  }}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      width: '100%',
                      height: 120,
                      borderRadius: theme.roundness,
                      resizeMode: 'contain'
                    }}
                  />
                </View>
              )}
              contentContainerStyle={{
                flex: 1,
                marginTop: theme.spacing.sm
              }}
            />
          </View>

          <View
            style={[
              styles.quickActionContainer,
              { marginTop: theme.spacing.lg }
            ]}
          >
            <ThemedText type="default" style={styles.quickActionHeadingText}>
              Featured Packs
            </ThemedText>
            <View
              style={{ flexDirection: 'column', marginTop: theme.spacing.md }}
            >
              <LinearGradient
                colors={['#f97316', '#ec4899']}
                start={{ x: 0.2, y: 0.2 }}
                style={[
                  styles.headerBadgeItem,
                  { marginBottom: theme.spacing.md }
                ]}
              >
                <ThemedText
                  type="default"
                  style={{
                    color: theme.colors.background,
                    fontSize: theme.fonts.titleMedium.fontSize,
                    fontWeight: theme.fonts.titleMedium.fontWeight
                  }}
                >
                  Thailand Holidays
                </ThemedText>
                <ThemedText
                  type="default"
                  style={{
                    color: theme.colors.surface,
                    fontSize: theme.fonts.titleSmall.fontSize,
                    fontWeight: theme.fonts.titleSmall.fontWeight
                  }}
                >
                  Generate vacation style photos
                </ThemedText>
              </LinearGradient>
              <LinearGradient
                colors={['#b12d2d', '#e44cc3']}
                start={{ x: 0.2, y: 0.2 }}
                style={[
                  styles.headerBadgeItem,
                  { marginBottom: theme.spacing.md }
                ]}
              >
                <ThemedText
                  type="default"
                  style={{
                    color: theme.colors.background,
                    fontSize: theme.fonts.titleMedium.fontSize,
                    fontWeight: theme.fonts.titleMedium.fontWeight
                  }}
                >
                  Valentine's Day
                </ThemedText>
                <ThemedText
                  type="default"
                  style={{
                    color: theme.colors.surface,
                    fontSize: theme.fonts.titleSmall.fontSize,
                    fontWeight: theme.fonts.titleSmall.fontWeight
                  }}
                >
                  Romantic photo collection
                </ThemedText>
              </LinearGradient>
              <LinearGradient
                colors={['#6366f1', '#a855f7']}
                start={{ x: 0.2, y: 0.2 }}
                style={[
                  styles.headerBadgeItem,
                  { marginBottom: theme.spacing.md }
                ]}
              >
                <ThemedText
                  type="default"
                  style={{
                    color: theme.colors.background,
                    fontSize: theme.fonts.titleMedium.fontSize,
                    fontWeight: theme.fonts.titleMedium.fontWeight
                  }}
                >
                  Model Lifestyle
                </ThemedText>
                <ThemedText
                  type="default"
                  style={{
                    color: theme.colors.surface,
                    fontSize: theme.fonts.titleSmall.fontSize,
                    fontWeight: theme.fonts.titleSmall.fontWeight
                  }}
                >
                  Professional modeling shots
                </ThemedText>
              </LinearGradient>
            </View>
          </View>
        </View>
        <View style={{ height: 70 }}></View>
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
      padding: theme.spacing.md
    },
    welcomeText: {
      // marginTop: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center'
    },
    headerBadgeContainer: {
      width: '100%',
      marginTop: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerBadgeItem: {
      flex: 0.45,
      padding: theme.spacing.md,
      borderRadius: theme.roundness * 2
    },

    headerBadgeItemHeading: {
      color: theme.colors.background,
      fontSize: theme.fonts.labelLarge.fontSize,
      fontWeight: theme.fonts.labelLarge.fontWeight
    },
    headerBadgeItemSubHeading: {
      marginTop: theme.spacing.sm,
      color: theme.colors.background,
      fontSize: theme.fonts.headlineSmall.fontSize,
      fontWeight: theme.fonts.headlineSmall.fontWeight
    },

    quickActionContainer: {
      marginTop: theme.spacing.lg,
      backgroundColor: '#fff',
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      // Android shadow
      elevation: 5,
      // iOs shadow
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderRadius: theme.roundness * 2
    },
    quickActionHeadingText: {
      marginTop: theme.spacing.sm,
      color: theme.colors.text,
      fontSize: theme.fonts.labelLarge.fontSize,
      fontWeight: theme.fonts.labelLarge.fontWeight
    },
    actionButtonItem: {
      flex: 0.3,
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#eee'
    },
    actionButtonText: {
      color: theme.colors.text,
      fontSize: theme.fonts.labelMedium.fontSize,
      fontWeight: theme.fonts.labelMedium.fontWeight
    }
  })
