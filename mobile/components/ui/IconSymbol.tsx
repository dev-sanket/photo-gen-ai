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
  'house.fill': 'home-filled',
  house: 'home-filled',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'person.circle.fill': 'person',
  'person.circle': 'person',
  plus: 'add',
  gift: 'card-giftcard',
  'photo.fill': 'image',
  'pencil.and.ellipsis.rectangle': 'edit-document',
  minus: 'remove',
  'arrow.backward': 'arrow-back',
  'arrow.forward': 'arrow-forward',
  'chevron.left': 'chevron-left',
  'camera.fill': 'photo-camera',
  'square.stack': 'grid-view',
  'square.stack.fill': 'grid-view',
  'wand.and.stars': 'auto-awesome',
  'wand.and.stars.inverse': 'auto-awesome'
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
  size = 24,
  color,
  style
}: {
  name: IconSymbolName

  // The icon library to use
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name as IconSymbolName]}
      style={style}
    />
  )
}
