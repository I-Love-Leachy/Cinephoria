import { View, Text, SafeAreaView, ScrollView, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'

import { images } from '../../constants';
import FormField from '../../components/FormField';

const SignIn
 = () => {

  const [form, setForm] = useState({
    email:'',
    password:''
  })

  return (
    <ImageBackground
        source={require('../../assets/images/bg.jpg')}
        resizeMode="cover"
        className="flex-1 h-full"
      >
      <SafeAreaView className="h-full" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <ScrollView>
          <View className="w-full justify-center h-full px-4 my-6">

            <Image 
            source={images.logo}
            className="w-[100px] h-[110px]"
            resizeMode="contain"/>

            <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
            />

            <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default SignIn
