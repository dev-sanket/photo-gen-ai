import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat } from "react-native-reanimated";

export default function BouncingLogo() {
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    translateY.value = withRepeat(
      withSpring(35, { damping: 5, stiffness: 100 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/icon.png")} // Change to your logo path
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // Android Shadow
    elevation: 6, // Higher value = stronger shadow
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
})