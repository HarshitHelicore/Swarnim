import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    FlatList,
    ActivityIndicator
} from "react-native"
import back_icon from '../../../assets/images/backicon.png';
import { FloatingAction } from "react-native-floating-action";
import { Full_Leave } from "./fullleave";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { APP_BASE_URL } from "../../../setting/setting";
import { Leave_management_Data } from "../../../config/apiConstant";
import Moment from 'react-moment';
import 'moment-timezone';



export const Leave_management = ({ navigation }: any) => {

    const [Leavemanagement, SetLeavemanagement] = useState<any>();
    const [loader, Setloader] = useState<boolean>(false);

    const get_leave_management_data = async () => {
        const usertoken = await AsyncStorage.getItem('token');
        Setloader(true);
        try {
            const response = await axios.get(APP_BASE_URL + Leave_management_Data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + usertoken
                },
                params: {
                    "front": "front"
                }
            })

            {
                !window.cn(response.data.data) && response.data.data &&
                    SetLeavemanagement(response.data.data);
            }
            Setloader(false);
        } catch (error) {
            console.log(">>>>>>>>>>>.error", error);

        }
    }

    useEffect(() => {
        get_leave_management_data();
    }, [])

    const press_back = () => {
        navigation.navigate('Home');
    }

    const actions = [
        {
            text: "One Day Leave",
            icon: require("../../../assets/images/fulldayleave.png"),
            name: "one_day_leave",
            position: 3,
            color: "#71AE57",
        },
        {
            text: "Half Leave",
            icon: require("../../../assets/images/halfdayleave.png"),
            name: "half_leave",
            position: 2,
            color: "#71AE57",
        },
        {
            text: "Custom Leave",
            icon: require("../../../assets/images/customleave.png"),
            name: "custom_leave",
            position: 1,
            color: "#71AE57",
        },
    ];

    const press_leavehandler = (name: any) => {
        if (name === "one_day_leave") {
            navigation.navigate("Full Leave");
        }
        if (name === "half_leave") {
            navigation.navigate("Half Leave");
        }
        if (name === "custom_leave") {
            navigation.navigate("Custom Leave");
        }

    }

    return (
        <>
            <SafeAreaView>
                {loader ?
                    <View style={{ height: "100%", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color='black' />
                    </View>
                    : null}
                {/* <ScrollView> */}
                <View style={Styles.action_button}>
                    {/* <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent:'center', width:"20%", top:"2%", left: "50%"}}>
                        <TouchableOpacity onPress={press_back}>
                            <Image source={back_icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems:'center', width: "60%", top:"2%"}}>
                        <Text style={{color: '#202020', fontSize: 20, fontWeight: '500'}}>Leave Management</Text>
                    </View>
                </View> */}

                </View>

                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={Leavemanagement}
                        renderItem=
                        {({ item }) =>
                            <View style={{ marginLeft: 20, marginRight: 20, height: 80, marginBottom: 15, borderRadius: 10, backgroundColor: '#62936A' }}>
                                <View style={{ flexDirection: 'row', width: "100%", marginTop: 10 }}>
                                    <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={Styles.text}>Start Date</Text>
                                    </View>
                                    <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={Styles.text}>End Date</Text>
                                    </View>
                                    <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={Styles.text}>Status</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: "100%", marginTop: 10 }}>
                                    <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                            item.from_date ?
                                                <Moment element={Text} format="h:mm A" style={{ color: 'white' }}>
                                                    {item.from_date}
                                                </Moment>
                                                :
                                                <Text style={{ color: 'white' }}>----</Text>
                                        }
                                    </View>
                                    <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                            item.to_date ?
                                                <Moment element={Text} format="h:mm A" style={{ color: 'white' }}>
                                                    {item.to_date}
                                                </Moment>
                                                :
                                                <Text style={{ color: 'white' }}>----</Text>
                                        }
                                    </View>
                                    <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', marginLeft:8 }}>{item.status}</Text>

                                    </View>
                                </View>
                            </View>
                        }
                    />
                </View>
                {/* </ScrollView> */}
            </SafeAreaView>
            <FloatingAction
                color="#388847"
                actions={actions}
                position="right"
                onPressItem={(name) => press_leavehandler(name)}
            />

        </>
    )
}

const Styles = StyleSheet.create({
    action_button: {
        position: 'absolute',
        bottom: 0,
        height: "100%"
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    text: {
        color: '#FFF',
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'normal',
    }
})
