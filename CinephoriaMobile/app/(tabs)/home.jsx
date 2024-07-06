import { View, Text, SafeAreaView, FlatList, ImageBackground, RefreshControl, Image } from 'react-native'
import React, { useState } from 'react'

import EmptyState from '../../components/EmptyState'
import MovieCard from '../../components/MovieCard'

import icons from '../../constants/icons'


const Home = () => {
  const [data,setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  }

  return (
    <ImageBackground
    source={require('../../assets/images/bg.jpg')}
    resizeMode="cover"
    className="flex-1 h-full"
    >
      <SafeAreaView className="h-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <FlatList
          data={[{ id: 1}, { id: 2}, { id: 3}]}
          keyExtractor={(item) => item.$id}
          renderItem={( {item} ) => (
            <MovieCard movie={item} />
          )}
          ListHeaderComponent={() => (
            <View className="my-10 px-4 space-y-6">
              <View className="mb-6">
                <Image source={icons.exit} className="w-8 h-8 mb-5" />
                  <View>
                    <Text className="font-medium text-white text-center text-xl font-arvo">
                      Séances à venir
                    </Text>
                  </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="Aucune réservation trouvée"
              subtitle="Aucune réservation n'a été éffectuée"
            />
          )}
          refreshControl={<RefreshControl refreshing=
            {refreshing} onRefresh={onRefresh}/>}
          />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Home