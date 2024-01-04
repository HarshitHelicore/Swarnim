import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import SearchBar from 'react-native-search-bar';
import { APP_BASE_URL } from "../../../setting/setting";
import { Stock_Data } from "../../../config/apiConstant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';



export const Place_Order_list = ({ route, navigation, dealer_id }: any) => {

    const [place_order_data, Set_place_order_data] = useState<any>();
    const [dealerid, Setdealerid] = useState<number>();
    const [search_data, Setsearchdata] = useState<any>("");

    const [loader, Setloader] = useState<boolean>(false);

    const [crops, SetCrops] = useState<any>();

    const get_stock_data = async () => {
        let product_details = {}
        const product = JSON.stringify(product_details)
        await AsyncStorage.setItem('product', product)

        Setloader(true);
        const user_token: any = await AsyncStorage.getItem('token');
        try {
            const response = await axios.get(APP_BASE_URL + Stock_Data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user_token
                },
                params: {
                    "dealer_id": dealer_id
                }
            });
            {
                !window.cn(response.data.data) && response.data.data &&
                    Set_place_order_data(response.data.data);
                Setsearchdata(response.data.data);
            }
            Setloader(false);
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
        get_stock_data();
    }, [])


    const updateSearch = (search: any) => {

        if (search) {
            const newData = place_order_data.filter(
                function (item) {
                    const search_name = item.crop_name ? item.crop_name.toUpperCase() : ''.toUpperCase();
                    const name = search.toUpperCase();
                    return search_name.indexOf(name) > -1;
                }
            );
            Setsearchdata(newData);
        } else {
            {
                !window.cn(place_order_data) && place_order_data &&
                    Setsearchdata(place_order_data);
            }
        }
    }

    const press_on_product = (item: any) => {
        navigation.navigate('Product Details', { product_details: item, dealer_id: dealer_id });
    }

    return (
        <SafeAreaView style={{ height: "100%" }}>


            {/* SEARCH BAR */}
            <View style={{ marginLeft: 20, marginRight: 20, borderRadius: 50, backgroundColor: '#F9F9F9' }}>
                <SearchBar
                    style={{ height: 60 }}
                    showsCancelButton // HIDE CANCEL BUTTON
                    placeholder="Search Stock ...."
                    onChangeText={updateSearch}
                />
            </View>


            {/* SHOW DATA */}

            <View style={{ marginTop: 10, flex: 1 }}>
                {loader ?
                    <FlatList
                        contentContainerStyle={{ padding: 5 }}
                        data={search_data}
                        renderItem=
                        {({ item }) =>

                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                    <SkeletonPlaceholder.Item width={60} height={60} borderRadius={100} />
                                    <SkeletonPlaceholder.Item marginLeft={50}>
                                        <SkeletonPlaceholder.Item width={120} height={20} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        }
                    />

                    :
                    <FlatList
                        contentContainerStyle={{ padding: 5 }}
                        data={search_data}
                        renderItem=
                        {({ item }) =>
                            <TouchableOpacity onPress={() => press_on_product(item)}>
                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10, height: 50 }}>
                                    <View style={{ width: "100%", flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                        <View style={{ marginBottom: 10, width: "20%" }}>
                                            <Image style={{ width: 45, height: 50, borderRadius: 100 }} source={item.photo ? { uri: item.photo } : require('../../../assets/images/producuimage.png')} />
                                        </View>
                                        <View style={{ width: "60%", alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={Styles.text}>{item.crop_name}</Text>
                                        </View>
                                        <View style={{ width: "20%", alignItems: 'center', justifyContent: 'center' }}>
                                            <FontAwesome6
                                                name="greater-than" size={20} color='black'
                                            />
                                        </View>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                }

            </View>
        </SafeAreaView >
    )

};


const Styles = StyleSheet.create({
    text: {
        color: '#171C15',
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: 'bold'
    }
})