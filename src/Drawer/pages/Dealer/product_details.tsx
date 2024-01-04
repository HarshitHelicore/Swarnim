import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { APP_BASE_URL } from "../../../setting/setting";
import { Crop_Data } from "../../../config/apiConstant";
import { Icon } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

import AntDesign from 'react-native-vector-icons/AntDesign';





export const Product_Details = ({ navigation, route }: any) => {

    const [varietydata, Setvarietydata] = useState<any>();
    const [product_details, Setproductdetails] = useState<any>();
    const [variety, Setvariety] = useState<any>();
    const [weight, SetWeight] = useState<any>();
    const [amount, Setamount] = useState<number>();
    const [selectedvarityid, setselectedvarity] = useState<number>();
    const [productdetails, setproductdetailsdata] = useState<any>();

    const [isCart, SetCart] = useState<boolean>(false);
    const [cardtcount, Setcardtcount] = useState<number>(0);

    const [quantity, setquantity] = useState<number>(0);

    const [image, Setimage] = useState<any>();

    //testing
    const [dealer_id, Setdealeid] = useState<number>();
    const [crop_id, SetCropID] = useState<any>();
    const [product_name, SetProductName] = useState<any>();
    const [products, SetProducts] = useState<any>();
    const [user_id, SetUserId] = useState<any>();

    const get_data = async() => {
        const user_datas: any = await AsyncStorage.getItem('user_datats');
        const demo_user_datas = JSON.parse(user_datas)
        {!window.cn(demo_user_datas) && demo_user_datas &&
            SetUserId(demo_user_datas.id);
        }
    }

    useEffect(() => {
        
        get_data();
        {
            !window.cn(route.params.dealer_id) && route.params.dealer_id &&
                Setdealeid(route.params.dealer_id);
        }
        {
            !window.cn(route.params.product_details.crop_id) && route.params.product_details.crop_id &&
                SetCropID(route.params.product_details.crop_id);
        }
        {
            !window.cn(route.params.product_details) && route.params.product_details &&
                Setproductdetails(route.params.product_details);
        }
        {
            !window.cn(route.params.product_details.variety) && route.params.product_details.variety &&
                Setvariety(route.params.product_details.variety);
        }
        {
            !window.cn(route.params.product_details.photo) && route.params.product_details.photo &&
                Setimage(route.params.product_details.photo);
        }
    }, [])

    const get_weight_data = async () => {


        const user_token: any = await AsyncStorage.getItem('token');

        try {
            let id: number = 0;
            {
                !window.cn(selectedvarityid) && selectedvarityid &&
                    (

                        id = selectedvarityid

                    )
            }

            const response = await axios.get(APP_BASE_URL + Crop_Data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user_token
                },
                params: {
                    "crop_id": route.params.product_details.crop_id,
                    "variety_id": id,
                    "dealer_id": route.params.dealer_id
                }
            });
            {
                !window.cn(response.data.data) && response.data.data &&
                    setproductdetailsdata(response.data.data);
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

    useEffect(() => {
        get_weight_data();
    }, [selectedvarityid])

    // useEffect (() => {

    // }, [])

    const press_back = () => {
        navigation.navigate('Place Order');
    }

    const selectedvarity = (item: any) => {
        if (item) {
            setselectedvarity(item.id);
        }
    }

    const selectweight = (item: any) => {
        if (item) {
            SetWeight(item.weight);
            Setamount(item.amount);
        }
    }

    const add_to_cart = () => {

        console.log(">>>>>>>>>>user_id",user_id)
        try {

            let formData: any = new FormData();
            formData.append("user_id", user_id);
            formData.append("dealer_id", dealer_id );

            formData.append(
                "item_obj", JSON.stringify({
                    crop:crop_id,
                    variety:selectedvarityid,
                    packing_size:weight,
                    quantity:quantity
                })
            )


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

    const handlequantity = (val: number) => {
        setquantity(val);
    }

    return (
        <>
            <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>

                {/* HEADER */}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "3%", marginBottom: "3%" }}>
                    <View style={{ width: "15%" }}>
                        <TouchableOpacity onPress={press_back}>
                            <View style={{ alignItems: 'center' }}>

                                <Ionicons
                                    name="arrow-back-outline" size={25} color='#388847'
                                />

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "75%", alignItems: 'center' }}>
                        <Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Selected Product Detail</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={add_to_cart}>
                            <AntDesign
                                name="shoppingcart" size={25} color='#388847'
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>


                    {/* CONTENT */}
                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 100, marginBottom: 20 }}>
                        <View style={{ width: "100%", height: "100%" }}>
                            {/* IMAGE */}
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {!window.cn(image) && image &&
                                    <Image style={{ height: 100, width: 100 }} source={{
                                        uri: image
                                    }} />
                                }

                            </View>

                            <View style={[styles.field, { marginTop: "10%" }]}>
                                {!window.cn(route.params.product_details) && route.params.product_details &&
                                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                                        {route.params.product_details.crop_name}
                                    </Text>
                                }
                            </View>
                            {!window.cn(amount) && amount &&
                                <>
                                    {amount ? <View>
                                        <Text style={{ fontSize: 20, fontWeight: '600', fontFamily: 'Montserrat' }}>
                                            ₹ {amount}
                                        </Text>
                                    </View> :
                                        <View></View>}
                                </>
                            }
                            <View style={[styles.field]}>
                                <Dropdown
                                    iconColor="black"
                                    style={styles.selectlist}
                                    placeholderStyle={{ color: 'black', marginLeft: 5 }}
                                    selectedTextStyle={{ color: 'black', marginLeft: 5 }}
                                    containerStyle={{ borderRadius: 10 }}
                                    itemContainerStyle={{ borderRadius: 10, borderBottomWidth: 0.5 }}
                                    itemTextStyle={{ color: 'black' }}

                                    data={variety}
                                    search
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="id"
                                    placeholder="Select Verity"
                                    searchPlaceholder="Search..."
                                    onChange={item => selectedvarity(item)}
                                />
                            </View>
                            {!window.cn(productdetails) && productdetails &&
                                <View style={[styles.field]}>
                                    <Dropdown
                                        iconColor="black"
                                        style={styles.selectlist}
                                        placeholderStyle={{ color: 'black', marginLeft: 5 }}
                                        selectedTextStyle={{ color: 'black', marginLeft: 5 }}
                                        containerStyle={{ borderRadius: 10 }}
                                        itemContainerStyle={{ borderRadius: 10, borderBottomWidth: 0.5 }}
                                        itemTextStyle={{ color: 'black' }}
                                        data={productdetails}
                                        search
                                        maxHeight={300}
                                        labelField="weight"
                                        valueField="weight"
                                        placeholder="Select Weight"
                                        searchPlaceholder="Search..."
                                        onChange={item => selectweight(item)}
                                    />
                                </View>
                            }
                            <View style={{ borderWidth: 1, marginTop: 20, borderRadius: 10 }}>
                                <TextInput style={{ marginLeft: 5, color: 'black' }}
                                    placeholderTextColor='black'
                                    onChangeText={val => handlequantity(val.replace(/[^0-9]/g, ''))}
                                    value={quantity}
                                    placeholder="Quantity"
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, borderColor: '#388847' }}>

                                <View style={{ marginLeft: -50 }}>


                                    <TouchableOpacity onPress={add_to_cart}>
                                        <View style={[styles.button, { backgroundColor: '#388847' }]}>
                                            <Text style={{ color: 'white' }}>Add to Cart</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View>

                                    <TouchableOpacity onPress={press_back}>
                                        <View style={styles.button}>
                                            <Text style={{ color: '#388847' }}>Go Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </View>

                </ScrollView>

            </SafeAreaView>
        </>
    )

}

const styles = StyleSheet.create({
    selectlist: {
        borderRadius: 6,
        gap: 5,
        padding: 5,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: 'black'
    },
    button: {
        height: 50,
        borderWidth: 1,
        width: '200%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#388847',
        borderRadius: 10,
    },
    field: {
        marginTop: 20
    }
})

