import {
    SafeAreaView,
    View,
    Image,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    ToastAndroid
} from "react-native"
import {FloatingLabelInput} from 'react-native-floating-label-input';
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axiosInstance from '../config/axiosInstance';
import { LOGIN } from "../config/apiConstant";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

export const Login = ({ navigation }: any) => {

    useEffect( () => {
        AsyncStorage.clear();
    }, [])

    const [logindata, SetLogindata] = useState<any>({});
    const [loader, SetLoader] = useState<boolean>(false);
    
    // Validation

    type logindatatype = {
        login_email: string;
        login_password: string;
    }

    const [errors, Seterrors] = useState<logindatatype>({
        login_email:"",
        login_password:""
    })

    const validation_login = () => {
        let isError = false;
        let error_login_obj = {}
        let errors = {}

        if (!logindata.login_email) {
            isError = true;
            errors = {...errors, login_email:" Please Enter Valid Email !!"}
        } else {
            errors = {...errors, login_email:" "}
        }

        if (!logindata.login_password) {
            isError = true;
            errors = { ...errors, login_password:" Please Enter Password !!"}
        } else {
            errors = { ...errors, login_password:" "}
        }

        error_login_obj = {errors, isError}

        return error_login_obj;
    }

    const press_forgot_password = () => {
        navigation.navigate('ForgotPassword');
    }

    const handlelogindata = (val: any, key: string) => {
        SetLogindata({ ...logindata, [key]: val })
    }


    const onpress_login = async() => {
        const {isError, errors} : any = validation_login();
        Seterrors(errors);
        if (!isError) {
            try { 
                SetLoader(true);
                const email = logindata.login_email
                let passwordBuff = Buffer.from(logindata.login_password).toString("base64");
    
                    const login_data = {
                        email: email,
                        password: passwordBuff,
                        type: 'front'
                    }
    
                let apiUrl = LOGIN;
                const response = await axiosInstance.post(apiUrl, login_data);
                if (response.data.token) {
                        const token = response.data.token;
                        const user_name = response.data.user_data.first_name;
                        const photo = response.data.user_data.photo;
                    
                        await AsyncStorage.setItem('token', token);
                        await AsyncStorage.setItem('user_name', user_name);
                        await AsyncStorage.setItem('user_photo', photo);
    
                        const user_datats = JSON.stringify(response.data.user_data)
    
                        await AsyncStorage.setItem('user_datats', user_datats)
        
                        navigation.navigate('Navigate_Home');
                    }
                    if (response.data) {
                        ToastAndroid.showWithGravityAndOffset(
                            'Log in SuccesFully !!',    
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                            25,
                            50
                        );
                        
                    } 
                    SetLoader(false);
                } catch (error) {
                    ToastAndroid.showWithGravityAndOffset(
                        'Something went wrong !! ',    
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                        25,
                        50
                    );
                }
        }
       
        }

    return (

       <SafeAreaView style={Styles.main}>
            <ScrollView>
                <View style={{alignItems: 'center', marginTop: 100}}>
                    <Image source={require('../assets/images/swarnim_logo.png')}/>
                </View>
                {/* <View>
                    <View style={{ height: 274, width: 263, alignSelf: 'center', marginTop: "10%" }}>
                        <Image source={login_image} />
                    </View>
                </View> */}
                <View style={{marginTop: 100}}>
                    <Text style={{ textAlign: 'center', fontSize: 36, color: '#171C15', fontWeight: '700' }}>
                        Login Now
                    </Text>

                    <Text style={{ color: '#989898', textAlign: 'center', fontFamily: 'Montserrat', fontSize: 16, fontStyle: 'normal', fontWeight: 'bold', marginTop: "2%", marginBottom: "5%" }}>
                        Please enter the detail below to contiue.
                    </Text>
                    <View style={{marginLeft :20, marginRight: 20, backgroundColor: '#F2F2F2', marginTop: 20}}>
                        <FloatingLabelInput 
                            label={'Email'}
                            value={logindata.login_email}
                            onChangeText={(val) => handlelogindata(val, "login_email")} 
                            staticLabel
                            inputStyles={Styles.inputstyles}
                            containerStyles={{borderWidth: 2,
                                borderTopWidth: 2,
                                borderBottomWidth: 2,
                                height:60,
                                backgroundColor: 'white',
                                }}
                            labelStyles={Styles.labelStyle}
                            customLabelStyles={{
                                fontSizeBlurred: 15,
                                colorFocused: 'black',
                                fontSizeFocused: 12, 
                            }}
                        />
                    </View>
                    {errors.login_email ? <View><Text style={{marginLeft:"5%", fontFamily:'Montserrat', position: 'absolute'}}>{errors.login_email}</Text></View> : null}
                    <View style={{marginTop: 40, marginLeft :20, marginRight: 20, backgroundColor: '#F2F2F2'}}>
                        <FloatingLabelInput 
                                label={'Password'}
                                isPassword
                                value={logindata.login_password}
                                onChangeText={(val) => handlelogindata(val, "login_password")} 
                                customShowPasswordComponent={<View style={{marginRight:10}}><Text><Feather
                                    name="eye" size={25} color='black'
                                /></Text></View>}
                                customHidePasswordComponent={<View style={{marginRight:10}}><Text><Feather
                                    name="eye-off" size={25} color='black'
                                /></Text></View>}
                                staticLabel
                                inputStyles={Styles.inputstyles}
                                containerStyles={{borderWidth: 2,
                                    borderTopWidth: 2,
                                    borderBottomWidth: 2,
                                    height:60,
                                    backgroundColor: 'white',
                                }}
                                labelStyles={Styles.labelStyle}
                                customLabelStyles={{
                                    fontSizeBlurred: 15,
                                    colorFocused: 'black',
                                    fontSizeFocused: 12, 
                                }}
                            />
                    </View>

                    {errors.login_password? <View><Text style={{marginLeft:"5%", fontFamily:'Montserrat', position: 'absolute'}}>{errors.login_password}</Text></View> : null}
                    <View style={{ marginTop: "4%", alignItems:'flex-end' }}>
                        <TouchableOpacity onPress={press_forgot_password}>
                            <Text style={{color: '#EA4335', fontSize: 13, fontWeight: '400', fontStyle: 'normal', textDecorationLine: "underline", fontFamily: 'Montserrat', marginRight: 20 }}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    
                    <View style={{alignItems: 'center', marginTop:30}}>
                        <TouchableOpacity style={Styles.login_button} onPress={onpress_login}>
                            <Text style={Styles.login_text}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View  style={{position: 'absolute',top: 300, left:"45%"}}>
                        {loader ?  <ActivityIndicator size="large" color="black" /> : null}
                    </View>

                </View>
            </ScrollView>
       </SafeAreaView>

    )
}



