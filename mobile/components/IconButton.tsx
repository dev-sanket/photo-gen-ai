import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet
} from 'react-native'
import React from 'react'
import { IconSymbol, IconSymbolName } from './ui/IconSymbol'
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'

interface IconButtonProps {
  icon: IconSymbolName
  size?: number
  color?: string
  text?: string
  style?: StyleProp<ViewStyle>
  iconPosition?: 'left' | 'right'
  onPress: () => void
  children?: React.ReactNode
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 24,
  color = '#fff',
  style = {},
  iconPosition = 'left',
  onPress,
  children = null
}) => {
  return (
    <TouchableOpacity
      style={{
        // borderWidth: 1,
        // borderColor: 'rgba(42, 42, 42, 0.2)',
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: 100,
        // height: 100,
        // backgroundColor: '#fff',
        ...StyleSheet.flatten(style)
      }}
      onPress={onPress}
    >
      {iconPosition === 'left' && (
        <IconSymbol name={icon} size={size} color={color} />
      )}
      {children}
      {iconPosition === 'right' && (
        <IconSymbol name={icon} size={size} color={color} />
      )}
    </TouchableOpacity>
  )
}

export default IconButton
