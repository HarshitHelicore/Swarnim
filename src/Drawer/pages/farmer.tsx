import { SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text
     } from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { SelectList } from 'react-native-dropdown-select-list'

export const Farmer = ({ navigation }: any) => {

    const press_back = () => {
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', height: "100%"}}>
            <ScrollView>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: "5%", marginBottom: "2%"}}>
                <View style={{width: "15%", alignItems: 'center'}}>
                    <TouchableOpacity onPress={press_back}>
                        <Image source={require('../../assets/images/backicon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{width: "75%", alignItems:'center'}}>
                    <Text style={{color:'#202020', fontSize: 20, fontWeight: '500'}}>Farmer Form</Text>
                </View>
            </View>


           
                <View style={Styles.text_field}>
                <TextInput style={Styles.placeorder}
                        placeholder="First Name"
                />    
                </View>

                <View style={Styles.text_field}>
                <TextInput style={Styles.placeorder}
                        placeholder="Last Name"
                />    
                </View>

                <View style={Styles.text_field}>
                <TextInput style={Styles.placeorder}
                        placeholder="Email Address"
                />    
                </View>

                <View style={Styles.text_field}>
                <TextInput style={Styles.placeorder}
                        placeholder="Phone Number"
                />    
                </View>

                <View style={Styles.text_field}>
                <TextInput style={Styles.placeorder}
                        placeholder="Farming Area"
                />    
                </View>

                <View style={Styles.text_field}>
                <TextInput style={Styles.placeorder}
                        placeholder="Crop Name"
                />    
                </View>

                <View style={Styles.text_field}>
                <TextInput style={Styles.placeorder}
                        placeholder="Pesticide"
                />    
                </View>

                <View style={Styles.text_field}>
                <TextInput style={Styles.placeorder}
                        placeholder="Address"
                />    
                </View>

                <View style={Styles.text_field}>
                    <TextInput style={Styles.placeorder}
                        placeholder="Village"
                />  
                </View>

                </ScrollView>

        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    main: {
        backgroundColor:'white', 
        height:"100%"
    }, 
    text_field:{
        height: 52,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 0.8, 
        borderColor: '#F9F9F9', 
        backgroundColor:'#F9F9F9', 
        borderRadius: 10
    },
    placeorder:{
        color: '#2C2B2B',
        fontSize: 16,
        padding:10,
        fontWeight: '500',
        fontStyle: 'normal',
        fontFamily: 'Montserrat'
    }
})