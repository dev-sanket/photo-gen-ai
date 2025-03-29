import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform,
  Alert
} from 'react-native'
import React, { useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { AppTheme, useAppTheme } from '@/theme/theme'
import IconButton from '@/components/IconButton'
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import {
  ImageZoom,
  ImageZoomRef,
  Zoomable
} from '@likashefqet/react-native-image-zoom'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const MIN_SCALE = 0.5
const MAX_SCALE = 5
const ZOOM_IN_X = 146
const ZOOM_IN_Y = 491

const ViewImage = () => {
  const { imageURI } = useLocalSearchParams<{ imageURI: string }>()
  const theme = useAppTheme()
  const router = useRouter()

  const styles = getStyles(theme)

  const imageZoomRef = useRef<ImageZoomRef>(null)
  const { top, bottom } = useSafeAreaInsets()

  const scale = useSharedValue(1)

  const [isZoomed, setIsZoomed] = useState(false)

  const zoomIn = () => {
    imageZoomRef?.current?.zoom({ scale: 5, x: ZOOM_IN_X, y: ZOOM_IN_Y })
  }
  const zoomOut = () => {
    imageZoomRef?.current?.reset()
  }

  const getInfo = () => {
    const info = imageZoomRef?.current?.getInfo()
    Alert.alert('Info', JSON.stringify(info, null, 2))
  }

  const animatedStyle = useAnimatedStyle(
    () => ({
      borderRadius: 30 / scale.value
    }),
    [scale]
  )

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.body}>
          <View
            style={{
              position: 'absolute',
              top: 20,
              left: 5,
              zIndex: 999,
              justifyContent: 'center'
            }}
          >
            <IconButton
              icon="chevron.left"
              color="#fff"
              size={Platform.OS === 'ios' ? 22 : 32}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 38,
                height: 38,
                // borderWidth: 1,
                borderRadius: 6
                // borderColor: theme.colors.outline
              }}
              onPress={() => router.back()}
            />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              height: DEVICE_HEIGHT,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ translateY: -50 }]
            }}
          >
            {/* <ImageBackground
            resizeMode="contain"
            source={{ uri: imageURI }}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: theme.colors.inverseSurface
            }}
          /> */}
            {/* <ImageZoom
              uri={imageURI}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: theme.colors.inverseSurface
              }}
            /> */}

            <Zoomable
              ref={imageZoomRef}
              minScale={MIN_SCALE}
              maxScale={MAX_SCALE}
              scale={scale}
              doubleTapScale={3}
              isSingleTapEnabled
              isDoubleTapEnabled
              style={{ width: '100%', height: '100%' }}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: imageURI }}
                contentFit="contain"
              />
            </Zoomable>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default ViewImage
const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.inverseSurface
    },
    body: {
      flex: 1,
      // padding: theme.spacing.md,
      marginTop: theme.spacing.xxl
    }
  })