const Styles = StyleSheet.create({
    inputstyles:{
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 30 ,
        paddingTop: 15,
    },
    labelStyle:{
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 17,
    },
    main: {
        backgroundColor: 'white',
        height: "100%"
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor:"#dcdcdc"
    },
    placeholder: {
        color: '#171C15',
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 20
    },
    login_button : {
        borderWidth: 1,
        backgroundColor: '#8A963E',
        borderColor: "#FFF",
        borderRadius: 40,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        margin: 20,
        fontFamily: 'Montserrat',
        fontWeight: '500' 
    },
    login_text : {
        color: "#FFF",
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal'
    }
})


{/* <View style={{ width: 43, height: 43, left: "67%", top: "-30%" }}>
                        <Image source={login_page_1} />
                    </View>

                    <View style={{ width: 29, height: 29, right: "8%", bottom: "20%", top: "-20%" }}>
                        <Image source={login_page_2} />
                    </View>

                    <View style={{ width: 26, height: 25, position: 'absolute', top: "24%", left: "-12%" }}>
                        <Image source={login_page_3} />
                    </View>

                    <View style={{ width: 26, height: 25, top: "-73%", left: "65%" }}>
                        <Image source={login_page_4} />
                    </View>

                    <View style={{ width: 43, height: 43, left: "60%", top: "-28%" }}>
                        <Image source={login_page_5} />
                    </View>

                    <View style={{ width: 43, height: 43, left: "68%", top: "-20%" }}>
                        <Image source={login_page_6} />
                    </View> */}





                    // console.log(">>>>>>>>>>>>>>>>>>>>>APP_BASE_URL", APP_BASE_URL, LOGIN);
            // console.log(">>>>>>>>>>>>>>>>>>>>>LOGIN", LOGIN);


            
            // const response = await axios.post(APP_BASE_URL + LOGIN, login_data, {
            //     headers: { 'Content-Type': 'application/json' },
            // });