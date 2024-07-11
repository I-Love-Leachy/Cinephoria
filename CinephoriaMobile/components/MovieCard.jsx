import { View, Text, Image, Modal, Pressable, Button, ImageBackground, ActivityIndicator } from 'react-native';
import {React, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import images from '../constants/images';
import icons from '../constants/icons';

const MovieCard = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePress = async () => {
        setLoading(true);
        try {
            // Remplacez l'URL ci-dessous par l'URL de votre API
            const response = await fetch('https://www.google.com');
            const data = await response.json();
            // Suppose que data contient les informations de réservation nécessaires
            const reservationInfo = data.reservationId; // Ajustez en fonction de votre API
            setQrCodeValue(`https://yourexternalpage.com/reservation/${reservationInfo}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setIsModalVisible(true);
        }
    };
  return (
    <View className="flex-col items-center mb-14 bg-deepBlue">

        <View className="flex-row items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-full h-60">
                    <Image source={images.fallGuyBan} className="w-full h-full" resizeMode="cover"/>
                </View>
            </View>

            <Pressable 
            onPress={handlePress}>
                <View className="absolute right-4 top-4">
                        <Image source={icons.qr} className="w-8 h-8" />
                </View>
            </Pressable>
        </View>

        <View className="flex-col items-center px-4">

            <View className="flex-row mt-3 items-start">
                <View className="justify-start items-center flex-row flex-1">
                    <Text className="text-lg font-bold text-white">FALL GUY • 1h31 • Science-fiction </Text>
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
                    <Text className="text-lg font-semibold text-white">SIEGE • B15</Text>
                        <View className="bg-goldOne w-20 h-7 rounded-sm ml-52">
                        <Text className="text-lg font-semibold text-white text-center my-auto mx-auto">SALLE  8</Text>
                        </View>
                </View>
            </View>

        <Modal 
        visible={isModalVisible}
        animationType='slide'
 
        >
            <ImageBackground
            source={require('../assets/images/bg.jpg')}
            resizeMode="cover"
            className="flex-1 h-full"
            >
                <View className="flex-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View>
                        {loading ? (
                            <ActivityIndicator size="large" color="#E3B04B" />
                        ) : (
                            qrCodeValue && (
                                <QRCode
                                    value={qrCodeValue}
                                    size={200}
                                    backgroundColor="white"
                                    color="black"
                                    style={{ marginBottom: 20 }}
                                />
                            )
                        )}
                        <Button 
                        title="FERMER"
                        color="#E3B04B"
                        className="font-arvoBold font-semibold"
                        onPress={() => {
                            setIsModalVisible(false);
                        }}
                        style={{ }}
                        ></Button>
                    </View>
                </View>
            </ImageBackground>
        </Modal>

        </View>
    </View>
  )
}

export default MovieCard