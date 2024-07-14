import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.7}
    className={`${isLoading ? 'opacity-50' : ''}`}
    disabled={isLoading}
    >
      
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}

    </TouchableOpacity>
  )
}

export default CustomButton