import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Moment from 'react-moment';
import 'moment-timezone';


export const Other_Expense = ({ navigation, route }: any) => {


    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>route",route.params.other_expense.other_expense);
    


    const [other_expense_data, SetotherExpenseData] = useState<any>();
    const [expense_data, Setexpensedata] = useState<any>();

    useEffect(() => {
        {
            !window.cn(route.params.other_expense) && route.params.other_expense &&
                SetotherExpenseData(route.params.other_expense);
                Setexpensedata(route.params.other_expense.other_expense);
        }
    }, [])

    const press_back_button = () => {
        navigation.navigate('Sales Marketing');
    }
    // console.log(">>>>>>>>>>>other_expense_data", expense_data);


    return (
        <SafeAreaView style={{backgroundColor: 'white', height: "100%"}}>


            {/* HEADER */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
                <View style={{ width: "15%" }}>
                    <TouchableOpacity onPress={press_back_button}>
                        <View style={{ alignItems: 'center' }}>

                            <Ionicons
                                name="arrow-back-outline" size={25} color='#388847'
                            />

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "75%", alignItems: 'center' }}>
                    <Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Expense Details</Text>
                </View>
            </View>

            {!window.cn(other_expense_data) && other_expense_data &&
        <>
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <View style={{ width: "100%" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Expense Id :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.id}
                                    {/* {other_expense_data.id ? other_expense_data.id : "---"} */}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    From Date :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Moment element={Text} format="DD/MM/YYYY" style={{ color: 'black' }}>
                                    {other_expense_data.from_date ? other_expense_data.from_date : "---"}
                                </Moment>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    To Date :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Moment element={Text} format="DD/MM/YYYY" style={{ color: 'black' }}>
                                    {other_expense_data.to_date ? other_expense_data.to_date : "---"}
                                </Moment>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Status :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.amount ? other_expense_data.amount : "0"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Expense Amount :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.amount ? other_expense_data.amount : "0"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Mode of Travel :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.mode_of_travel ? other_expense_data.mode_of_travel : "---"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Tour Type :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.tour_type ? other_expense_data.tour_type : "---"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Paid Type :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.paid_type ? other_expense_data.paid_type : "---"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Payment Type :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.payment_type ? other_expense_data.payment_type : "---"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Vehicle Type :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.vehicle_type ? other_expense_data.vehicle_type : "---"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Tour With Halt :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.tour_with_halt ? other_expense_data.tour_with_halt : "No"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Tour Without Halt :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.tour_without_halt ? other_expense_data.tour_without_halt : "No"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.text_style}>
                                <Text style={styles.text}>
                                    Leave Holiday :
                                </Text>
                            </View>
                            <View style={styles.output_styles}>
                                <Text style={styles.output_text}>
                                    {other_expense_data.leave_holiday ? other_expense_data.leave_holiday : "No"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                </>
                
            }

            {/* <View>
                <FlatList 
                data={expense_data}
                renderItem={({item}) => 
                <View style={{borderWidth: 1}}>
                    <Text style={{color: 'black'}}>{item.Expense}</Text>
                </View>
            }
                />
            </View> */}

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    text_style: {
        width: "40%",
        marginTop: 10
    },
    output_styles: {
        width: "60%",
        marginTop: 10
    },
    text: {
        color: 'black',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontFamily: 'Montserrat'
    },
    output_text: {
        color: 'black',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '800',
        fontFamily: 'Montserrat'
    },

})