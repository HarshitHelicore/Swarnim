import { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ToastAndroid
} from "react-native"
import DatePicker from "react-native-date-picker";
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import date_icon from '../../../assets/images/dateimage.png';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Leave_type } from "../../../config/apiConstant";
import axiosInstance from '../../../config/axiosInstance';

export const Custom_Leave = ({ navigation }: any) => {
    const [leavetype, SetLeavetype] = useState("");
    const [startdate, setstartDate] = useState(new Date());
    const [enddate, setendDate] = useState(new Date());

    const [startopen, setstartOpen] = useState(false);
    const [endopen, setendOpen] = useState(false);

    const [startdateValue, setstartdateValue] = useState('');
    const [enddateValue, setenddateValue] = useState('');

    const [errors, Seterrors] = useState<any>();



    const [content, Setcontent] = useState("");

    const leave_type_data = [
        { label: 'Regular', value: 'regular' },
        { label: 'Casual', value: 'casual' },
    ];
    const custom_press_back = () => {
        navigation.navigate("Sales Marketing");
    }

    const validation_custom_leave = () => {
        let isValid = false;
        let error = {};
        let error_full_leave = {};

        if (!leavetype) {
            isValid = true
            error = {
                ...error, leave_type: "Select Leave Type ***"
            }
        } else {
            error = {
                ...error, leave_type: ""
            }
        }

        if (!startdateValue) {
            isValid = true
            error = {
                ...error, startdate: "Select Start Date ***"
            }
        } else {
            error = {
                ...error, startdate: ""
            }
        }

        if (!enddateValue) {
            isValid = true
            error = {
                ...error, enddate: "Select End Date ***"
            }
        } else {
            error = {
                ...error, enddate: ""
            }
        }

        if (!content) {
            isValid = true
            error = {
                ...error, content: "Write a Reason why you are on leave ***"
            }
        } else {
            error = {
                ...error, content: ""
            }
        }

        error_full_leave = { isValid, error }

        return error_full_leave;
    }

    var moment = require('moment');
    const submit_custom_leave = async() => {

        const { isValid, error }: any = validation_custom_leave();
        Seterrors(error);

        let formData: any = new FormData();

        formData.append("from_date", moment(startdateValue, 'DD/MM/YYYY').format('YYYY-MM-DD'));
        formData.append("to_date", moment(enddateValue, 'DD/MM/YYYY').format('YYYY-MM-DD'));
        formData.append("leave_type", leavetype);
        formData.append("reason", content);
        formData.append("leave_day", "Custom");

        if (!isValid) {
            try {
                let leave_type_url = Leave_type;
                const response = await axiosInstance.post(leave_type_url, formData);
                if (response.data) {
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                        25,
                        50
                    );
                    navigation.goBack();
                }
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
    }

    return (

        <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>

            {/* HEADER */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
                <View style={{ width: "15%" }}>
                    <TouchableOpacity onPress={custom_press_back}>
                        <View style={{ alignItems: 'center' }}>

                            <Ionicons
                                name="arrow-back-outline" size={25} color='#388847'
                            />

                        </View>
                        {/* <Image style={{ width: 20, height: 20 }} source={require('../assets/images/backicon.png')} /> */}
                    </TouchableOpacity>
                </View>
                <View style={{ width: "75%", alignItems: 'center' }}>
                    <Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Custom Leave</Text>
                </View>
            </View>

            <ScrollView>

                {/* SELECETED LECAVE FIELD */}
                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <View style={{ width: "100%", height: 60, borderWidth: errors?.leave_type ? 2 : 1, borderColor : errors?.leave_type ? 'red' : 'black', marginTop: 20 }}>
                        <View style={{ position: 'absolute', top: -8, left: 17 }}>
                            <Text style={[styles.labelStyle, { color: leavetype ? 'black' : '#49658c' }]}>
                                LEAVE TYPE
                            </Text>
                        </View>
                        <View>
                            <Dropdown
                                data={leave_type_data}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                value={leavetype}
                                itemTextStyle={{ color: 'black' }}
                                selectedTextStyle={[styles.inputstyles, { marginTop: 25, height: 50 }]}
                                placeholderStyle={{ marginTop: 27, height: 20, marginLeft: 25, fontStyle: 'normal', fontWeight: '400', fontSize: 14, color: '#BDBDBD' }}
                                iconStyle={{ marginRight: 5, marginTop: 25 }}
                                iconColor='black'
                                placeholder="Select Leave Type"
                                searchPlaceholder="Search..."
                                onChange={item => SetLeavetype(item.value)}
                            />
                        </View>
                    </View>
                </View>

                {
                    errors?.leave_type ? <View><Text style={styles.error_msg}>{errors?.leave_type}</Text></View> : null
                }

                {/* START DATE */}
                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <View style={{ width: "100%", height: 60, borderWidth: errors?.startdate ? 2 : 1, borderColor : errors?.startdate ? 'red' : 'black', marginTop: 20 }}>
                        <View style={{ position: 'absolute', top: -8, left: 17 }}>
                            <Text style={[styles.labelStyle, { color: startdateValue ? 'black' : '#49658c' }]}>
                                START DATE
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setstartOpen(true)} style={{ justifyContent: 'center', marginLeft: 5 }} >
                                <View style={{ flexDirection: 'row' }}>
                                    <Fontisto style={{ marginTop: 17, marginLeft: 20 }}
                                        name="date" size={25} color={startdateValue ? 'black' : '#49658c'}
                                    />
                                    <View style={{ marginTop: 17, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ justifyContent: 'center', color: '#171C15', fontSize: 16, fontWeight: '500', marginLeft: 10 }}>{startdateValue || <View><Text style={{ fontSize: 14, color: '#BDBDBD' }}>Select Start Date</Text></View>}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {
                    errors?.startdate ? <View><Text style={styles.error_msg}>{errors?.startdate}</Text></View> : null
                }

                {/* END DATE */}
                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <View style={{ width: "100%", height: 60, borderWidth: errors?.enddate ? 2 : 1, borderColor : errors?.enddate ? 'red' : 'black', marginTop: 20 }}>
                        <View style={{ position: 'absolute', top: -8, left: 17 }}>
                            <Text style={[styles.labelStyle, { color: enddateValue ? 'black' : '#49658c' }]}>
                                END DATE
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setendOpen(true)} style={{ justifyContent: 'center', marginLeft: 5 }} >
                                <View style={{ flexDirection: 'row' }}>
                                    <Fontisto style={{ marginTop: 17, marginLeft: 20 }}
                                        name="date" size={25} color={enddateValue ? 'black' : '#49658c'}
                                    />
                                    <View style={{ marginTop: 17, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ justifyContent: 'center', color: '#171C15', fontSize: 16, fontWeight: '500', marginLeft: 10 }}>{enddateValue || <View><Text style={{ fontSize: 14, color: '#BDBDBD' }}>Select End Date</Text></View>}</Text>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {
                    errors?.enddate ? <View><Text style={styles.error_msg}>{errors?.enddate}</Text></View> : null
                }

                {/* DATE PICKER */}
                <View>
                    <DatePicker
                        modal
                        open={startopen}
                        date={startdate}
                        onConfirm={date => {
                            var currentdate = new Date(date);
                            var datetime =
                                +currentdate.getDate() +
                                '/' +
                                (currentdate.getMonth() + 1) +
                                '/' +
                                currentdate.getFullYear()
                            // +
                            // ' - ' 
                            // +
                            // currentdate.getHours() +
                            // ':' +
                            // currentdate.getMinutes();

                            setstartOpen(false);
                            setstartDate(date);
                            setstartdateValue(datetime.toString());
                        }}
                        minimumDate={new Date()}
                        onCancel={() => {
                            setstartOpen(false);
                        }}
                    />

                    <DatePicker
                        modal
                        open={endopen}
                        date={enddate}
                        onConfirm={date => {
                            var currentdate = new Date(date);
                            var datetime =
                                +currentdate.getDate() +
                                '/' +
                                (currentdate.getMonth() + 1) +
                                '/' +
                                currentdate.getFullYear()
                            // +
                            // ' - ' 
                            // +
                            // currentdate.getHours() +
                            // ':' +
                            // currentdate.getMinutes();

                            setendOpen(false);
                            setendDate(date);
                            setenddateValue(datetime.toString());
                        }}
                        minimumDate={new Date()}
                        onCancel={() => {
                            setendOpen(false);
                        }}
                    />
                </View>

                {/* REASON FIELD */}
                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <View style={{ width: "100%", height: "auto", minHeight: 60, borderWidth: errors?.content ? 2 : 1, borderColor : errors?.content ? 'red' : 'black', marginTop: 20 }}>
                        <View style={{ position: 'absolute', top: -8, left: 17 }}>
                            <Text style={[styles.labelStyle, { color: content ? 'black' : '#49658c' }]}>
                                LEAVE REASON
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.contentInput}
                                multiline
                                placeholder="Reason"
                                value={content}
                                placeholderTextColor='#BDBDBD'
                                onChangeText={Setcontent}
                            />
                        </View>

                    </View>
                </View>

                {
                    errors?.content ? <View><Text style={styles.error_msg}>{errors?.content}</Text></View> : null
                }

                {/* BUTTON */}
                <View>
                    <TouchableOpacity style={styles.submit} onPress={submit_custom_leave}>
                        <Text style={styles.submit_text}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    inputstyles: {
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: 30,
        paddingTop: 15,
        marginLeft: -5
    },
    labelStyle: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        fontWeight: '500',
        fontStyle: 'normal',
    },
    error_msg: {
        marginLeft: "5%",
        fontFamily: 'Montserrat',
        position: 'absolute',
        marginBottom: 5,
        color: 'red'
    },
    selectlist: {
        borderRadius: 6,
        gap: 5,
        padding: 5,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        backgroundColor: '#FFF'
    },
    date: {
        color: '#171C15',
        fontSize: 16,
        fontWeight: '500',
    },
    date_container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#D9D9D9',
        backgroundColor: "#FFF",
        height: 50
    },
    contentInput: {
        marginTop: 5,
        marginLeft: 20,
        fontWeight: '400'
    },
    submit: {
        borderWidth: 1,
        backgroundColor: '#388847',
        borderColor: "#FFF",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        margin: 20
    },
    submit_text: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal'
    }
})