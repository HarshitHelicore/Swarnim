import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View, FlatList } from "react-native"
import SearchBar from 'react-native-search-bar';
import { Add_Delar } from "./add_dealer";
import { Dealer_Profile } from "./dealer_profile";
import { Home } from "../../../Home/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_BASE_URL } from "../../../setting/setting";
import axios from "axios";
import { DEALERS } from "../../../config/apiConstant";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const actions = [
    {
        text: "Add Dealer",
        icon: require("../../../assets/images/plusicon.png"),
        name: "new_dealer",
        position: 3,
        color: "#71AE57",
    },
];




export const Delar_List = ({ navigation }: any) => {

    const [search_data, Setsearchdata] = useState<any>();
    const [search, setSearch] = useState<any>("");
    const [user_data, SetUserData] = useState<any>(); 0
    const [loader, Setloader] = useState(false);
    const [token, Settoken] = useState<string>();

   

    const press_adddealerhandler = (name: any) => {
        if (name === "new_dealer") {
            navigation.navigate("New Dealer", "dealer");
        }
    }


    const updateSearch = (search: any) => {

        if (search) {
            const newData = user_data.filter(
                function (item) {
                    const mobiles = item.mobile;
                    const itemData = item.firm_name ? item.firm_name.toUpperCase() : ''.toUpperCase();
                    const mobile = search
                    const textData = search.toUpperCase();
                    return mobiles.indexOf(mobile) > -1 || itemData.indexOf(textData) > -1;
                });
            setSearch(search);
            Setsearchdata(newData);

        } else {
            {
                !window.cn(search) && search &&
                    setSearch(search);
            }
            {
                !window.cn(user_data) && user_data &&
                    Setsearchdata(user_data);
            }

        }
    }


    const get_dealer_data = async () => {
        const user_token: any = await AsyncStorage.getItem('token');
        user_token ? Settoken(user_token) : Settoken("");
        try {
            const response = await axios.get(APP_BASE_URL + DEALERS, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user_token
                },
            })
            {
                !window.cn(response.data.data) && response.data.data &&
                    SetUserData(response.data.data);
                Setsearchdata(response.data.data);

            }
            Setloader(false);
        } catch (error) {
            console.log(">>>>>>>>.error", error);

        }

    }

    useEffect(() => {
        Setloader(true);
        get_dealer_data();
    }, [])

    const press_back = () => {
        navigation.navigate('Home');
    }

    const press_new_dealer = () => {
        navigation.navigate("New Dealer", "dealer");
    }

    const open_dealer_profile = (dealer_data: any) => {
        navigation.navigate('Dealer Profile', { user_data: dealer_data });
    }

    const press_back_button = () => {
        navigation.navigate('Home');
    }

    function LoadingAnimation() {
            return (
                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 5, borderBottomWidth: 0.5 }}>
                    <SkeletonPlaceholder borderRadius={4}>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                            <SkeletonPlaceholder.Item width={60} marginLeft={20} height={60} borderRadius={50} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </View>
            )
    }

    return (
        <>
            <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>

                {/* {loader ?
                    <View style={{ height: "100%", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color='black' />
                    </View>
                    : null} */}

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
                        <Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Dealers</Text>
                    </View>
                </View>


                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "5%", marginBottom: "2%" }}>
                <View style={{ width: "15%", alignItems: 'center' }}>
                    <TouchableOpacity onPress={press_back}>
                        <View>
                            
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "75%", alignItems: 'center' }}>
                    
                </View>
            </View> */}

                {/* SEARCH BAR */}

                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <View style={{ width: "100%" }}>

                        <SearchBar
                            style={{ height: 60 }}
                            showsCancelButton // HIDE CANCEL BUTTON
                            placeholder="Search Dealer ...."

                            onChangeText={updateSearch}
                        />

                    </View>
                </View>

                {/* LIST */}
                <View style={{ flex: 1 }}>
                    {/* {loader ?
                    <LoadingAnimation /> : */}

                    <FlatList
                        // contentContainerStyle={{ paddingBottom: 100 }}
                        data={search_data}
                        ListEmptyComponent={LoadingAnimation}
                        renderItem=
                        {({ item }) =>
                            <>
                                <TouchableOpacity onPress={(user_id) => open_dealer_profile(item)}>
                                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 5, borderBottomWidth: 0.5 }}>
                                        <View style={{ width: '100%' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ marginBottom: 5, width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image style={{ width: 45, height: 50, borderRadius: 100 }} source={item.photo ? { uri: item.photo } : require('../../../assets/images/aa.png')} />
                                                </View>
                                                <View style={{ width: "85%" }}>
                                                    <Text style={[Styles.text_style]} numberOfLines={1}>{item.firm_name}</Text>
                                                    <Text style={[Styles.text_style]} numberOfLines={1}>{item.mobile}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1, margin: 3, alignItems: 'center', padding: 10 }}>
                                <View>
                                    
                                </View>
                                <View>
                                    
                                </View>
                            </View> */}
                                </TouchableOpacity>
                            </>
                        }
                    />

                </View>

                {/* BUTTON */}
                {/* <View style={{ alignItems: 'flex-end', right: 50 }}>
                <TouchableOpacity style={Styles.new_dealer_button} onPress={press_new_dealer}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Image source={require('../../../assets/images/plus.png')} />
                        </View>
                        <View>
                            <Text style={{ color: '#FFF', fontFamily: 'Montserrat', fontStyle: 'normal', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>New Dealer</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View> */}

                <FloatingAction
                    color="#388847"
                    actions={actions}
                    position="right"
                    onPressItem={(name) => press_adddealerhandler(name)}

                />

            </SafeAreaView>
        </>
    )
}


const Styles = StyleSheet.create({
    text_style: {
        color: '#171C15',
        // fontFamily: 'Montserrat',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        marginLeft: 10
    },
    new_dealer_button: {
        backgroundColor: '#388847',
        width: 60, height: 60,
        position: 'absolute',
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    }
})