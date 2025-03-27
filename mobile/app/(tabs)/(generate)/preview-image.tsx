import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  Image
} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

import { AppTheme, useAppTheme } from '@/theme/theme'
import { ThemedText } from '@/components/ThemedText'
import PageHeader from '@/components/PageHeader'

const images = [
  'https://dummyimage.com/640x3:4&text=AI+Apps+rocks',
  'https://dummyimage.com/640x3:4',
  'https://dummyimage.com/640x3:4',
  'https://dummyimage.com/640x3:4&text=Images+Kills'
]

const ImagePreviewScreen = () => {
  const theme = useAppTheme()
  const { user } = useUser()
  const router = useRouter()

  const styles = getStyles(theme)

  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

  const handleLoadEnd = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          {/* <View style={{}}>
            <ThemedText
              type="default"
              style={{
                fontSize: theme.fonts.headlineSmall.fontSize,
                fontWeight: theme.fonts.headlineSmall.fontWeight
              }}
            >
              Preview
            </ThemedText>
          </View> */}
          <PageHeader />
          <FlatList
            data={images}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2} // Grid layout (2 columns)
            renderItem={({ item, index }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: loadedImages[index] ? item : '' }}
                  style={styles.image}
                  onLoadEnd={() => handleLoadEnd(index)}
                />
              </View>
            )}
            columnWrapperStyle={styles.imageRow}
            contentContainerStyle={{ marginTop: theme.spacing.md }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors.inversePrimary,
              borderRadius: theme.roundness * 2,
              marginTop: theme.spacing.md,
              padding: theme.spacing.md
            }}
          >
            <ActivityIndicator size={30} color={theme.colors.info} />
            <View
              style={{
                flexDirection: 'column',
                marginLeft: theme.spacing.md
              }}
            >
              <ThemedText
                type="default"
                style={{
                  fontSize: theme.fonts.titleMedium.fontSize,
                  fontWeight: theme.fonts.titleMedium.fontWeight
                }}
              >
                Generating Images...
              </ThemedText>
              <ThemedText
                type="default"
                style={{
                  fontSize: theme.fonts.labelSmall.fontSize,
                  fontWeight: theme.fonts.labelSmall.fontWeight
                }}
              >
                This may take a few moments
              </ThemedText>
            </View>
          </View>
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
      padding: theme.spacing.md
      // marginTop: theme.spacing.xxl
    },

    imageRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly' // Ensures spacing between images
    },
    imageContainer: {
      flex: 1,
      aspectRatio: 3 / 4, // Keeps images at a 2:3 ratio
      marginVertical: theme.spacing.sm, // Adds space between rows
      marginHorizontal: theme.spacing.sm,
      backgroundColor: '#f0f0f0',
      borderRadius: theme.roundness * 2, // Optional: Rounds image corners
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain' // Ensures image fully covers its container
    }
  })
export default ImagePreviewScreen
