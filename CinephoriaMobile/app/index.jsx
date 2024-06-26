import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';


export default function App() {

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Open up App.js to start working on your app!</Text>
      <Text className="text-3xl font-arvo">Open up App.js to start working on your app!</Text>
      <Link href="/profile" style={{ color: 'blue'}}>Go to Profile</Link>
      <StatusBar style="auto" />
    </View>
  );
}
