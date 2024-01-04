import { SafeAreaView, 
        View,
        Text, 
        Image,
        StyleSheet,
        TextInput,
        TouchableOpacity} from "react-native"
import pass_validation from '../assets/images/passwordvalidation.png';


export const PasswordVerification = () => {
    return (
        <SafeAreaView style={Styles.main}>

            <View style={{marginTop: "20%", marginLeft: "5%"}}>
                <Image source={pass_validation}/>
            </View>

            <View>
                <Text style={{color: '#171C15', textAlign: 'center', fontSize: 36, fontWeight: '700', marginTop: "3%"}}>
                    New Password
                </Text>
                <Text style={{color:'#989898', fontSize: 16, fontWeight: '500', width: 378, marginLeft: "5%", marginTop: "3%"}}>
                    Your password must be contains at least 8 digit long.
                </Text>
            </View>

            <View style={Styles.input}>
                <TextInput style={Styles.placeorder} placeholder="New Password"/>
            </View>

            <View style={Styles.input}>
                <TextInput style={Styles.placeorder} placeholder="Confirm New Password"/>
            </View>

            <View>
                <TouchableOpacity style={{padding:20}}>
                    <Text style={Styles.reset_button}>Reset</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}


const Styles = StyleSheet.create({
    main:{
        backgroundColor: 'white',
        height: "100%"
    },
    input: {
        marginTop: "5%",
        width: 375,
        height: 52,
        borderWidth: 0.8,
        borderRadius: 10,
        marginLeft: "5%"
    },
    placeorder:{
        marginLeft: "5%",
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#171C15',
    },
    reset_button:{
        padding: 20,
        marginTop: 10,
        textAlign:'center', 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:'#388847', 
        borderRadius:18, 
        paddingTop: 18, 
        paddingBottom: 18, 
        paddingRight: 165, 
        paddingLeft: 165, 
        color: 'white', 
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontStyle: 'normal',
        fontSize: 16,
    }
})