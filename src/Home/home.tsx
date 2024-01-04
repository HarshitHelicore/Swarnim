import {
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView, TouchableOpacity, TextInput, AppState
} from "react-native"
import { PermissionsAndroid } from 'react-native';

import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Attendance_Details, DASHBOARD } from "../config/apiConstant";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_BASE_URL } from "../setting/setting";
import axios from "axios";
import { Expense } from "../Drawer/pages/Expense/expense";

import { Dialog, Portal } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dropdown } from 'react-native-element-dropdown';

import { DrawerActions } from "@react-navigation/native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchCamera, ImagePickerResponse } from 'react-native-image-picker';
// import GetLocation, {
//     Location,
//     LocationErrorCode,
//     isLocationError,
// } from 'react-native-get-location';

import Geolocation from '@react-native-community/geolocation';
import { log } from "react-native-reanimated";
import axiosInstance from '../config/axiosInstance';

import BackgroundService from 'react-native-background-actions';



// TESTING
// import BackgroundFetch from "react-native-background-fetch";
// import BackgroundService from 'react-native-background-actions';
import { ToastAndroid } from "react-native";

// import ReactNativeForegroundService from '@supersami/rn-foreground-service';
// import Locations from 'react-native-location';

import BackgroundGeolocation, {
    State,
    Config,
    Location,
    LocationError,
    Geofence,
    GeofenceEvent,
    GeofencesChangeEvent,
    HeartbeatEvent,
    HttpEvent,
    MotionActivityEvent,
    MotionChangeEvent,
    ProviderChangeEvent,
    ConnectivityChangeEvent
} from "react-native-background-geolocation";





