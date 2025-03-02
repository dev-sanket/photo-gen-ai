import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Button
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemedText } from '@/components/ThemedText'
import BouncingLogo from '@/components/BouncingLogo'
import IconButton from '@/components/IconButton'
import { useRouter } from 'expo-router'

const LandingScreen = () => {
  const router = useRouter()

  const [showLoader, setShowLoader] = useState(false)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowLoader(false);
  //   }, 10 * 1000);
  // }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#6366f1', '#9333ea']}
        style={styles.background}
      />
      <View style={{ marginTop: -50, alignItems: 'center' }}>
        <BouncingLogo />
      </View>

      <View style={{ marginTop: 90, alignItems: 'center' }}>
        <ThemedText type="title" style={{ color: 'white' }}>
          PhotoGen.AI
        </ThemedText>
      </View>
      <View style={{ marginTop: 15, alignItems: 'center' }}>
        <ThemedText type="default" style={{ color: 'white' }}>
          Transform Your Photos with AI Magic
        </ThemedText>
      </View>

      {/* Loader at the bottom */}

      <View
        style={[
          styles.loaderContainer,
          {
            transform: showLoader
              ? [{ translateX: -20 }, { translateY: -20 }]
              : [{ translateX: -80 }, { translateY: -20 }]
          }
        ]}
      >
        {showLoader ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <IconButton
            icon={'chevron.right'}
            color="#000"
            size={30}
            iconPosition="right"
            style={{
              padding: 0,
              width: '70%',
              height: 60,
              borderRadius: 30,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: 20
            }}
            onPress={() => {
              setShowLoader(true)
              setTimeout(() => {
                setShowLoader(false)
                router.push('/(auth)/sign-in')
              }, 2 * 1000)
            }}
          >
            <ThemedText type="default" style={{ color: 'black' }}>
              Get Started
            </ThemedText>
          </IconButton>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%'
  }
})

export default LandingScreen
