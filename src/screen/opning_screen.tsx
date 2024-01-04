
import { SafeAreaView,
        View, Image, ImageBackground } from "react-native";

import opning_logo from '../assets/images/opningscreen.png';
import app_logo from '../assets/images/opning_logo.png';

import { useEffect } from "react";



export const Opning_screen = ({ navigation }: any) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Login");
        }, 2000);
    }, [])

    return (

        <SafeAreaView>
            <ImageBackground source={opning_logo} style={{height: "100%"}}>
                <View style={{justifyContent: 'center', alignItems:'center', height: "100%"}}>
                    <Image source={app_logo}/>
                </View>
            </ImageBackground>
        </SafeAreaView>

    )

}


