import { Image, SafeAreaView, 
        StyleSheet, 
        Text,
        TextInput,
        TouchableOpacity,
        View } from "react-native"
import forgotgroup from '../assets/images/forgotgroup.png';

export const ForgotPassword = ({navigation}:any) => {
    const maximumCodeLength = 6;

    const press_submit = () => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        
        // navigation.navigate("PasswordVerification");
    }

    return (
        <SafeAreaView style={Styles.main}>

            <View>
                <View style={{height:274, width: 263, alignSelf: 'center', top:"30%"}}>
                    <Image source={forgotgroup}/>
                </View>
            </View>

            <View>

                <Text style={Styles.text_style}>
                    Verify Your Account
                </Text>
                <Text style={Styles.comment_style}>
                    Please check your email, we have just sent OTP.
                </Text>

                <View style={Styles.input}>
                    <TextInput style={Styles.placeholder} placeholder="Email"/>
                </View>

                <View>
                </View>

                <View style={{alignItems: 'center', backgroundColor: 'white'}}>
                    <TouchableOpacity onPress={press_submit}>
                        <Text style={Styles.button_submit}> 
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>


                

            </View>
    
        </SafeAreaView>
    )
}


const Styles = StyleSheet.create({
    main:{
        backgroundColor: 'white',
        height: "100%"
    },
    text_style: {
        marginTop: "25%",
        color:'#171C15', 
        height: 49,
        textAlign: 'center', 
        fontFamily:'Nunito', 
        fontSize: 36, 
        fontStyle: 'normal', 
        fontWeight: '700'
    },
    comment_style:{
        marginTop: "2%",
        height: 20,
        width: 387,
        color: '#989898',
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500'
    },
    input: {
        width: 370,
        height: 52,
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
        textAlign: 'center' ,
        marginTop: "10%",
        marginLeft: "5%"
    },
    placeholder: {
        color: '#171C15',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 20
    },
    button_submit: {
        marginTop: "7%",
        width: 378,
        textAlign:'center',
        justifyContent:'center',
        alignItems: 'center',
        padding: 15,
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500',
        height: 56,
        borderRadius: 40,
        backgroundColor: '#388847',
    },
})