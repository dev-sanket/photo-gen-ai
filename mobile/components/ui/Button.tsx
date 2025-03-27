import React from 'react'
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from 'react-native'
import { Button } from 'react-native-paper'
import { AppTheme, useAppTheme } from '@/theme/theme'

interface CustomButtonProps {
  text: string
  loading: boolean
  disable: boolean
  onPress: (e: any) => void
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
}
const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  loading,
  disable,
  onPress,
  style,
  labelStyle,
  children
}) => {
  const theme = useAppTheme()
  const styles = getStyles(theme)

  return (
    <Button
      mode="contained"
      rippleColor="#d1d1d175"
      buttonColor={theme.colors.primary}
      style={[
        {
          width: '100%',
          borderRadius: theme.roundness * 2,
          // iOS Shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          // Android Shadow
          elevation: 4, // Higher value = stronger shadow

          ...StyleSheet.flatten(style)
        },
        disable && styles.disabled
      ]}
      labelStyle={{
        fontSize: theme.fonts.titleMedium.fontSize,
        fontWeight: theme.fonts.titleMedium.fontWeight,
        color: theme.colors.background,
        ...StyleSheet.flatten(labelStyle)
      }}
      loading={loading}
      disabled={disable}
      onPress={onPress}
    >
      {children && children}
      {text && text}
    </Button>
  )
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    disabled: { backgroundColor: '#aaa' }
  })
export default CustomButton