export const Home = ({ navigation }: any) => {











    BackgroundGeolocation.getCurrentPosition(options);
    BackgroundGeolocation.start();

    BackgroundGeolocation.ready(config).then((state) => {
        // YES -- .ready() has now resolved.
        BackgroundGeolocation.getCurrentPosition(options);
        BackgroundGeolocation.start();
    });

    // NO!  .ready() has not resolved.
    BackgroundGeolocation.getCurrentPosition(options);
    BackgroundGeolocation.start();

    BackgroundGeolocation.ready({
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH, 
        distanceFilter: 50
      }).then(state => {
        console.log('- BackgroundGeolocation is ready: ', state);
      }).catch(error => {
        console.warn('- BackgroundGeolocation error: ', error);
      });
      
      // Or use await in an async function
      try {
        const state = await BackgroundGeolocation.ready({
          desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH, 
          distanceFilter: 50
        })
        console.log('- BackgroundGeolocation is ready: ', state);
      } catch (error) {
        console.warn('- BackgroundGeolocation error: ', error);
      }


    const tracklocation = async () => {

        const demo = BackgroundService.isRunning();
        console.log('>>>>>>>>>>. demo', demo);


        // await new Promise(async () => {
        //     console.log("click");
        for (let i = 1; BackgroundService.isRunning(); i++) {
            console.log(">>>>>>>>>>send LOCATION SUCCCSDC...............");

            // await sleep(20000);
        }
        // });
    };

    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>Locations",Locations)

    // Locations?.configure({
    //     distanceFilter: 100, // Meters
    //     desiredAccuracy: {
    //       android: 'balancedPowerAccuracy',
    //     },
    //     // Android only
    //     androidProvider: 'auto',
    //     interval: 5000, // Milliseconds
    //     fastestInterval: 10000, // Milliseconds
    //     maxWaitTime: 5000, // Milliseconds

    //   });
    //   let locationSubscription:any = null;
    //   let locationTimeout:any = null;

    //   ReactNativeForegroundService.add_task(
    //     () => {
    //       Locations?.requestPermission({
    //         ios: 'whenInUse',
    //         android: {
    //           detail: 'fine',
    //         },
    //       }).then((granted) => {
    //         console.log('Location Permissions: ', granted);
    //         // if has permissions try to obtain location with RN location
    //         if (granted) {
    //           locationSubscription && locationSubscription();
    //           locationSubscription = Locations?.subscribeToLocationUpdates(
    //             ([locations]) => {
    //               locationSubscription();
    //               locationTimeout && clearTimeout(locationTimeout);
    //               console.log("...................................",locations);
    //             },
    //           );
    //         } else {
    //           locationSubscription && locationSubscription();
    //           locationTimeout && clearTimeout(locationTimeout);
    //           console.log('no permissions to obtain location');
    //         }
    //       });
    //     },
    //     {
    //       delay: 1000,
    //       onLoop: true,
    //       taskId: 'taskid',
    //       onError: (e) => console.log('Error logging:', e),
    //     },
    //   );

    const dashboard_data = {
        order_count: "",
        total_amount: ""

    }
    const data = [
        { label: 'Company Vehicle', value: 'company_vehicle' },
        { label: 'Personal Vehicle', value: 'personal_vehicle' },
    ];
    const [userdata, Setuserdata] = useState<any>();
    const [dashboard, Setdashboard] = useState<any>();
    const [username, SetUsername] = useState<string>();
    const [loader, SetLoader] = useState<boolean>(false);
    const [token, Settoken] = useState<string>();
    const [profile_image, SetProfileImage] = useState<string>();
    const [visible1, setVisible1] = useState(false);
    const [startdialod, Setstartdialog] = useState(false);

    // DIALOG DATA

    const [dialog_photo, SetDialog_photo] = useState<any>();
    const [dialog_name, SetDialogName] = useState<string>();
    const [dialog_phone, SetDialogPhone] = useState<any>();
    const [dialog_email, SetDialogEmail] = useState<any>();
    const [imageUri, setImageUri] = useState<string | null>(null);

    const [attendancedata, Setattendancedata] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<LocationErrorCode | null>(null);

    const [CurrentLocation, SetCurrentLocation] = useState<any>();
    const [vehicle_type, SetVehicleType] = useState<any>();

    const [isBackground, setisBackground] = useState<boolean>(false);

    const handlelocatio = (info: any) => {
        {
            !window.cn(info) && info &&
                SetCurrentLocation(info);
            // send_location();
        }
    }

    // AppState.addEventListener('change', state => {


    //     if (state === 'active') {
    //         console.log("APP IS RUNNUNG")
    //         setisBackground(false);
    //         run_background();
    //     } else if (state === 'background') {

    //         console.log("dddd");

    //         setisBackground(true);
    //         run_background();
    //     } else if (state === 'inactive') {
    //         console.log("APP IS RUNNUNG Inactivesss")
    //     }
    // });

    const requestLocation = async () => {
        setLoading(true);
        setLocation(null);
        setError(null);

        // GetLocation.getCurrentPosition({
        //     enableHighAccuracy: true,
        //     timeout: 30000,
        //     rationale: {
        //         title: 'Location permission',
        //         message: 'The app needs the permission to request your location.',
        //         buttonPositive: 'Ok',
        //     },
        // })

        const current_loction = Geolocation.getCurrentPosition(info => handlelocatio(info));
    }





    const send_location = async () => {
        let formData: any = new FormData();
        {
            !window.cn(CurrentLocation) && CurrentLocation && imageUri &&
                formData.append("latitude", CurrentLocation?.coords?.latitude);
            formData.append("longitude", CurrentLocation?.coords?.longitude);
            formData.append("start_image", imageUri);
            formData.append("vehicle_type", "");
        }
        try {

            console.log(">>>>>>>>>>>>>.LOCATION SEND SUCC.....");

            // let Attendance = Attendance_Details;
            // const response = await axiosInstance.post(Attendance, formData);
            // if (response.data) {
            //     ToastAndroid.showWithGravityAndOffset(
            //         response.data.message,
            //         ToastAndroid.SHORT,
            //         ToastAndroid.CENTER,
            //         25,
            //         50
            //     );
            // }


        } catch (error) {
            console.log("dsncdkjscn");

            ToastAndroid.showWithGravityAndOffset(
                'Something went wrong!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                25,
                50,
            );
        }
    }


    // const MINUTE_MS = 1000;
    // const run_background = () => {

    //     if (isBackground) {
    //         console.log("running back");


    //         const interval = setInterval(() => {
    //             // send_location();
    //             console.log("done");

    //         }, MINUTE_MS);

    //         return () => clearInterval(interval);
    //     }

    // }

    // 300000
    // const MINUTE_MS = 1000;

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         send_location();
    //         console.log("done");

    //     }, MINUTE_MS);

    //     return () => clearInterval(interval);
    // }, [isBackground])

    const get_dashboard_data = async () => {
        SetLoader(true);
        console.log("cd;sllkdscn");

        const user_token: any = await AsyncStorage.getItem('token');
        const user_name: any = await AsyncStorage.getItem('user_name');
        // const user_photo: any = await AsyncStorage.getItem('user_photo');

        const user_datas: any = await AsyncStorage.getItem('user_datats');
        const demo_user_datas = JSON.parse(user_datas)

        user_token ? Settoken(user_token) : Settoken("");
        user_name ? SetUsername(user_name) : SetUsername("");

        if (demo_user_datas && demo_user_datas.photo) {
            SetProfileImage(demo_user_datas.photo)
        } else {
            SetProfileImage("");
        }

        // SET DIALOG DATA 
        const full_name = demo_user_datas.first_name + " " + demo_user_datas.last_name
        demo_user_datas ? SetDialog_photo(demo_user_datas.photo) : SetDialog_photo("");
        demo_user_datas ? SetDialogName(full_name) : SetDialogName("");
        demo_user_datas ? SetDialogPhone(demo_user_datas.mobile) : SetDialogPhone("");
        demo_user_datas ? SetDialogEmail(demo_user_datas.email) : SetDialogEmail("");


        try {
            const response = await axios.get(APP_BASE_URL + DASHBOARD, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user_token
                },
            });
            Setdashboard(response.data.data);
            // const user_login_data = JSON.stringify(response.data.data)
            // await AsyncStorage.setItem('user_login_data', user_login_data )
            SetLoader(false);
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(
                'Something went wrong!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                25,
                50,

            );
        }
    }
    // var geolocation = require('geolocation')
    // const requestLocationPermission = async () => {
    //     let geoOptions = {
    //         enableHighAccuracy: true,
    //         timeout: 20000,
    //         maximumAge: 60 * 60 * 24
    //     }

    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             {
    //                 title: 'Location Access Required',
    //                 message:'This App needs to Access your location',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             },
    //         );
    //         console.warn(granted);
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             navigator.geolocation.getCurrentPosition(geoLocationSuccess, geolocation.geoLocationFailure, geoOptions);
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };

    // useEffect(() => {
    //     get_dashboard_data();
    // }, [])

    // useEffect(() => {
    //     requestLocationPermission();
    // }, [])

    // useEffect (() => {
    //     console.log("done");

    // }, [])

    const press_profile = () => {
        setVisible1(!visible1);
    }
    const toggleDialog1 = () => {
        setVisible1(!visible1);
    };

    const click_card = () => {
        navigation.navigate('View Orders');
    }

    const press_home_start = () => {
        // GetLocation.openSettings();
        Setstartdialog(!startdialod);
    }

    const startDialogdismiss = () => {
        setImageUri("");
        Setstartdialog(!startdialod);
    };

    const press_home_start_attendance = () => {
        // console.log("cdbshcbdshcbshbcdjb");

    }

    const handleattendancedata = (value: any) => {
        SetVehicleType(value);
    }

    // const attendance_upload_speedometer_image = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title: 'Cool Photo App Camera Permission',
    //                 message:
    //                     'Cool Photo App needs access to your camera ' +
    //                     'so you can take awesome pictures.',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             },
    //         );

    //         if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log('You can use the camera');
    //         } else {
    //             console.log('Camera permissio');
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // }

    const getImageSource = async () => {

        return (
            <Image source={require('../assets/images/homecardicon.png')} />
        )
    }

    const openCamera = (val: any) => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        };

        launchCamera(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                console.log('Camera error: ', response.errorMessage);
            } else {
                setImageUri(response?.assets[0]?.uri);
            }
        });

    };

    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.main_page}>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
                    <View style={{ width: "15%" }}>
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <View style={{ alignItems: 'center' }}>
                                <AntDesign
                                    name="menu-fold" size={25} color='#247401'
                                />
                                {/* <Image style={{ width: 20, height: 20 }} source={require('../assets/images/drawer.png')} /> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "75%", alignItems: 'center' }}>
                        <Text style={{ color: '#247401', fontSize: 20, fontWeight: '500', fontFamily: 'Montserrat' }}>Helicore</Text>
                    </View>
                </View>

                {/* LOADER */}
                {loader ?
                    <View style={{ height: "100%", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color='black' />
                    </View>
                    : null}
                {!window.cn(username) && !window.cn(profile_image) &&
                    <>
                        {/* HEADER */}
                        <View style={{ flexDirection: 'row', marginTop: "5%" }}>
                            <View style={{ width: "25%", marginLeft: "5%" }}>
                                <Text style={{ color: '#171C15', fontSize: 16, fontWeight: '500', fontStyle: 'normal', fontFamily: 'Montserrat' }}>
                                    hi,
                                </Text>
                                <Text style={{ color: '#171C15', fontSize: 24, fontWeight: '500', fontStyle: 'normal', fontFamily: 'Montserrat', width: "250%" }}>
                                    {username}
                                </Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end', width: "65%" }}>
                                <TouchableOpacity onPress={press_profile} style={styles.profile_image}>
                                    <Image
                                        style={{ width: 45, height: 50, borderRadius: 100 }}
                                        source={{
                                            uri: profile_image
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </>
                }

                {/* CONTENT */}
                <ScrollView>

                    {/* CARD */}
                    <View style={styles.card_flex}>

                        <Card style={{ backgroundColor: '#7ECD8B', marginLeft: "-5%", width: "40%" }}>
                            <Image style={{ marginLeft: "7%", marginTop: "10%" }} source={require('../assets/images/demo.jpg')} />

                            <Card.Content>
                                <Title style={{ color: 'black', fontSize: 16, fontWeight: '400', marginTop: "20%", fontFamily: 'Montserrat' }}>Orders</Title>
                                <Text style={{ color: 'black', fontSize: 24, fontWeight: '500', marginTop: "5%", fontFamily: 'Montserrat' }}>0</Text>
                            </Card.Content>

                            <Card.Content>
                                <TouchableOpacity onPress={click_card}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "10%" }}>
                                        <View>
                                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'Montserrat' }}>View Orders</Text>
                                        </View>
                                        <View style={{ marginLeft: "10%", marginTop: 3 }}>
                                            <AntDesign
                                                name="doubleright" size={15} color='black'
                                            />
                                            {/* <Image source={require('../assets/images/homecardicon3.png')} /> */}
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>

                        <Card style={{ backgroundColor: '#FFF', marginRight: "-5%", width: "40%" }}>
                            <Image style={{ marginLeft: "7%", marginTop: "10%" }} source={require('../assets/images/homecardicon2.png')} />

                            <Card.Content>
                                <Title style={{ color: '#7ECD8B', fontSize: 16, fontWeight: '400', marginTop: "20%", fontFamily: 'Montserrat' }}>Amount</Title>
                                <Text style={{ color: '#7ECD8B', fontSize: 24, fontWeight: '500', marginTop: "5%", fontFamily: 'Montserrat' }}>0</Text>
                            </Card.Content>
                        </Card>

                    </View>

                    {/* SUBMIT BUTTON */}
                    <View >
                        <TouchableOpacity onPress={press_home_start} style={{ borderRadius: 8, backgroundColor: '#388847', height: 56, margin: 20, alignItems: 'center', justifyContent: 'center', marginTop: "5%" }}>
                            <View>
                                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '500', fontStyle: 'normal', fontFamily: 'Montserrat' }}>START</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* DIALOG */}
                <Dialog
                    style={{ backgroundColor: 'white' }}
                    visible={visible1}
                    onDismiss={toggleDialog1}
                >
                    <ScrollView>

                        <Dialog.Content >
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontFamily: 'Montserrat', fontSize: 20, fontStyle: 'normal', fontWeight: 'bold', marginBottom: 10 }}>MY PROFILE</Text>
                                <Image
                                    style={styles.dialog_profile_image}
                                    source={
                                        {
                                            uri: dialog_photo
                                        }
                                    }
                                />
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.dialog_text}>
                                    Name
                                </Text>
                            </View>
                            <View style={[styles.dialog_field, { marginTop: 7 }]}>
                                <Text style={styles.dialog_input_text}>
                                    {dialog_name}
                                </Text>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.dialog_text}>
                                    Mobile Number
                                </Text>
                            </View>
                            <View style={[styles.dialog_field, { marginTop: 7 }]}>
                                <Text style={styles.dialog_input_text}>
                                    {dialog_phone}
                                </Text>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.dialog_text}>
                                    Email
                                </Text>
                            </View>
                            <View style={[styles.dialog_field, { marginTop: 7 }]}>

                                <Text style={styles.dialog_input_text}>
                                    {dialog_email}
                                </Text>
                            </View>

                        </Dialog.Content>

                    </ScrollView>
                </Dialog>

                <Dialog
                    style={{ backgroundColor: 'white', borderWidth: 0.5 }}
                    visible={startdialod}
                    onDismiss={startDialogdismiss}
                >
                    <ScrollView>

                        <Dialog.Content >
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontFamily: 'Montserrat', fontSize: 20, fontStyle: 'normal', fontWeight: 'bold', marginBottom: 10 }}>Begin Your Daily Attendance</Text>
                                <View style={{ width: "100%", borderWidth: 1 }}></View>

                                <View style={{ width: '100%' }}>
                                    <View style={{ width: "100%", height: 60, borderWidth: 1, marginTop: 20 }}>
                                        <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                            <Text style={[styles.labelStyle, { color: 'black' }]}>
                                                SELECT VEHICLE
                                            </Text>
                                        </View>
                                        <View>
                                            <Dropdown
                                                data={data}
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                itemTextStyle={{ color: 'black' }}
                                                selectedTextStyle={[styles.inputstyles, { marginTop: 20, height: 50 }]}
                                                placeholderStyle={{ marginTop: 27, height: 20, marginLeft: 25, fontStyle: 'normal', fontWeight: '400', fontSize: 14, color: '#BDBDBD' }}
                                                iconStyle={{ marginRight: 5, marginTop: 20 }}
                                                iconColor='black'
                                                placeholder="SELECT VEHICLE"
                                                searchPlaceholder="Search..."
                                                value={vehicle_type}
                                                onChange={item => handleattendancedata(item.value)}
                                            />
                                        </View>
                                    </View>
                                </View>


                                <>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ width: "100%", height: 60, borderWidth: 1, marginTop: 20 }}>
                                            <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                                <Text style={[styles.labelStyle, { color: 'black' }]}>
                                                    UPLOAD SPEEDOMETER IMAGE
                                                </Text>
                                            </View>
                                            <View style={{ width: "100%" }}>
                                                <View>
                                                    <TouchableOpacity onPress={(val) => { openCamera(val) }} style={{ borderRadius: 8, margin: 20, alignItems: 'center', justifyContent: 'center', marginTop: "5%" }}>
                                                        {imageUri ?

                                                            <View style={{ marginLeft: -140, marginTop: 5 }}>
                                                                <Text style={{ fontStyle: 'normal', fontWeight: '400', fontSize: 14, color: '#BDBDBD' }}>Change Image</Text>
                                                            </View>
                                                            :

                                                            <View style={{ marginLeft: -60, marginTop: 5 }}>
                                                                <Text style={{ fontStyle: 'normal', fontWeight: '400', fontSize: 14, color: '#BDBDBD' }}>Upload Speedometer Image</Text>
                                                            </View>
                                                        }

                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    {imageUri && (
                                        <View style={{ marginTop: 20 }}>
                                            <Image
                                                source={{ uri: imageUri }}
                                                style={{ width: 100, height: 100 }}
                                            />
                                        </View>
                                    )}
                                </>


                                <View style={{ width: "100%" }}>
                                    <TouchableOpacity onPress={tracklocation} style={{ borderRadius: 8, backgroundColor: '#388847', height: 56, margin: 20, alignItems: 'center', justifyContent: 'center', marginTop: "5%" }}>
                                        <View>
                                            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '500', fontStyle: 'normal', fontFamily: 'Montserrat' }}>START</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </Dialog.Content>

                    </ScrollView>
                </Dialog>

            </SafeAreaView>

        </SafeAreaProvider>
    )
}



const styles = StyleSheet.create({

    inputstyles: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 30,
        paddingTop: 15,
    },
    container: {
        borderWidth: 0.5,
        borderColor: 'black',
        height: 60,
    },
    labelStyle: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        fontWeight: '500',
        fontStyle: 'normal',
    },

    main_page: {
        height: "100%",
        backgroundColor: 'white'
    },

    profile_image: {
        shadowColor: "black",
        borderRadius: 100,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    card_flex: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30
    },

    dialog_profile_image: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },

    dialog_text: {
        marginLeft: 15,
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#000'
    },

    dialog_input_text: {
        marginLeft: 15,
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#000'
    },

    dialog_field: {
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 10
    },
})