import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    // FlatList,
    ActivityIndicator
} from "react-native"

import { Add_Expense } from "./new_expense";
import { FloatingAction } from "react-native-floating-action";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { APP_BASE_URL } from "../../../setting/setting";
import { Expense_Data } from "../../../config/apiConstant";
import Moment from 'react-moment';
import 'moment-timezone';
import { log } from "react-native-reanimated";
import { FlatList } from 'react-native-gesture-handler'

import Entypo from 'react-native-vector-icons/Entypo';

export const Expense = ({ navigation }: any) => {

    const [expense_data, SetExpenseData] = useState<any>();
    const [expense_data_total_amount, SetExpenseDataTotalAmount] = useState<number>();
    const [expense_data_total_paid, SetExpenseDataTotalpaid] = useState<number>();
    const [expense_data_total_unpaid, SetExpenseDataTotalunpaid] = useState<number>();
    const [loader, Setloader] = useState<boolean>(false);



    const get_expense_data = async () => {
        const user_token: any = await AsyncStorage.getItem('token');
        Setloader(true);
        try {
            const response = await axios.get(APP_BASE_URL + Expense_Data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user_token
                },
            });
           
            
            {
                !window.cn(response.data.data) && response.data.data &&
                    SetExpenseData(response.data.data);
            }

            {
                !window.cn(response.data.total_expense) && response.data.total_expense &&
                    SetExpenseDataTotalAmount(response.data.total_expense);
            }

            {
                !window.cn(response.data.unpaid) && response.data.unpaid &&
                    SetExpenseDataTotalunpaid(response.data.unpaid);
            }


            {
                !window.cn(response.data.paid) && response.data.paid &&
                    SetExpenseDataTotalpaid(response.data.paid);
            }

            Setloader(false);
        } catch (error) {
            console.log(">>>>>>>>>>>>>>err");

        }
    }

    useEffect(() => {
        console.log(">>>>>.4t7t477t747t474t74t74t74t7t47t47t4")
        get_expense_data();
    }, [])

    const press_back = () => {
        navigation.navigate('Home');
    }

    const press_new_expense = () => {
        navigation.navigate('Add Expense');
    }

    const actions = [
        {
            text: "New Expense",
            icon: require("../../../assets/images/plusicon.png"),
            name: "new_expense",
            position: 3,
            color: "#71AE57",
        }
    ];

    const press_leavehandler = (name: any) => {
        if (name === "new_expense") {
            navigation.navigate('Add Expense');
        }
    }

    const handleotherexpense = (item:any) => {
        navigation.navigate('Other Expense', {other_expense: item});
    }
    // console.log('>>>>>essxpense_data', expense_data.other_expense)
    return (

        <SafeAreaView style={{ height: "100%", position: 'relative' }}>
            {loader ?
                <View style={{ height: "100%", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='black' />
                </View>
                : null}
            {/* <ScrollView> */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%"}}>
                    <View style={{width: "15%", alignItems: 'center'}}>
                        <TouchableOpacity onPress={press_back}>
                            <Image source={require('../../../assets/images/backicon.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: "75%", alignItems:'center'}}>
                    <Text style={{color:'#202020', fontSize: 20, fontWeight: '600', fontFamily:'Montserrat'}}>Expense</Text>
                    </View>
                </View> */}

            <View style={{ height: 150, backgroundColor: '#7ECD8B', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: "35%" }}>
                    <Text style={styles.header_text}>Total Expense</Text>
                    <Text style={styles.header_text}>₹ {expense_data_total_amount}</Text>

                </View>
                <View style={styles.verticleLine}></View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: "30%" }}>
                    <Text style={styles.header_text}>Total Paid</Text>
                    <Text style={styles.header_text}>₹ {expense_data_total_paid}</Text>

                </View>
                <View style={styles.verticleLine}></View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: "30%" }}>
                    <Text style={styles.header_text} >Total Unpaid</Text>
                    <Text style={styles.header_text}>₹ {expense_data_total_unpaid}</Text>

                </View>
            </View>
            {/* <ScrollView> */}
            <View style={{ borderWidth: 0.8, borderRadius: 10, flex: 1, width: 300, left: 45, backgroundColor: 'white', bottom: 30 }}>
                <FlatList
                    data={expense_data}
                    renderItem=
                    {({ item }) =>
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <View style={{ width: "100%", borderBottomWidth: 0.5, marginTop: 5, marginBottom: 5 }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <View style={{ marginBottom: 5, marginTop: 5 }}>
                                        {item.status === 1 ? <Text style={{ color: '#37B600', fontFamily: 'Montserrat', fontSize: 16, fontStyle: 'normal', fontWeight: 'bold' }}>Paid</Text> : <Text style={{ color: '#FF6868', fontFamily: 'Montserrat', fontSize: 16, fontStyle: 'normal', fontWeight: 'bold' }}>Unpaid</Text>}
                                    </View>

                                    <View>
                                        <TouchableOpacity onPress={() =>{handleotherexpense(item)}}>
                                            <Entypo
                                                name="wallet" size={25}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                </View>


                                <View style={{ marginBottom: 5 }}>
                                    <Text style={{ color: '#171C15', fontFamily: 'Montserrat', fontSize: 18, fontStyle: 'normal', fontWeight: '500' }}>
                                        {item.amount}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginBottom: 5, marginTop: 5 }}>
                                        <Text style={{ color: '#979797', fontFamily: 'Montserrat', fontSize: 10, fontStyle: 'normal', fontWeight: '400' }}>
                                            {
                                                item.from_date ?
                                                    <Moment element={Text} format="DD/MM/YYYY" style={{ color: 'black' }}>
                                                        {item.from_date}
                                                    </Moment>
                                                    :
                                                    <Text style={{ color: 'black' }}>----</Text>
                                            }
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 10, color: 'black', marginBottom: 5, marginTop: 5 }}> To </Text>
                                    <View style={{ marginBottom: 5, marginTop: 5 }}>
                                        <Text style={{ color: '#979797', fontFamily: 'Montserrat', fontSize: 10, fontStyle: 'normal', fontWeight: '400' }}>
                                            {
                                                item.from_date ?
                                                    <Moment element={Text} format="DD/MM/YYYY" style={{ color: 'black' }}>
                                                        {item.to_date}
                                                    </Moment>
                                                    :
                                                    <Text style={{ color: 'black' }}>----</Text>
                                            }

                                        </Text>
                                    </View>
                                </View>

                            </View>

                        </View>
                    }
                />
            </View>
            {/* </ScrollView> */}
            {/* </ScrollView> */}


            <FloatingAction
                color="#388847"
                actions={actions}
                position="right"
                onPressItem={(name) => press_leavehandler(name)}
            />
            {/* <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 30, position: 'absolute', width: "100%" }}>
                <TouchableOpacity onPress={press_new_expense}>
                    <View style={{ flexDirection: 'row', borderRadius: 48, backgroundColor: '#388847', paddingTop: 18, paddingRight: 16, paddingBottom: 18, paddingLeft: 16, width: 150 }}>
                        <View style={{ alignSelf: 'center' }}>
                            <Image source={require('../../../assets/images/plus.png')} />
                        </View>
                        <View>
                            <Text style={{ marginLeft: "5%", color: "#FFF", fontSize: 16, fontWeight: '500', fontFamily: 'Montserrat' }}>New Expense</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    verticleLine: {
        alignSelf: 'center',
        height: '25%',
        width: 1,
        backgroundColor: '#FFF',
    },
    header_text: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold'
    }
})
