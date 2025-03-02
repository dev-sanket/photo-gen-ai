import { AppTheme, useAppTheme } from '@/theme/theme'
import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'

interface FromInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  onBlur: (e: any) => void
  placeholder: string
  secureTextEntry?: boolean
  error?: string
}
const FormInput: React.FC<FromInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry,
  error
}) => {
  const theme: AppTheme = useAppTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
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
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: '#ccc',
      fontSize: 16
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
