import { SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
     } from "react-native"

export const Stock = ({ navigation }: any) => {
    const press_back = () => {
        navigation.navigate('Home');
    }


    return (
        <SafeAreaView>
            
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: "5%", marginBottom: "2%"}}>
                <View style={{width: "15%", alignItems: 'center'}}>
                    <TouchableOpacity onPress={press_back}>
                        <Image source={require('../../assets/images/backicon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{width: "75%", alignItems:'center'}}>
                <Text style={{color:'#202020', fontSize: 20, fontWeight: '600', fontFamily:'Montserrat'}}>Stock</Text>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

