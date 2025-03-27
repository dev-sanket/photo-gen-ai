// This file is a fallback for using MaterialIcons on Android and web.

import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolWeight } from 'expo-symbols'
import React from 'react'
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native'

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'person.circle.fill': 'person',
  plus: 'add',
  gift: 'card-giftcard',
  'photo.fill': 'image',
  'pencil.and.ellipsis.rectangle': 'edit-document',
  minus: 'remove',
  'arrow.backward': 'arrow-back',
  'arrow.forward': 'arrow-forward'
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>

export type IconSymbolName = keyof typeof MAPPING

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  type = 'material',
  size = 24,
  color,
  style
}: {
  name:
    | IconSymbolName
    | React.ComponentProps<typeof MaterialIcons>['name']
    | React.ComponentProps<typeof Feather>['name']
    | React.ComponentProps<typeof Ionicons>['name']
    | React.ComponentProps<typeof MaterialCommunityIcons>['name']
  type: 'feather' | 'material' | 'ionicons' | 'material-community-icon'
  // The icon library to use
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  const renderIcon = () => {
    switch (type) {
      case 'material':
        return (
          <MaterialIcons
            color={color}
            size={size}
            name={MAPPING[name as IconSymbolName]}
            style={style}
          />
        )
      case 'feather':
        return (
          <Feather
            color={color}
            size={size}
            name={name as React.ComponentProps<typeof Feather>['name']}
            style={style}
          />
        )
      case 'ionicons':
        return (
          <Ionicons
            color={color}
            size={size}
            name={name as React.ComponentProps<typeof Ionicons>['name']}
            style={style}
          />
        )
      case 'material-community-icon':
        return (
          <MaterialCommunityIcons
            color={color}
            size={size}
            name={
              name as React.ComponentProps<
                typeof MaterialCommunityIcons
              >['name']
            }
            style={style}
          />
        )
      default:
        return (
          <MaterialIcons
            color={color}
            size={size}
            name={MAPPING[name as IconSymbolName]}
            style={style}
          />
        )
    }
  }

  return renderIcon()
}
