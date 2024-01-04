import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native"

import { DrawerActions } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Timerclock = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
                <View style={{ width: "15%", alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <AntDesign
                            name="menu-fold" size={25} color='#247401'
                        />
                        {/* <Image style={{ width: 20, height: 20 }} source={require('../assets/images/drawer.png')} /> */}
                    </TouchableOpacity>
                </View>
                <View style={{ width: "75%", alignItems: 'center' }}>
                    <Text style={{ color: '#247401', fontSize: 20, fontWeight: '500', fontFamily: 'Montserrat' }}>TimerClock</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}