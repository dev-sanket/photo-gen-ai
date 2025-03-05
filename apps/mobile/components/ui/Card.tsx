import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { ThemedText } from '../ThemedText'

interface CardProps {
  cardHeadingText: string
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ cardHeadingText, children }) => {
  const theme = useAppTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.cardContainer}>
      <View style={{ flexDirection: 'row' }}>
        <ThemedText type="default" style={styles.cardHeadingText}>
          {cardHeadingText}
        </ThemedText>
      </View>

      {children}
    </View>
  )
}
const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    cardContainer: {
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
    cardHeadingText: {
      marginTop: theme.spacing.sm,
      color: theme.colors.text,
      fontSize: theme.fonts.labelLarge.fontSize,
      fontWeight: theme.fonts.labelLarge.fontWeight
    }
  })
export default Card
