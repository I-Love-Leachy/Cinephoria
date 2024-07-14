import { View, Text, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';

import { images } from '../../constants';
import FormField from '../../components/FormField';

import CustomButton from '../../components/CustomButton';

const SignIn
 = () => {

  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const submit = () => {}

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <ImageBackground
        source={require('../../assets/images/bg.jpg')}
        resizeMode="cover"
        className="flex-1 h-full"
      > 
      <SafeAreaView className="h-full items-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">

            <Image 
            source={images.logo}
            className="w-[100px] h-[120px] mx-auto mt-20"
            resizeMode="contain"/>

            <FormField
            placeholder="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-20"
            keyboardType="email-address"
            />

            <FormField
            placeholder="Mot de passe"
            otherStyles="mt-4"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            />

            <TouchableOpacity onPress={() => router.push('/home')}>
              <CustomButton
              title="Connexion"
              handlePress={submit}
              containerStyles="mt-16"
              isLoading={isSubmitting}
              />
            </TouchableOpacity>

            <View className="justify-center items-center mt-12">
              <Text className="font-arvo font-arvo-bold text-white">Mot de passe oublié ?</Text>

              <Text className="text-white text-xxs text-center opacity-50 mt-32">2000-2024 © Cinéphoria</Text>
            </View>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default SignIn
