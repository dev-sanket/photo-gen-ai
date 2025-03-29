import React from 'react'
import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import { ThemedText } from '../ThemedText'
import { AppTheme, useAppTheme } from '@/theme/theme'

const GradientText = ({
  text,
  colors,
  style
}: {
  text: string
  colors: string[]
  style?: StyleProp<TextStyle>
}) => {
  const theme = useAppTheme()
  const styles = getStyles(theme)

  return (
    <MaskedView
      maskElement={
        <View style={styles.maskContainer}>
          <ThemedText
            type="default"
            style={[
              styles.maskText,
              {
                ...StyleSheet.flatten(style)
              }
            ]}
          >
            {text}
          </ThemedText>
        </View>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <Text
          style={[
            styles.gradientText,
            {
              ...StyleSheet.flatten(style)
            }
          ]}
        >
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  )
}
const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    maskContainer: {
      backgroundColor: 'transparent'
    },
    maskText: {
      fontSize: theme.fonts.titleMedium.fontSize,
      fontWeight: theme.fonts.titleMedium.fontWeight
    },
    gradientContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    gradientText: {
      opacity: 0,
      fontSize: theme.fonts.titleMedium.fontSize,
      fontWeight: theme.fonts.titleMedium.fontWeight
    }
  })

export default GradientText
