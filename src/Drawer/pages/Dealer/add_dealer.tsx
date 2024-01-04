import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid
} from "react-native";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { APP_BASE_URL } from "../../../setting/setting";
import { Add_Dealer, City_List, State_List } from "../../../config/apiConstant";
import axiosInstance from '../../../config/axiosInstance';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment";


export const Add_Delar = ({ route, navigation }: any) => {


    // TYPES
    type add_dealer_datatype = {
        firm_name: string,
        full_name: string,
        email: string,
        mobile: string,
        alt_mobile_no: string,
        district: string,
        taluka: string,
        pincode: string,
        business_address: string,
        residence_address: string,
        pan_no: string,
        gst_no: string,
        aadhar_no: string,
        license_no: string,
        account_no: string,
        ifsc_code: string,
        bank_name: string,
        transport_facility: string
    }

    const [State, SetState] = useState<any>();
    const [SelectedState, SetSelectedState] = useState<number>();
    const [SelectedCity, SetSelectedCity] = useState<number>();
    const [City, SetCity] = useState<any>();
    const [valid_date, setvalid_date] = useState('');
    const [isValidDatePickerVisible, setValidDatePickerVisible] = useState(false);

    // VALIDATION
    const [errors, SetErrors] = useState<add_dealer_datatype>({
        firm_name: "",
        full_name: "",
        email: "",
        mobile: "",
        alt_mobile_no: "",
        district: "",
        taluka: "",
        pincode: "",
        business_address: "",
        residence_address: "",
        pan_no: "",
        gst_no: "",
        aadhar_no: "",
        license_no: "",
        account_no: "",
        ifsc_code: "",
        bank_name: "",
        transport_facility: "",
    });

    // NEW DEALER DATA
    const [New_Dealer_Data, SetNewDealerData] = useState<add_dealer_datatype>({
        firm_name: "",
        full_name: "",
        email: "",
        mobile: "",
        alt_mobile_no: "",
        district: "",
        taluka: "",
        pincode: "",
        business_address: "",
        residence_address: "",
        pan_no: "",
        gst_no: "",
        aadhar_no: "",
        license_no: "",
        account_no: "",
        ifsc_code: "",
        bank_name: "",
        transport_facility: ""
    });

    const [images, Setimages] = useState<any>({
        your_image: "",
        pan_card: "",
        license: "",
        gst: ""
    });

    const handleNewDealerData = (val: any, key: string) => {
        SetNewDealerData({ ...New_Dealer_Data, [key]: val })
    }

    // GET STATE
    const get_state_data = async () => {
        try {
            const response = await axios.get(APP_BASE_URL + State_List, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            {
                !window.cn(response.data.data) && response.data.data &&
                    SetState(response.data.data);
            }
        } catch (error) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>dddddddddddddddd>>>>error", error);
        }
    }

    // GET CITY
    const get_city_data = async () => {
        try {
            const response = await axios.get(APP_BASE_URL + City_List, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '
                },
                params: {
                    'state_id': SelectedState
                },
            });
            {
                !window.cn(response.data.data) && response.data.data &&
                    SetCity(response.data.data);
            }
        } catch (error) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>dddddddddddddddd>>>>error", error);
        }
    }

    useEffect(() => {
        get_state_data();
    }, [])

    useEffect(() => {
        get_city_data();
    }, [SelectedState])

    const on_press_add_dealer_to_home = () => {
        if (route.params === "dealer") {
            console.log("yes");
            navigation.navigate("Dealer")
        } else {
            console.log("no");
            navigation.navigate("Home")
        }
    }

    const handleState = (id: number) => {
        SetSelectedState(id);
    }

    const handleCity = (id: number) => {
        SetSelectedCity(id);
    }

    const validation_add_dealer = () => {

        let isError = false;
        let errors = {};
        let errors_add_dealer = {};

        if (!New_Dealer_Data.firm_name) {
            isError = true;
            errors = { ...errors, firm_name: " Enter Firm Name !!" }
        } else {
            errors = { ...errors, firm_name: " " }
        }

        if (!New_Dealer_Data.full_name) {
            isError = true;
            errors = { ...errors, full_name: " Enter Full Name !!" }
        } else {
            errors = { ...errors, full_name: " " }
        }

        if (!New_Dealer_Data.email) {
            isError = true;
            errors = { ...errors, email: " Enter Email !!" }
        } else {
            errors = { ...errors, email: " " }
        }

        if (!New_Dealer_Data.mobile) {
            isError = true;
            errors = { ...errors, mobile: " Enter Phone Number !!" }
        } else {
            errors = { ...errors, mobile: " " }
        }

        if (!New_Dealer_Data.alt_mobile_no) {
            isError = true;
            errors = { ...errors, alt_mobile_no: " Enter Alternate Mobile Number !!" }
        } else {
            errors = { ...errors, alt_mobile_no: " " }
        }

        if (!New_Dealer_Data.district) {
            isError = true;
            errors = { ...errors, district: " Enter District !!" }
        } else {
            errors = { ...errors, district: " " }
        }


        if (!New_Dealer_Data.taluka) {
            isError = true;
            errors = { ...errors, taluka: " Enter Taluka !!" }
        } else {
            errors = { ...errors, taluka: " " }
        }

        if (!New_Dealer_Data.pincode) {
            isError = true;
            errors = { ...errors, pincode: " Enter Pincode !!" }
        } else {
            errors = { ...errors, pincode: " " }
        }

        if (!New_Dealer_Data.business_address) {
            isError = true;
            errors = { ...errors, business_address: " Enter Business Address  !!" }
        } else {
            errors = { ...errors, business_address: " " }
        }

        if (!New_Dealer_Data.residence_address) {
            isError = true;
            errors = { ...errors, residence_address: " Enter Residence Address !!" }
        } else {
            errors = { ...errors, residence_address: " " }
        }

        if (!New_Dealer_Data.pan_no) {
            isError = true;
            errors = { ...errors, pan_no: " Enter PAN Number !!" }
        } else {
            errors = { ...errors, pan_no: " " }
        }

        if (!New_Dealer_Data.gst_no) {
            isError = true;
            errors = { ...errors, gst_no: " Enter GST Number !!" }
        } else {
            errors = { ...errors, gst_no: " " }
        }

        if (!New_Dealer_Data.aadhar_no) {
            isError = true;
            errors = { ...errors, aadhar_no: " Enter Aadhar Card Number !!" }
        } else {
            errors = { ...errors, aadhar_no: " " }
        }

        if (!New_Dealer_Data.license_no) {
            isError = true;
            errors = { ...errors, license_no: " Enter LICENSE Number !!" }
        } else {
            errors = { ...errors, license_no: " " }
        }

        if (!New_Dealer_Data.account_no) {
            isError = true;
            errors = { ...errors, account_no: " Enter Account Number !!" }
        } else {
            errors = { ...errors, account_no: " " }
        }

        if (!New_Dealer_Data.ifsc_code) {
            isError = true;
            errors = { ...errors, ifsc_code: " Enter IFSC Code !!" }
        } else {
            errors = { ...errors, ifsc_code: " " }
        }

        if (!New_Dealer_Data.bank_name) {
            isError = true;
            errors = { ...errors, bank_name: " Enter Bank Name !!" }
        } else {
            errors = { ...errors, bank_name: " " }
        }

        if (!SelectedState) {
            isError = true;
            errors = { ...errors, SelectedState: " Select State !!" }
        } else {
            errors = { ...errors, SelectedState: " " }
        }

        if (!SelectedCity) {
            isError = true;
            errors = { ...errors, SelectedCity: " Select City !!" }
        } else {
            errors = { ...errors, SelectedCity: " " }
        }

        if (!valid_date) {
            isError = true;
            errors = { ...errors, Valid_date: " Enter Valid Date !!" }
        } else {
            errors = { ...errors, Valid_date: " " }
        }

        

        if (!images?.your_image[0]?.uri) {
            isError = true;
            errors = { ...errors, photo: " Select Your Image  !!" }
        } else {
            errors = { ...errors, photo: " " }
        }

        if (!images?.pan_card[0]?.uri) {
            isError = true;
            errors = { ...errors, pan_card: " Select PAN Card Copy !!" }
        } else {
            errors = { ...errors, pan_card: " " }
        }

        if (!images?.license[0]?.uri) {
            isError = true;
            errors = { ...errors, license_copy: " Select LICENSE Copy !!" }
        } else {
            errors = { ...errors, license_copy: " " }
        }

        if (!images?.gst[0]?.uri) {
            isError = true;
            errors = { ...errors, gst_copy: " Select GST Copy !!" }
        } else {
            errors = { ...errors, gst_copy: " " }
        }

        errors_add_dealer = { isError, errors }

        return errors_add_dealer;
    }

    const showStartDatePicker = () => {
        setValidDatePickerVisible(true);
    };

    const hideStartDatePicker = () => {
        setValidDatePickerVisible(false);
    };

    const handleStartDateConfirm = (date) => {
        setvalid_date(date.toLocaleDateString());
        hideStartDatePicker();
    };
    var moment = require('moment');
    const click_new_dealer_submit = async () => {
       
        const { isError, errors }: any = validation_add_dealer();
        SetErrors(errors);
        if (!isError) {
            try {
                let formData: any = new FormData();

                formData.append("firm_name", New_Dealer_Data?.firm_name);
                formData.append("full_name", New_Dealer_Data?.full_name);
                formData.append("email", New_Dealer_Data?.email);
                formData.append("mobile", New_Dealer_Data?.mobile);
                formData.append("alt_mobile_no", New_Dealer_Data?.alt_mobile_no);
                formData.append("city", SelectedCity);
                formData.append("state", SelectedState);
                formData.append("district", New_Dealer_Data?.district);
                formData.append("taluka", New_Dealer_Data?.taluka);
                formData.append("pincode", New_Dealer_Data?.pincode);
                formData.append("business_address", New_Dealer_Data?.business_address);
                formData.append("residence_address", New_Dealer_Data?.residence_address);
                formData.append("pan_no", New_Dealer_Data?.pan_no);
                formData.append("gst_no", New_Dealer_Data?.gst_no);
                formData.append("aadhar_no", New_Dealer_Data?.aadhar_no);
                formData.append("license_no", New_Dealer_Data?.license_no);
                formData.append("valid_upto", moment(valid_date, 'DD/MM/YYYY').format('YYYY-MM-DD'));

                formData.append(
                    "bank_details", JSON.stringify({
                        account_no: New_Dealer_Data.account_no,
                        ifsc_code: New_Dealer_Data.ifsc_code,
                        bank_name: New_Dealer_Data.bank_name
                    })
                );
                formData.append("transport_facility", New_Dealer_Data?.transport_facility);

                formData.append("photo", {
                    uri: images?.your_image[0]?.uri,
                    name: images?.your_image[0]?.name,
                    type: images?.your_image[0]?.type
                });

                formData.append("pancard", {
                    uri: images?.pan_card[0]?.uri,
                    name: images?.pan_card[0]?.name,
                    type: images?.pan_card[0]?.type
                });

                formData.append("seed_license_copy", {
                    uri: images?.license[0]?.uri,
                    name: images?.license[0]?.name,
                    type: images?.license[0]?.type
                });

                formData.append("gstin_reg_copy", {
                    uri: images?.gst[0]?.uri,
                    name: images?.gst[0]?.name,
                    type: images?.gst[0]?.type
                });

                let apiUrl = Add_Dealer;
                const response = await axiosInstance.post(apiUrl, formData);
                
                if (response.data) {
                    ToastAndroid.showWithGravityAndOffset(
                        'Dealer Lead Added Successfully !!',    
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

    }


    const handleChoosePhoto = async (val: any, key: string) => {
        const result: any = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles]
        })

        console.log(">>>>>>>>>>>>>>>>>.result",result)

        if (result != null) {
            Setimages({ ...images, [key]: result })
        }

        //    ONLY IMAGE SELECT CODE
        // const result: any = await DocumentPicker.getDocumentAsync({
        //     copyToCacheDirectory: false,
        // })


        // launchImageLibrary({ noData: true }, (response) => {
        //     if (response.assets && response.assets[0] && response.assets[0].uri) {
        //         Setimages({ ...images, [key]: response.assets[0] })
        //     } else if (response.didCancel === true) {
        //         Setimages({ ...images, [key]: "" })
        //     }
        // });
    };





    return (
        <SafeAreaView style={{ backgroundColor: 'white', height: "100%" }}>


            {/* HEADER */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
                <View style={{ width: "15%" }}>
                    <TouchableOpacity onPress={on_press_add_dealer_to_home}>
                        <View style={{ alignItems: 'center' }}>

                            <Ionicons
                                name="arrow-back-outline" size={25} color='#388847'
                            />

                        </View>
                        {/* <Image style={{ width: 20, height: 20 }} source={require('../assets/images/backicon.png')} /> */}
                    </TouchableOpacity>
                </View>
                <View style={{ width: "75%", alignItems: 'center' }}>
                    <Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Add Dealers</Text>
                </View>
            </View>

            <ScrollView>

                {/* INPUT FIELDS */}
                <View>
                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'Enter Firm Name'}
                            onChangeText={(val) => handleNewDealerData(val, "firm_name")}
                            staticLabel
                            value={New_Dealer_Data.firm_name}
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

                    {
                        errors.firm_name ? <View><Text style={style.error_msg}>{errors.firm_name}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'Enter Full Name'}
                            onChangeText={(val) => handleNewDealerData(val, "full_name")}
                            staticLabel
                            value={New_Dealer_Data.full_name}
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

                    {
                        errors.full_name ? <View><Text style={style.error_msg}>{errors.full_name}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'Enter Phone Number'}
                            keyboardType="numeric"
                            onChangeText={(val) => handleNewDealerData(val.replace(/[^0-9]/g, ''), "mobile")}
                            maxLength={10}
                            staticLabel
                            value={New_Dealer_Data.mobile}
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

                    {
                        errors.mobile ? <View><Text style={style.error_msg}>{errors.mobile}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER ALTERNATE NUMBER'}
                            keyboardType="numeric"
                            onChangeText={(val) => handleNewDealerData(val.replace(/[^0-9]/g, ''), "alt_mobile_no")}
                            maxLength={10}
                            value={New_Dealer_Data.alt_mobile_no}
                            staticLabel
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

                    {
                        errors.alt_mobile_no ? <View><Text style={style.error_msg}>{errors.alt_mobile_no}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER EMAIL ADDRESS'}
                            onChangeText={(val) => handleNewDealerData(val, "email")}
                            staticLabel
                            value={New_Dealer_Data.email}
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

                    {
                        errors.email ? <View><Text style={style.error_msg}>{errors.email}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER BUSINESS ADDRESS'}
                            onChangeText={(val) => handleNewDealerData(val, "business_address")}
                            staticLabel
                            value={New_Dealer_Data.business_address}
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

                    {
                        errors.business_address ? <View><Text style={style.error_msg}>{errors.business_address}</Text></View> : null
                    }


                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER RESIDENCE ADDRESS'}
                            onChangeText={(val) => handleNewDealerData(val, "residence_address")}
                            value={New_Dealer_Data.residence_address}
                            staticLabel
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

                    {
                        errors.residence_address ? <View><Text style={style.error_msg}>{errors.residence_address}</Text></View> : null
                    }


                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                        <View style={{ width: "100%", height: 60, borderWidth: 0.5, marginTop: 20 }}>
                            <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                <Text style={[style.labelStyle, { color: SelectedState ? 'black' : '#49658c' }]}>
                                    SELECT STATE
                                </Text>
                            </View>
                            {!window.cn(State) && State &&
                                <View>
                                    <Dropdown
                                        data={!window.cn(State) && State}
                                        search
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        itemTextStyle={{ color: 'black' }}
                                        selectedTextStyle={[style.inputstyles, { marginTop: 20, height: 50 }]}
                                        placeholderStyle={{ width: 0, height: 0 }}
                                        iconStyle={{ marginRight: 5, marginTop: 20 }}
                                        iconColor='black'
                                        placeholder="SELECT STATE"
                                        searchPlaceholder="Search..."
                                        onChange={item => handleState(item.id)}
                                    />
                                </View>
                            }
                        </View>
                    </View>

                    {
                        errors.SelectedState ? <View><Text style={style.error_msg}>{errors.SelectedState}</Text></View> : null
                    }


                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                        <View style={{ width: "100%", height: 60, borderWidth: 0.5, marginTop: 20 }}>
                            <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                <Text style={[style.labelStyle, { color: SelectedCity ? 'black' : '#49658c' }]}>
                                    SELECT CITY
                                </Text>
                            </View>
                            {!window.cn(City) && City &&
                                <View>
                                    <Dropdown
                                        data={!window.cn(City) && City}
                                        search
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        itemTextStyle={{ color: 'black' }}
                                        selectedTextStyle={[style.inputstyles, { marginTop: 20, height: 50 }]}
                                        placeholderStyle={{ width: 0, height: 0 }}
                                        iconStyle={{ marginRight: 5, marginTop: 20 }}
                                        iconColor='black'
                                        placeholder="SELECT CITY"
                                        searchPlaceholder="Search..."
                                        onChange={item => handleCity(item.id)}
                                    />
                                </View>
                            }
                        </View>
                    </View>

                    {
                        errors.SelectedCity ? <View><Text style={style.error_msg}>{errors.SelectedCity}</Text></View> : null
                    }


                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER TALUKA'}
                            onChangeText={(val) => handleNewDealerData(val, "taluka")}
                            value={New_Dealer_Data.taluka}
                            staticLabel
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

                    {
                        errors.taluka ? <View><Text style={style.error_msg}>{errors.taluka}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER DISTRICT'}
                            onChangeText={(val) => handleNewDealerData(val, "district")}
                            value={New_Dealer_Data.district}
                            staticLabel
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

                    {
                        errors.district ? <View><Text style={style.error_msg}>{errors.district}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER PINCODE'}
                            onChangeText={(val) => handleNewDealerData(val.replace(/[^0-9]/g, ''), "pincode")}
                            value={New_Dealer_Data.pincode}
                            staticLabel
                            keyboardType="numeric"
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

                    {
                        errors.pincode ? <View><Text style={style.error_msg}>{errors.pincode}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER PAN CARD NO'}
                            onChangeText={(val) => handleNewDealerData(val, "pan_no")}
                            value={New_Dealer_Data.pan_no}
                            staticLabel
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

                    {
                        errors.pan_no ? <View><Text style={style.error_msg}>{errors.pan_no}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER AADHAR CARD NO'}
                            keyboardType="numeric"
                            onChangeText={(val) => handleNewDealerData(val.replace(/[^0-9]/g, ''), "aadhar_no")}
                            value={New_Dealer_Data.aadhar_no}
                            staticLabel
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

                    {
                        errors.aadhar_no ? <View><Text style={style.error_msg}>{errors.aadhar_no}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER GST NO'}
                            onChangeText={(val) => handleNewDealerData(val, "gst_no")}
                            value={New_Dealer_Data.gst_no}
                            staticLabel
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

                    {
                        errors.gst_no ? <View><Text style={style.error_msg}>{errors.gst_no}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER LICENSE NO'}
                            onChangeText={(val) => handleNewDealerData(val, "license_no")}
                            value={New_Dealer_Data.license_no}
                            staticLabel
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

                    {
                        errors.license_no ? <View><Text style={style.error_msg}>{errors.license_no}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER TRANPORT FACILITY'}
                            onChangeText={(val) => handleNewDealerData(val, "transport_facility")}
                            value={New_Dealer_Data.transport_facility}
                            staticLabel
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

                    {
                        errors.transport_facility ? <View><Text style={style.error_msg}>{errors.transport_facility}</Text></View> : null
                    }


                    <View>
                        <Text style={{ color: '#37B600', fontFamily: 'Montserrat', fontStyle: 'normal', fontSize: 16, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>Bank Details</Text>
                    </View>


                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER BANK NAME'}
                            onChangeText={(val) => handleNewDealerData(val, "bank_name")}
                            value={New_Dealer_Data.bank_name}
                            staticLabel
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

                    {
                        errors.bank_name ? <View><Text style={style.error_msg}>{errors.bank_name}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER IFSC CODE'}
                            onChangeText={(val) => handleNewDealerData(val, "ifsc_code")}
                            value={New_Dealer_Data.ifsc_code}
                            staticLabel
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

                    {
                        errors.ifsc_code ? <View><Text style={style.error_msg}>{errors.ifsc_code}</Text></View> : null
                    }

                    <View style={style.floating_input_fields}>
                        <FloatingLabelInput
                            label={'ENTER ACCOUNT NUMBER'}
                            onChangeText={(val) => handleNewDealerData(val.replace(/[^0-9]/g, ''), "account_no")}
                            value={New_Dealer_Data.account_no}
                            staticLabel
                            keyboardType="numeric"
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

                    {
                        errors.account_no ? <View><Text style={style.error_msg}>{errors.account_no}</Text></View> : null
                    }

                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                        <View style={{ width: "100%", height: 60, borderWidth: 0.5, marginTop: 20 }}>
                            <View style={{ position: 'absolute', top: -8, left: 17 }}>
                                <Text style={[style.labelStyle, { color: valid_date ? 'black' : '#49658c' }]}>
                                    Valid Date
                                </Text>
                            </View>
                            <View>

                                <TouchableOpacity style={{ marginLeft: 10, marginRight: 10 }} onPress={showStartDatePicker}>
                                    <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ width: "50%", justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginTop: 5, marginLeft: 10 }}>{valid_date || 'Select Start Date'}</Text>
                                        </View>
                                        <View>
                                            <Fontisto
                                                name="date" size={25} color='black'
                                            />
                                        </View>
                                        {/* <View style={{ width: "50%", justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Image style={{ width: 24, height: 24 }} source={require('../../../assets/images/date1.png')} />
                                        </View> */}
                                    </View>

                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={isValidDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleStartDateConfirm}
                                    onCancel={hideStartDatePicker}
                                />

                            </View>
                        </View>
                    </View>

                    {
                        errors.Valid_date ? <View><Text style={style.error_msg}>{errors.Valid_date}</Text></View> : null
                    }

                    <View style={style.upload_field_view}>
                    <Text style={[style.upload_field_text, {color: images.your_image[0] ? 'black' : '#49658c'}]} >UPLOAD YOUR IMAGE </Text>
                        <TouchableOpacity style={style.upload_field_input} onPress={(val) => handleChoosePhoto(val, "your_image")}>
                            <Text style={{ fontWeight: 'bold', color: '#37B600' }}>Upload Image</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        errors.photo ? <View><Text style={style.error_msg}>{errors.photo}</Text></View> : null
                    }

                    {/* {images?.your_image[0]?.uri && (
                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: images.your_image[0].uri }}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    )} */}

                    <View style={style.upload_field_view}>
                        <Text style={[style.upload_field_text, {color: images.pan_card[0] ? 'black' : '#49658c'}]} >UPLOAD PAN CARD COPY </Text>
                        <TouchableOpacity style={style.upload_field_input} onPress={(val) => handleChoosePhoto(val, 'pan_card')}>
                            <Text style={{ fontWeight: 'bold', color: '#37B600' }}>Upload Pan Card Copy</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        errors.pan_card ? <View><Text style={style.error_msg}>{errors.pan_card}</Text></View> : null
                    }

                    {/* {images?.pan_card[0]?.uri && (
                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: images.pan_card[0].uri }}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    )} */}

                    <View style={style.upload_field_view}>
                        <Text style={[style.upload_field_text, {color: images.license[0] ? 'black' : '#49658c'}]} >UPLOAD SEED LICENSE COPY </Text>
                        <TouchableOpacity style={style.upload_field_input} onPress={(val) => handleChoosePhoto(val, 'license')}>
                            <Text style={{ fontWeight: 'bold', color: '#37B600' }}>Upload Seed License Copy</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        errors.license_copy ? <View><Text style={style.error_msg}>{errors.license_copy}</Text></View> : null
                    }

                    {/* {images?.license[0]?.uri && (
                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: images.license[0].uri }}
                                style={{ width: 100, height: 100 }}
                            />
                            
                        </View>
                    )} */}

                    <View style={style.upload_field_view}>
                        <Text style={[style.upload_field_text, {color: images.gst[0] ? 'black' : '#49658c'}]} >UPLOAD GST COPY </Text>
                        <TouchableOpacity style={style.upload_field_input} onPress={(val) => handleChoosePhoto(val, 'gst')}>
                            <Text style={{ fontWeight: 'bold', color: '#37B600' }}>Upload Gst Copy</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        errors.gst_copy ? <View><Text style={style.error_msg}>{errors.gst_copy}</Text></View> : null
                    }

                    <View style={{marginBottom: 10}}></View>

                    {/* {images?.gst[0]?.uri && (
                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: images.gst[0].uri }}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    )} */}

                </View>

                {/* BUTTON */}
                <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                    <TouchableOpacity style={style.button} onPress={click_new_dealer_submit}>
                        <Text style={style.button_text}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}


const style = StyleSheet.create({
    selectlist: {
        borderRadius: 6,
        gap: 5,
        padding: 5,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#388847',
        borderRadius: 10,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text: {
        color: '#FFF',
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    upload_field_view: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    upload_field_text: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginLeft: 20,
        fontWeight: '500',
        marginBottom: 5,
        marginTop: 5
    },
    upload_field_input: {
        borderWidth: 2,
        borderStyle: 'dashed',
        height: 50,
        orderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#37B600',
        marginTop: 5
    },
    floating_input_fields: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
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
    error_msg: {
        marginLeft: "5%",
        fontFamily: 'Montserrat',
        position: 'absolute',
        marginBottom: 5,
        color: 'red'
    }
})