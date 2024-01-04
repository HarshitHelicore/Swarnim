import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image, Linking } from "react-native"
import { normalize } from "react-native-elements"
import { useEffect, useState } from "react"
import { log } from "react-native-reanimated"
import { FloatingAction } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Dealer_Profile = ({ route, navigation }: any) => {

    const [loader, Setloader] = useState(false);


    const get_data = () => {
        console.log(">>>>>Demodmeomdoemodemoemodm");
    }


    // DEALER PROFILE DATA
    const [dealerdata, Setdealerdata] = useState<any>();

    const [click_button, SetClickButton] = useState<boolean>(true);

    const press_orders = () => {
        console.log("pressed",);
        SetClickButton(true);
    }

    useEffect(() => {
        route.params.user_data ? Setdealerdata(route.params.user_data) : Setdealerdata({});
    }, [])

    const press_payment = () => {
        SetClickButton(false);
    }

    const press_back = () => {
        navigation.navigate('Delar List');
    }

    const press_on_place_order = () => {
        const data_dealer = route.params.user_data
        navigation.navigate('Place Order', { dealer: data_dealer });
    }

    const actions = [
        {
            text: "Email",
            icon: require("../../../assets/images/email.png"),
            name: "email",
            position: 3,
            color: "#71AE57",
        },
        {
            text: "Call",
            icon: require("../../../assets/images/call.png"),
            name: "call",
            position: 4,
            color: "#71AE57",
        },
        
        {
            text: "Check In",
            icon: require("../../../assets/images/checkin.png"),
            name: "check_in",
            position: 2,
            color: "#71AE57",

        },
        {
            text: "Place Order",
            icon: require("../../../assets/images/place_order.png"),
            name: "place_order",
            position: 1,
            color: "#71AE57",
        },
    ];

    const press_dealerhandler = (name: any) => {
        if (name === "call") {
            if (dealerdata && dealerdata.mobile) {
                Linking.openURL(`tel:${dealerdata.mobile}`)
            } else {
                Linking.openURL(`tel:`)   
            }
        }
        if ( name === "email"){
            if (dealerdata && dealerdata.email) {
                Linking.openURL(`mailto:${dealerdata.email}`)
            } else {
                Linking.openURL(`mailto:`)   
            }
        }
        if (name === "check_in") {
            navigation.navigate("Half Leave");
        }
        if (name === "place_order") {
            const data_dealer = route.params.user_data
            navigation.navigate('Place Order', { dealer: data_dealer });
        }

    }


    return (
        <>
            <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>

                {/* LOADER */}
                {loader ?
                    <View style={{ height: "100%", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color='black' />
                    </View>
                    : null}

                {/* HEADER */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
                    <View style={{ width: "15%" }}>
                        <TouchableOpacity onPress={press_back}>
                            <View style={{ alignItems: 'center' }}>

                                <Ionicons
                                    name="arrow-back-outline" size={25} color='#388847'
                                />

                            </View>
                            {/* <Image style={{ width: 20, height: 20 }} source={require('../assets/images/backicon.png')} /> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "75%", alignItems: 'center' }}>
                        <Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Dealer Profile</Text>
                    </View>
                </View>

                {/* CONTENT */}
                <ScrollView>
                    {!window.cn(dealerdata) && dealerdata &&
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <View style={{ width: "100%" }}>
                                <View style={{ height: 130, backgroundColor: "#F9F9F9", borderRadius: 20, borderWidth:0.3 }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        {/* IMAGE */}
                                        <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center', marginTop: 13, borderWidth:1, borderColor:'black', borderRadius: 100, marginLeft: 5 }}>
                                            <Image style={{ width: 88, height: 100 }} source={dealerdata.photo ? { uri: !window.cn(dealerdata.photo) && dealerdata.photo } : require('../../../assets/images/aa.png')} />
                                        </View>

                                        <View style={{ width: "60%", justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.box_text}>{!window.cn(dealerdata.firm_name) && dealerdata.firm_name}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    }
                    <>  
                        {/* DETAILS */}
                        {!window.cn(dealerdata) && dealerdata &&
                            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, height: "auto", borderRadius: 20, borderWidth:0.5, borderTopLeftRadius:20, borderTopRightRadius: 20, borderBottomLeftRadius:20, borderBottomRightRadius:20, marginBottom: 20,backgroundColor: "#F9F9F9" }}>
                                <View style={{ width: "100%" }}>
                                    <View style={{ width: "100%", borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 20, borderTopEndRadius: 20 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 5, marginTop: 5, color: 'black' }}>Details</Text>
                                    </View>


                                    {/*CONTECT DETAILS */}

                                    <View style={{ marginLeft: 15, marginTop: 20, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', borderBottomWidth: 1, marginBottom: 10 }}>
                                            Contect Details
                                        </Text>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Email</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.email}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Mobile No</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.mobile}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Alternative No</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.alt_mobile_no}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>


                                    {/* RESIDENCE DETAILS */}

                                    <View style={{ marginLeft: 15, marginTop: 20, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', borderBottomWidth: 1, marginBottom: 10 }}>
                                            Residence Details
                                        </Text>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>state</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.state}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Taluka</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.taluka}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Pincode</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.pincode}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Address</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.residence_address}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>


                                    {/* BUSINESS DEAILS */}

                                    <View style={{ marginLeft: 15, marginTop: 20, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', borderBottomWidth: 1, marginBottom: 10 }}>
                                            Business Details
                                        </Text>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Address</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.business_address}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>


                                    {/* PERSONAL DETAILS */}

                                    <View style={{ marginLeft: 15, marginTop: 20, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', borderBottomWidth: 1, marginBottom: 10 }}>
                                            Personal Details
                                        </Text>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Aadhar Card No</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.aadhar_no}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Pan Card No</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.pan_no}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>License No</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.license_no}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>GST No</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.gst_no}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>


                                    {/* BANK DETAILS */}

                                    <View style={{ marginLeft: 15, marginTop: 20, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', borderBottomWidth: 1, marginBottom: 10 }}>
                                            Bank Details
                                        </Text>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Bank Name</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.bank_name}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Account Number</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.account_no}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginLeft: 15, marginRight: 20, marginTop: 5, marginBottom: 10 }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "40%" }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>IFSC Code</Text>
                                                </View>
                                                <View style={{ width: "60%" }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 13 }}>
                                                        {dealerdata.ifsc_code}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            </View>

                        }
                    </>

                    {/* <View style={{ margin: 20 }}>

                    <View style={{ width: "100%", flexDirection: 'row', height: 40, borderRadius: 30, backgroundColor: '#7ECD8B', justifyContent: 'space-around', alignItems: 'center' }}>

                        <View style={{ width: "45%", borderRadius: 50, alignItems: 'center', backgroundColor: click_button ? 'white' : '#7ECD8B', height: 30, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => press_orders()}>
                                <Text style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontSize: 16, fontWeight: click_button ? 'bold' : '500', color: click_button ? '#388847' : 'white' }}>Orders</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "45%", borderRadius: 50, alignItems: 'center', backgroundColor: click_button ? '#7ECD8B' : 'white', height: 30, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={press_payment}>
                                <Text style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontSize: 16, fontWeight: click_button ? '500' : 'bold', color: click_button ? 'white' : '#388847' }}>Payment</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </View> */}

                    {/* <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: "80%" }}>
                        <View >
                            <TouchableOpacity>
                                <View style={[styles.order_buttons]}>
                                    <Text style={{ fontFamily: 'Montserrat', color: 'black', fontSize: 16, fontStyle: 'normal', fontWeight: 'bold', }}>Check In</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View >
                            <TouchableOpacity onPress={press_on_place_order}>
                                <View style={styles.order_buttons}>
                                    <Text style={{ fontFamily: 'Montserrat', color: 'black', fontSize: 16, fontStyle: 'normal', fontWeight: 'bold' }}>Place Order</Text>

                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View> */}

                </ScrollView>

                {/* <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10,marginTop: 10 }}>
                <View style={{ width: "100%" }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', borderRadius:20}}>
                        <View>
                            <TouchableOpacity>
                                <View style={[styles.order_buttons]}>
                                    <Text style={{ fontFamily: 'Montserrat', color: 'black', fontSize: 16, fontStyle: 'normal', fontWeight: 'bold', }}>Check In</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View>
                            <TouchableOpacity onPress={press_on_place_order}>
                                <View style={styles.order_buttons}>
                                    <Text style={{ fontFamily: 'Montserrat', color: 'black', fontSize: 16, fontStyle: 'normal', fontWeight: 'bold' }}>Place Order</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View> */}
                <FloatingAction
                    color="#388847"
                    actions={actions}
                    position="right"
                    onPressItem={(name) => press_dealerhandler(name)}

                />

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 140,
        borderRadius: 20,
        margin: 20,
        backgroundColor: 'rgba(126, 205, 139, 0.70)'
    },
    box_text: {
        color: '#171C15',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontSize: 18,
    },
    child_box: {
        height: 84,
        margin: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.29)'
    },
    child_box_text: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    payment_method_text: {
        color: '#000',
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500'
    },
    order_buttons: {
        backgroundColor: '#7ECD8B',
        height: 56,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})