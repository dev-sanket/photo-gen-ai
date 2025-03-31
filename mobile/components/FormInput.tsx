import { AppTheme, useAppTheme } from '@/theme/theme'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native'
import { TextInput } from 'react-native-paper'

interface FromInputProps {
  label: string
  value: string
  dense?: boolean
  disabled?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
  placeholder?: string
  secureTextEntry?: boolean
  error?: string
  onChangeText?: (text: string) => void
  onBlur?: (e: any) => void
  style?: StyleProp<TextStyle>
  outlineStyle?: StyleProp<ViewStyle>
}
const FormInput: React.FC<FromInputProps> = ({
  label,
  value,
  dense = false,
  placeholder,
  left,
  right,
  disabled = false,
  secureTextEntry,
  onChangeText,
  onBlur,
  error,
  style = {},
  outlineStyle = {}
}) => {
  const theme: AppTheme = useAppTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <TextInput
        label={label}
        left={left}
        right={right}
        disabled={disabled}
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        activeOutlineColor={theme.colors.primary}
        outlineColor={theme.colors.outline}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        dense={dense}
        style={{ ...(style as TextStyle) }}
        outlineStyle={{
          borderWidth: 2,
          borderRadius: theme.roundness * 3,
          ...(outlineStyle as ViewStyle)
          // borderColor: theme.colors.outline
        }}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}
const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: { marginBottom: theme.spacing.md },
    label: {
      fontSize: theme.fonts.labelLarge.fontSize,
      fontWeight: theme.fonts.labelLarge.fontWeight,
      marginBottom: theme.spacing.xs,
      color: theme.colors.text
    },
    input: {
      // borderWidth: 1
      // padding: 10,
      // borderRadius: theme.roundness * 2,
      // borderColor: '#ccc',
      // fontSize: 16
    },
    errorInput: { borderColor: theme.colors.error },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.fonts.labelSmall.fontSize,
      marginTop: theme.spacing.xs,
      marginLeft: theme.spacing.xs
    }
  })

export default FormInput
