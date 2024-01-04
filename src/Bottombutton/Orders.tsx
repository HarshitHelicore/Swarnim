import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity, Image
} from "react-native"
import { DrawerActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Orders = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>
            <View style={{ margin: 10, marginTop: 10 }}>
                <View style={{ width: "100%", flexDirection: 'row' }}>
                    <View style={{ width: "10%", alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <AntDesign
                                name="menu-fold" size={25} color='#247401'
                            />
                            {/* <Image style={{ width: 20, height: 20 }} source={require('../assets/images/drawer.png')} /> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "79%", alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#247401', fontSize: 20, fontWeight: '500', fontFamily: 'Montserrat' }}>Orders</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        height: 50,
    },
    subContainer: {
        flex: 1,
        justifyContent: "center",
    },
    titleText: {
        //   fontSize: GlobalTextSize.text20,
        //   color: GlobalTextColors.textMain,
        fontWeight: "600",
        textAlign: "center",
    },
});