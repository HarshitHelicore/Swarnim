import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from "react-native"
import { DrawerActions } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { APP_BASE_URL } from "../setting/setting";
import { TimesheetData } from "../config/apiConstant";
import SkeletonContent from 'react-native-skeleton-content';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Moment from 'react-moment';
import 'moment-timezone';
// import moment from 'moment';

export const Timesheet = ({ navigation }: any) => {

    const [Timesheetdata, SetTimesheetdata] = useState<any>();
    const [loader, SetLoader] = useState<boolean>(false);

    const get_timesheet_data = async () => {
        const usertoken = await AsyncStorage.getItem('token');
        SetLoader(true);
        try {
            const response = await axios.get(APP_BASE_URL + TimesheetData, {
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
                    SetTimesheetdata(response.data.data);
            }
            SetLoader(false);

        } catch (error) {
            console.log(">>>>>>>sssssssssssssssssssssssss>>>>.error", error);

        }
    }

    useEffect(() => {
        get_timesheet_data();
    }, [])

    return (

        <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>
            {loader ?
                <View style={{ height: "100%", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='black' />
                </View>
                : null}
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
                    <Text style={{ color: '#247401', fontSize: 20, fontWeight: '500', fontFamily: 'Montserrat' }}>Timesheet</Text>
                </View>
            </View>
            {/* <SkeletonContent
                containerStyle={{ flex: 1, width: 300 }}
                isLoading={true}
                layout={[
                    { key: 'someId', width: 220, height: 20, marginBottom: 6 },
                    { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
                ]}
            >
                
            </SkeletonContent> */}


            <View>
                <FlatList
                    data={Timesheetdata}
                    renderItem=
                    {({ item }) =>
                        <View style={{ marginLeft: 20, marginRight: 20, height: 80, marginBottom: 15, borderRadius: 10, backgroundColor: '#62936A' }}>
                            <View style={{ flexDirection: 'row', width: "100%", marginTop: 10 }}>
                                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.text}>Date</Text>
                                </View>
                                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.text}>Start Time</Text>
                                </View>
                                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.text}>End Time</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', width: "100%", marginTop: 10 }}>
                                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                    <Moment element={Text} format="DD/MM/YYYY" style={{ color: 'white' }}>
                                        {item.start_time}
                                    </Moment>
                                </View>
                                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        item.start_time ?
                                            <Moment element={Text} format="h:mm A" style={{ color: 'white' }}>
                                                {item.start_time}
                                            </Moment>
                                            :
                                            <Text style={{ color: 'white' }}>----</Text>
                                    }
                                </View>
                                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        item.end_time ?
                                            <Moment element={Text} format="h:mm A" style={{ color: 'white' }}>
                                                {item.end_time}
                                            </Moment>
                                            :
                                            <Text style={{ color: 'white' }}>----</Text>
                                    }

                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    text: {
        color: '#FFF',
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'normal',
    }
})