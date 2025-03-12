import { MD3LightTheme, MD3DarkTheme, useTheme } from 'react-native-paper'

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4F46E5',
    secondary: '#FF9800',
    tertiary: '#00BFA6',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#E53935',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
    text: '#212121',
    textLight: '#666666'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 50
  }
}

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4F46E5',
    secondary: '#FFB74D',
    tertiary: '#26A69A',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    success: '#81C784',
    warning: '#FFCA28',
    info: '#64B5F6',
    text: '#E0E0E0',
    textLight: '#999999'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 50
  }
}

export type AppTheme = typeof lightTheme | typeof darkTheme

export const useAppTheme = () => useTheme<AppTheme>()
