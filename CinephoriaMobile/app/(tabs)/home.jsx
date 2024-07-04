import { View, Text, SafeAreaView, FlatList, ImageBackground } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <ImageBackground
    source={require('../../assets/images/bg.jpg')}
    resizeMode="cover"
    className="flex-1 h-full"
    >
      <SafeAreaView className="h-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <FlatList
          data={[ {id: 1}, {id: 2}, {id: 3}]}
          keyExtractor={(item) => item.$id}
          renderItem={( {item} ) => (
            <Text className="text-3xl text-white">{item.id}</Text>
          )}
          ListHeaderComponent={() => (
            <View className="my-10 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                  <View>
                    <Text className="font-pmedium text-sm text-white">
                      Séances à venir
                    </Text>
                  </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text className="text-white">Empty</Text>
          )}
          />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Home