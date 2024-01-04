import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from "react-native-elements";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Value, log } from "react-native-reanimated";
import Fontisto from 'react-native-vector-icons/Fontisto';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import axiosInstance from '../../../config/axiosInstance';
import { Add_Expenses } from "../../../config/apiConstant";


export const Add_Expense = ({ navigation }: any) => {

    // TYPE

    type expense_amounts = {
        ticket_fare_amount: number,
        food_amount: number,
        vehicle_repairing_amount: number,
        vehicle_fuel_amount: number,
        lodging_amount: number,
        other_amount: number
    }

    type expense_box_booleans = {
        ticket_fare: boolean,
        food: boolean,
        vehicle_repairing: boolean,
        vehicle_fuel: boolean,
        lodging: boolean,
        with_out_lodging: boolean,
        other: boolean
    }

    // NEW EXPENSE DATA

    const [new_expense_data, SetNewExpenseData] = useState<any>();
    const [expense_amount, SetExpenseAmount] = useState<expense_amounts>({
        ticket_fare_amount: 0,
        food_amount: 0,
        vehicle_repairing_amount: 0,
        vehicle_fuel_amount: 0,
        lodging_amount: 0,
        other_amount: 0
    });
    const [expense_image, SetExpenseImage] = useState<any>();
    const [expense_box_boolean, SetExpenseBoxBoolean] = useState<expense_box_booleans>({
        ticket_fare: false,
        food: false,
        vehicle_repairing: false,
        vehicle_fuel: false,
        lodging: false,
        with_out_lodging: false,
        other: false
    });
    const [expense_total_amount, SetExpenseTotalAmount] = useState<number>(0);


    const handle_new_expense_data = (val: any, key: string) => {
        SetNewExpenseData({ ...new_expense_data, [key]: val })
    }

    const handle_new_expense_amount_data = (val: any, key: string) => {
        SetExpenseAmount({ ...expense_amount, [key]: val })
    }

    const handle_new_expense_image_data = async (val: any, key: string) => {
        const result: any = await DocumentPicker.pick({
            type: [DocumentPicker.types.images]
        })

        if (result != null) {
            SetExpenseImage({ ...expense_image, [key]: result })
        }
    }

    console.log(">>>>>>>>>>expense_amount", expense_amount)
    const [isChecked, setChecked] = useState([{}]);
    useEffect(() => {
        setChecked([
            {
                Expense: expense_box_boolean?.ticket_fare,
                Amount: expense_amount?.ticket_fare_amount,
                title: "Fare",
            },
            {
                Expense: expense_box_boolean?.food,
                Amount: expense_amount?.food_amount,
                title: "Food",
            },
            {
                Expense: expense_box_boolean?.vehicle_fuel,
                Amount: expense_amount?.vehicle_fuel_amount,
                title: "Fuel",
            },
            {
                Expense: expense_box_boolean?.vehicle_repairing,
                Amount: expense_amount?.vehicle_repairing_amount,
                title: "Repairing",
            },
            {
                Expense: expense_box_boolean?.lodging,
                Amount: expense_amount?.lodging_amount,
                title: "Lodging",
            },
            {
                Expense: expense_box_boolean?.other,
                Amount: expense_amount?.other_amount,
                title: "Other",
            },
        ]);
    }, [
        expense_amount,
        expense_box_boolean.ticket_fare,
        expense_box_boolean.food,
        expense_box_boolean.vehicle_fuel,
        expense_box_boolean.vehicle_repairing,
        expense_box_boolean.lodging,
        expense_box_boolean.other,
    ]);

    const data_paid_by = [
        { label: 'Paid by Company', value: 'self' },
        { label: 'Paid by You', value: 'company' },
    ];

    const data_tour_type = [
        { label: 'Regular', value: 'Regular' },
        { label: 'Casual', value: 'Casual' },
    ];

    const data_vehicle_type = [
        { label: 'Company Vehicle', value: 'Company' },
        { label: 'Own Vehicle', value: 'Own' },
    ];

    const data_payment_type = [
        { label: 'By Card', value: 'Card' },
        { label: 'By Cash', value: 'Cash' },
    ];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

    const showEndDatePicker = () => {
        setEndDatePickerVisible(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisible(false);
    };

    const handleEndDateConfirm = (date: Date) => {
        setEndDate(date.toLocaleDateString());
        hideEndDatePicker();
    };

    const showStartDatePicker = () => {
        setStartDatePickerVisible(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisible(false);
    };

    const handleStartDateConfirm = (date: Date) => {
        setStartDate(date.toLocaleDateString());
        hideStartDatePicker();
    };


    var moment = require('moment');
    const submit_expense = async () => {

        let formData: any = new FormData();

        formData.append("paid_type", new_expense_data?.paid_by);
        formData.append("tour_type", new_expense_data?.tour_type);
        formData.append("vehicle_type", new_expense_data?.vehicle_type);
        formData.append("payment_type", new_expense_data?.payment_type);
        formData.append("from_date", moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
        formData.append("to_date", moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
        formData.append("distance", new_expense_data?.enter_km);


        // TRUE OR FALSE

        formData.append("tour_without_halt", new_expense_data?.toue_without_halt ? 1 : 0);
        formData.append("tour_with_halt", new_expense_data?.Tour_with_night_halt ? 1 : 0);
        formData.append("work_at_office", new_expense_data?.working_at_hq_office ? 1 : 0);
        formData.append("leave_holiday", new_expense_data?.leave_holiday ? 1 : 0);
        formData.append("amount", expense_total_amount);

        formData.append("other_expense", JSON.stringify(isChecked));

        console.log(">>>>>expense_box_boolean", expense_box_boolean)
        // formData.append(
        //     "other_expense", JSON.stringify({
        //         Expense:expense_box_boolean,
        //         Amount:
        //         title:
        //     }));


        expense_image?.ticket_fare_image &&
            formData.append("fare_img", {
                uri: expense_image?.ticket_fare_image[0]?.uri,
                name: expense_image?.ticket_fare_image[0]?.name,
                type: expense_image?.ticket_fare_image[0]?.type,
            });

        expense_image?.food_image &&
            formData.append("food_img", {
                uri: expense_image?.food_image[0]?.uri,
                name: expense_image?.food_image[0]?.name,
                type: expense_image?.food_image[0]?.type,
            });

        expense_image?.vehicle_repairing_image &&
            formData.append("repairing_img", {
                uri: expense_image?.vehicle_repairing_image[0]?.uri,
                name: expense_image?.vehicle_repairing_image[0]?.name,
                type: expense_image?.vehicle_repairing_image[0]?.type,
            });

        expense_image?.vehicle_fuel_image &&
            formData.append("fuel_img", {
                uri: expense_image?.vehicle_fuel_image[0]?.uri,
                name: expense_image?.vehicle_fuel_image[0]?.name,
                type: expense_image?.vehicle_fuel_image[0]?.type,
            });

        expense_image?.lodging_image &&
            formData.append("lodging_img", {
                uri: expense_image?.lodging_image[0]?.uri,
                name: expense_image?.lodging_image[0]?.name,
                type: expense_image?.lodging_image[0]?.type,
            });

        expense_image?.other_image &&
            formData.append("other_img", {
                uri: expense_image?.other_image[0]?.uri,
                name: expense_image?.other_image[0]?.name,
                type: expense_image?.other_image[0]?.type,
            });
          
        try {
            let AddExpenseUrl = Add_Expenses;
            const response = await axiosInstance.post(AddExpenseUrl, formData);
            
            if (response.data) {
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                    25,
                    50
                );

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

    const handle_new_expense_boolean = (val: any, key: string) => {
        SetExpenseBoxBoolean({ ...expense_box_boolean, [key]: val })
    }

    const new_expense_press_back = () => {
        navigation.navigate("Sales Marketing");
    }


    useEffect(() => {
        var total_amount = 0
        if (expense_box_boolean?.ticket_fare) {
            console.log("if", expense_amount?.ticket_fare_amount);

            total_amount += Math.floor(expense_amount?.ticket_fare_amount);
        } else {
            console.log("else", expense_amount?.ticket_fare_amount);

            total_amount -= Math.floor(expense_amount?.ticket_fare_amount);
        }

        if (expense_box_boolean?.food) {
            total_amount += Math.floor(expense_amount?.food_amount);
        } else {
            total_amount -= Math.floor(expense_amount?.food_amount);
        }

        if (expense_box_boolean?.vehicle_repairing) {
            total_amount += Math.floor(expense_amount?.vehicle_repairing_amount);
        } else {
            total_amount -= Math.floor(expense_amount?.vehicle_repairing_amount);
        }

        if (expense_box_boolean?.vehicle_fuel) {
            total_amount += Math.floor(expense_amount?.vehicle_fuel_amount);
        } else {
            total_amount -= Math.floor(expense_amount?.vehicle_fuel_amount);
        }

        if (expense_box_boolean?.lodging && !expense_box_boolean?.with_out_lodging) {
            total_amount += Math.floor(expense_amount?.lodging_amount);
        } else {
            total_amount -= Math.floor(expense_amount?.lodging_amount);
        }

        if (expense_box_boolean?.other) {
            total_amount += Math.floor(expense_amount?.other_amount);
        } else {
            total_amount -= Math.floor(expense_amount?.other_amount);
        }

        SetExpenseTotalAmount(total_amount);
    }, [expense_amount])

    console.log(">>>>>>>>>>>>new_expense_data", expense_image)

    return (
        <>
            <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>

                {/* HEADER */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
                    <View style={{ width: "15%" }}>
                        <TouchableOpacity onPress={new_expense_press_back}>
                            <View style={{ alignItems: 'center' }}>

                                <Ionicons
                                    name="arrow-back-outline" size={25} color='#388847'
                                />

                            </View>
                            {/* <Image style={{ width: 20, height: 20 }} source={require('../assets/images/backicon.png')} /> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "75%", alignItems: 'center' }}>
                        <Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Add Expense</Text>
                    </View>
                </View>
                <ScrollView>

                    {/* INPUT FIELDS */}

                    <View style={{ marginLeft: 20, marginRight: 20 }}>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ width: "100%", height: 60, borderWidth: 0.5, marginTop: 20 }}>
                                <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                    <Text style={[style.labelStyle, { color: new_expense_data?.paid_by ? 'black' : '#49658c' }]}>
                                        PAID BY
                                    </Text>
                                </View>
                                <View>
                                    <Dropdown
                                        data={data_paid_by}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        itemTextStyle={{ color: 'black' }}
                                        selectedTextStyle={[style.inputstyles, { marginTop: 20, height: 50 }]}
                                        placeholderStyle={{ width: 0, height: 0 }}
                                        value={new_expense_data?.paid_by}
                                        iconStyle={{ marginRight: 5, marginTop: 20 }}
                                        iconColor='black'
                                        placeholder="Paid By"
                                        searchPlaceholder="Search..."
                                        onChange={item => handle_new_expense_data(item.value, "paid_by")}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ width: "100%", height: 60, borderWidth: 0.5, marginTop: 20 }}>
                                <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                    <Text style={[style.labelStyle, { color: new_expense_data?.tour_type ? 'black' : '#49658c' }]}>
                                        TOUR TYPE
                                    </Text>
                                </View>
                                <View>
                                    <Dropdown
                                        data={data_tour_type}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        itemTextStyle={{ color: 'black' }}
                                        value={new_expense_data?.tour_type}
                                        selectedTextStyle={[style.inputstyles, { marginTop: 20, height: 50 }]}
                                        placeholderStyle={{ width: 0, height: 0 }}
                                        iconStyle={{ marginRight: 5, marginTop: 20 }}
                                        iconColor='black'
                                        placeholder="Tour Type"
                                        searchPlaceholder="Search..."
                                        onChange={item => handle_new_expense_data(item.value, "tour_type")}
                                    />
                                </View>
                            </View>
                        </View>


                        <View style={{ marginTop: 10 }}>
                            <View style={{ width: "100%", height: 60, borderWidth: 0.5, marginTop: 20 }}>
                                <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                    <Text style={[style.labelStyle, { color: new_expense_data?.vehicle_type ? 'black' : '#49658c' }]}>
                                        SELECT VEHICLE TYPE
                                    </Text>
                                </View>
                                <View>
                                    <Dropdown
                                        data={data_vehicle_type}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        itemTextStyle={{ color: 'black' }}
                                        value={new_expense_data?.vehicle_type}
                                        selectedTextStyle={[style.inputstyles, { marginTop: 20, height: 50 }]}
                                        placeholderStyle={{ width: 0, height: 0 }}
                                        iconStyle={{ marginRight: 5, marginTop: 20 }}
                                        iconColor='black'
                                        placeholder="Select Vehicle Type"
                                        searchPlaceholder="Search..."
                                        onChange={item => handle_new_expense_data(item.value, "vehicle_type")}
                                    />
                                </View>
                            </View>
                        </View>


                        <View style={{ marginTop: 10 }}>
                            <View style={{ width: "100%", height: 60, borderWidth: 0.5, marginTop: 20 }}>
                                <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                    <Text style={[style.labelStyle, { color: new_expense_data?.payment_type ? 'black' : '#49658c' }]}>
                                        SELECT PAYMENT TYPE
                                    </Text>
                                </View>
                                <View>
                                    <Dropdown
                                        data={data_payment_type}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        itemTextStyle={{ color: 'black' }}
                                        value={new_expense_data?.payment_type}
                                        selectedTextStyle={[style.inputstyles, { marginTop: 20, height: 50 }]}
                                        placeholderStyle={{ width: 0, height: 0 }}
                                        iconStyle={{ marginRight: 5, marginTop: 20 }}
                                        iconColor='black'
                                        placeholder="Select Payment Type"
                                        searchPlaceholder="Search..."
                                        onChange={item => handle_new_expense_data(item.value, "payment_type")}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ width: "100%", height: 60, borderWidth: 0.5, marginTop: 20 }}>
                                <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                    <Text style={[style.labelStyle, { color: startDate ? 'black' : '#49658c' }]}>
                                        SELECT START DATE
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} onPress={showStartDatePicker}>
                                        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ width: "50%", justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginTop: 5, marginLeft: 10 }}>{startDate || 'Select Start Date'}</Text>
                                            </View>
                                            <View>
                                                <Fontisto
                                                    name="date" size={25} color='black'
                                                />
                                            </View>
                                        </View>

                                    </TouchableOpacity>

                                    <DateTimePickerModal
                                        isVisible={isStartDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleStartDateConfirm}
                                        onCancel={hideStartDatePicker}
                                    />

                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ width: "100%", height: 60, borderWidth: 0.5, marginTop: 20 }}>
                                <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                    <Text style={[style.labelStyle, { color: endDate ? 'black' : '#49658c' }]}>
                                        SELECT END DATE
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} onPress={showEndDatePicker}>
                                        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ width: "50%", justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginTop: 5, marginLeft: 10 }}>{endDate || 'Select End Date'}</Text>
                                            </View>
                                            <View>
                                                <Fontisto
                                                    name="date" size={25} color='black'
                                                />
                                            </View>
                                        </View>

                                    </TouchableOpacity>

                                    <DateTimePickerModal
                                        isVisible={isEndDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleEndDateConfirm}
                                        onCancel={hideEndDatePicker}
                                    />

                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <FloatingLabelInput
                                label={'ENTER KM'}
                                onChangeText={(val) => handle_new_expense_data(val.replace(/[^0-9]/g, ''), "enter_km")}
                                keyboardType="numeric"
                                staticLabel
                                value={new_expense_data?.enter_km}
                                inputStyles={style.inputstyles}
                                containerStyles={style.container}
                                labelStyles={style.labelStyle}
                                customLabelStyles={{
                                    fontSizeBlurred: 15,
                                    colorFocused: 'black',
                                    fontSizeFocused: 12,
                                }}
                            />
                        </View>



                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#247401', fontFamily: 'Montserrat', fontSize: 16, fontWeight: 'bold', fontStyle: 'normal', marginTop: 20 }}>Other Expense</Text>
                        </View>

                        <View style={{ height: "auto", borderWidth: 1, marginTop: 10, borderRadius: 20, paddingBottom: 10 }}>

                            <View>
                                <View style={style.box}>
                                    <View style={{ width: "100%", flexDirection: 'row' }}>
                                        <View style={{ width: "15%", justifyContent: 'center' }}>
                                            <CheckBox
                                                value={expense_box_boolean?.ticket_fare}
                                                onValueChange={(val) => handle_new_expense_boolean(val, "ticket_fare")}
                                            />
                                        </View>
                                        <View style={{ width: "70%", justifyContent: 'center' }}>
                                            <Text style={[style.switch_text, { color: expense_box_boolean?.ticket_fare ? 'black' : '#49658c' }]}>
                                                Ticket Fare
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {
                                    expense_box_boolean?.ticket_fare ?

                                        <View style={{ marginLeft: "20%", marginRight: 20 }}>
                                            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={style.box_textinput}>
                                                    <TextInput value={expense_amount?.ticket_fare_amount}
                                                        onChangeText={val => handle_new_expense_amount_data(val.replace(/[^0-9]/g, ''), "ticket_fare_amount")}
                                                        keyboardType="numeric"
                                                    >
                                                    </TextInput>
                                                </View>
                                                <View style={{ width: "50%" }}>
                                                    <TouchableOpacity onPress={(val) => handle_new_expense_image_data(val, "ticket_fare_image")}>
                                                        <Text style={style.box_button_text}>Upload Image</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View></View>
                                }

                            </View>

                            <View>
                                <View style={style.box}>
                                    <View style={{ width: "100%", flexDirection: 'row' }}>
                                        <View style={{ width: "15%", justifyContent: 'center' }}>
                                            <CheckBox
                                                value={expense_box_boolean?.food}
                                                onValueChange={(val) => handle_new_expense_boolean(val, "food")}
                                            />
                                        </View>
                                        <View style={{ width: "70%", justifyContent: 'center' }}>
                                            <Text style={[style.switch_text, { color: expense_box_boolean?.food ? 'black' : '#49658c' }]}>
                                                Food
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {
                                    expense_box_boolean?.food ?

                                        <View style={{ marginLeft: "20%", marginRight: 20 }}>
                                            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={style.box_textinput}>
                                                    <TextInput value={expense_amount?.food_amount}
                                                        onChangeText={val => handle_new_expense_amount_data(val.replace(/[^0-9]/g, ''), "food_amount")}
                                                        keyboardType="numeric"
                                                    >
                                                    </TextInput>
                                                </View>
                                                <View style={{ width: "50%" }}>
                                                    <TouchableOpacity onPress={(val) => handle_new_expense_image_data(val, "food_image")}>
                                                        <Text style={style.box_button_text}>Upload Image</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View></View>
                                }

                            </View>

                            <View>
                                <View style={style.box}>
                                    <View style={{ width: "100%", flexDirection: 'row' }}>
                                        <View style={{ width: "15%", justifyContent: 'center' }}>
                                            <CheckBox
                                                value={expense_box_boolean?.vehicle_repairing}
                                                onValueChange={(val) => handle_new_expense_boolean(val, "vehicle_repairing")}
                                            />
                                        </View>
                                        <View style={{ width: "70%", justifyContent: 'center' }}>
                                            <Text style={[style.switch_text, { color: expense_box_boolean?.vehicle_repairing ? 'black' : '#49658c' }]}>
                                                Vehicle Repairing
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {
                                    expense_box_boolean?.vehicle_repairing ?

                                        <View style={{ marginLeft: "20%", marginRight: 20 }}>
                                            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={style.box_textinput}>
                                                    <TextInput value={expense_amount?.vehicle_repairing_amount}
                                                        onChangeText={val => handle_new_expense_amount_data(val.replace(/[^0-9]/g, ''), "vehicle_repairing_amount")}
                                                        keyboardType="numeric"
                                                    >
                                                    </TextInput>
                                                </View>
                                                <View style={{ width: "50%" }}>
                                                    <TouchableOpacity onPress={(val) => handle_new_expense_image_data(val, "vehicle_repairing_image")}>
                                                        <Text style={style.box_button_text}>Upload Image</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View></View>
                                }

                            </View>

                            <View>
                                <View style={style.box}>
                                    <View style={{ width: "100%", flexDirection: 'row' }}>
                                        <View style={{ width: "15%", justifyContent: 'center' }}>
                                            <CheckBox
                                                value={expense_box_boolean?.vehicle_fuel}
                                                onValueChange={(val) => handle_new_expense_boolean(val, "vehicle_fuel")}
                                            />
                                        </View>
                                        <View style={{ width: "70%", justifyContent: 'center' }}>
                                            <Text style={[style.switch_text, { color: expense_box_boolean?.vehicle_fuel ? 'black' : '#49658c' }]}>
                                                Vehicle Fuel
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {
                                    expense_box_boolean?.vehicle_fuel ?

                                        <View style={{ marginLeft: "20%", marginRight: 20 }}>
                                            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={style.box_textinput}>
                                                    <TextInput value={expense_amount?.vehicle_fuel_amount}
                                                        onChangeText={val => handle_new_expense_amount_data(val.replace(/[^0-9]/g, ''), "vehicle_fuel_amount")}
                                                        keyboardType="numeric"
                                                    >
                                                    </TextInput>
                                                </View>
                                                <View style={{ width: "50%" }}>
                                                    <TouchableOpacity onPress={(val) => handle_new_expense_image_data(val, "vehicle_fuel_image")}>
                                                        <Text style={style.box_button_text}>Upload Image</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View></View>
                                }

                            </View>

                            <View>
                                <View style={style.box}>
                                    <View style={{ width: "100%", flexDirection: 'row' }}>
                                        <View style={{ width: "15%", justifyContent: 'center' }}>
                                            <CheckBox
                                                value={expense_box_boolean?.lodging}
                                                onValueChange={(val) => handle_new_expense_boolean(val, "lodging")}
                                            />
                                        </View>
                                        <View style={{ width: "70%", justifyContent: 'center' }}>
                                            <Text style={[style.switch_text, { color: expense_box_boolean?.lodging ? 'black' : '#49658c' }]}>
                                                Lodging
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {
                                    expense_box_boolean?.lodging ?

                                        <View style={{ marginLeft: "20%", marginRight: 20, marginBottom: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View>
                                                    <CheckBox
                                                        value={expense_box_boolean?.with_out_lodging}
                                                        onValueChange={(val) => handle_new_expense_boolean(val, "with_out_lodging")}
                                                    />
                                                </View>
                                                <View>
                                                    <Text style={[style.switch_text, { color: expense_box_boolean?.with_out_lodging ? 'black' : '#49658c' }]}>
                                                        Without Bill Lodging
                                                    </Text>
                                                </View>
                                            </View>

                                            {expense_box_boolean.with_out_lodging ?
                                                <View></View>
                                                :
                                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={style.box_textinput}>
                                                        <TextInput
                                                            value={expense_amount?.lodging_amount}
                                                            onChangeText={val => handle_new_expense_amount_data(val.replace(/[^0-9]/g, ''), "lodging_amount")}
                                                            keyboardType="numeric">
                                                        </TextInput>
                                                    </View>
                                                    <View style={{ width: "50%" }}>
                                                        <TouchableOpacity onPress={(val) => handle_new_expense_image_data(val, "lodging_image")}>
                                                            <Text style={style.box_button_text}>Upload Image</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            }

                                        </View>
                                        :
                                        <View></View>
                                }

                            </View>

                            <View>
                                <View style={style.box}>
                                    <View style={{ width: "100%", flexDirection: 'row' }}>
                                        <View style={{ width: "15%", justifyContent: 'center' }}>
                                            <CheckBox
                                                value={expense_box_boolean?.other}
                                                onValueChange={(val) => handle_new_expense_boolean(val, "other")}
                                            />
                                        </View>
                                        <View style={{ width: "70%", justifyContent: 'center' }}>
                                            <Text style={[style.switch_text, { color: expense_box_boolean?.other ? 'black' : '#49658c' }]}>
                                                Other
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {
                                    expense_box_boolean?.other ?

                                        <View style={{ marginLeft: "20%", marginRight: 20 }}>
                                            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={style.box_textinput}>
                                                    <TextInput
                                                        value={expense_amount?.other_amount}
                                                        onChangeText={val => handle_new_expense_amount_data(val.replace(/[^0-9]/g, ''), "other_amount")}
                                                        keyboardType="numeric"
                                                    >
                                                    </TextInput>
                                                </View>
                                                <View style={{ width: "50%" }}>
                                                    <TouchableOpacity onPress={(val) => handle_new_expense_image_data(val, "other_image")}>
                                                        <Text style={style.box_button_text}>Upload Image</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View></View>
                                }

                            </View>

                        </View>

                        {/* LAST FOUR BOOLEAN */}
                        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <View style={{ width: "100%", flexDirection: 'row' }}>
                                <View style={{ width: "15%", justifyContent: 'center' }}>
                                    <CheckBox
                                        value={new_expense_data?.toue_without_halt}
                                        onValueChange={(val) => handle_new_expense_data(val, "toue_without_halt")}
                                    />
                                </View>
                                <View style={{ width: "70%", justifyContent: 'center' }}>
                                    <Text style={[style.switch_text, { color: new_expense_data?.toue_without_halt ? 'black' : '#49658c' }]}>
                                        Toue Without Halt
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <View style={{ width: "100%", flexDirection: 'row' }}>
                                <View style={{ width: "15%", justifyContent: 'center' }}>
                                    <CheckBox
                                        value={new_expense_data?.Tour_with_night_halt}
                                        onValueChange={(val) => handle_new_expense_data(val, "Tour_with_night_halt")}
                                    />
                                </View>
                                <View style={{ width: "70%", justifyContent: 'center' }}>
                                    <Text style={[style.switch_text, { color: new_expense_data?.Tour_with_night_halt ? 'black' : '#49658c' }]}>
                                        Tour with Night Halt
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <View style={{ width: "100%", flexDirection: 'row' }}>
                                <View style={{ width: "15%", justifyContent: 'center' }}>
                                    <CheckBox
                                        value={new_expense_data?.working_at_hq_office}
                                        onValueChange={(val) => handle_new_expense_data(val, "working_at_hq_office")}
                                    />
                                </View>
                                <View style={{ width: "70%", justifyContent: 'center' }}>
                                    <Text style={[style.switch_text, { color: new_expense_data?.working_at_hq_office ? 'black' : '#49658c' }]}>
                                        working at HQ/ Office
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <View style={{ width: "100%", flexDirection: 'row' }}>
                                <View style={{ width: "15%", justifyContent: 'center' }}>
                                    <CheckBox
                                        value={new_expense_data?.leave_holiday}
                                        onValueChange={(val) => handle_new_expense_data(val, "leave_holiday")}
                                    />
                                </View>
                                <View style={{ width: "70%", justifyContent: 'center' }}>
                                    <Text style={[style.switch_text, { color: new_expense_data?.leave_holiday ? 'black' : '#49658c' }]}>
                                        Leave/Holiday
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>

                <View style={{ margin: 20 }}>
                    <View style={{ width: "100%", flexDirection: 'row', height: 56, backgroundColor: '#7ECD8B', borderRadius: 10, alignItems: 'center' }}>
                        <View style={{ width: "40%", marginLeft: 25 }}>
                            <Text style={{ color: '#FFF', fontFamily: 'Montserrat', fontSize: 16, fontWeight: '500' }}> ₹ {expense_total_amount}</Text>
                        </View>
                        <View style={{ width: "60%", alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={submit_expense} style={{ backgroundColor: '#388847', height: 40, borderRadius: 10, width: "50%", justifyContent: 'center', alignItems: 'center', marginRight: 50 }}>
                                <Text style={{ color: '#FFF', fontFamily: 'Montserrat', fontSize: 16, fontWeight: '500' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )

}


const style = StyleSheet.create({
    inputstyles: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
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
    container: {
        borderWidth: 0.5,
        borderColor: 'black',
        height: 60,
    },

    box: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,

    },
    box_textinput: {
        width: "50%",
        borderWidth: 0.3,
        borderColor: '#7ECD8B',
        backgroundColor: '#F9F9F9',
        height: 40
    },
    box_button_text: {
        color: '#7ECD8B',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 20
    },










    selectlist: {
        borderRadius: 6,
        marginTop: 20,
        gap: 5,
        padding: 5,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        backgroundColor: '#F2F2F2'
    },
    switch_text: {
        color: '#3D3D3D',
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold'
    },









})