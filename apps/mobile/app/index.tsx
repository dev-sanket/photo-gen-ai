import { View, Text, StyleSheet, Animated, ActivityIndicator, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import BouncingLogo from '@/components/BouncingLogo';
import { ThemedText } from '@/components/ThemedText';
import IconButton from '@/components/IconButton';

const LandingScreen = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 10 * 1000);
  }, []);

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
        <ThemedText type='title' style={{ color: 'white' }} >PhotoGen.AI</ThemedText>
      </View>
      <View style={{ marginTop: 15, alignItems: 'center' }}>
        <ThemedText type='default' style={{ color: 'white' }} >Transform Your Photos with AI Magic</ThemedText>

      </View>


      {/* Loader at the bottom */}

      <View style={styles.loaderContainer}>
        {
          showLoader
            ? <ActivityIndicator size={60} color="#fff" />
            : <IconButton
                name='chevron.right' color='#000' size={30}
                style={{
                  padding: 0,
                  width:60,
                  height:60,
                }}
                onPress={() => console.log('Pressed')}
              />
        }
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  loaderContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{translateX: -30}, {translateY: -20}],
  }
});

export default LandingScreen