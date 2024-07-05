import { View, Text, Image } from 'react-native'
import React from 'react'

import images from '../constants/images'

const MovieCard = () => {
  return (
    <View className="flex-col items-center mb-14 bg-deepBlue">

        <View className="flex-row items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-full h-60">
                    <Image source={images.fallGuyBan} className="w-full h-full" resizeMode="cover"/>
                </View>
            </View>

            <View className="w-full h-60">
                    <Image source={images.fallGuyBan} className="w-full h-full" resizeMode="cover"/>
            </View>
        </View>

        <View className="flex-col items-center px-4">

            <View className="flex-row mt-3 items-start">
                <View className="justify-start items-center flex-row flex-1">
                    <Text className="text-lg font-semibold text-white">BLADE RUNNER • 1h31 • Science-fiction </Text>
                </View>
            </View>

            <View className="flex-row mt-2 items-start">
                <View className="justify-start items-center flex-row flex-1">
                    <Text className="text-lg font-semibold text-white">SEANCE DU • Mar. 7 Mai   </Text>
                </View>
            </View>

            <View className="flex-row mt-2 items-start">
                <View className="justify-start items-center flex-row flex-1">
                    <Text className="text-lg font-semibold text-white">CINEMA • Les Halles • de  19 : 45 à 21 : 36 </Text>
                </View>
            </View>

            <View className="flex-row items-start mt-2 mb-4">
                <View className="justify-start items-center flex-row flex-1">
                    <Text className="text-lg font-semibold text-white">Siège • B15</Text>
                        <View className="bg-goldOne w-20 h-7 rounded-sm ml-52">
                            <Text className="text-lg font-semibold text-white text-center my-auto mx-auto">SALLE  8 </Text>
                        </View>
                </View>
            </View>

        </View>
    </View>
  )
}

export default MovieCard