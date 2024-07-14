import { View, Text } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeholde, handleChangeText, otherStyles, ...props}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-white">{title}</Text>
      <View className=" bg-white rounded-lg w-[70vw] h-14 px-4 bg-black-100 items-center"></View>
    </View>
  )
}

export default FormField