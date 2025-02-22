import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconSymbol, IconSymbolName } from './ui/IconSymbol'

interface IconButtonProps {
  name: IconSymbolName;
  size?: number;
  color?: string;
  style?: object;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ name, size = 24, color = '#fff', style = {}, onPress }) => {
  return (
    <TouchableOpacity 
          style={{
            borderWidth: 1,
            borderColor:'rgba(42, 42, 42, 0.2)',
            alignItems:'center',
            justifyContent:'center',
            width:100,
            height:100,
            backgroundColor:'#fff',
            borderRadius:50,
            ...style,
      }}
      onPress={onPress}
    >
    <IconSymbol name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}

export default IconButton