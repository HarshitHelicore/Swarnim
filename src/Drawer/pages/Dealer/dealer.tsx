import { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet, ScrollView
} from "react-native";

import { DEALERS } from "../../../config/apiConstant";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_BASE_URL } from "../setting/setting";
import axios from "axios";
import SearchBar from 'react-native-search-bar';
import { Add_Delar } from "./add_dealer";
import { longPressGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler";


const itemdata = {
    "data": [
        {
            "name": "demo1",
            "id": 1,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "1326234",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        },
        {
            "name": "demo2",
            "id": 2,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "979942424801801",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        },
        {
            "name": "demo3",
            "id": 4,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "424249799801801",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        },
        {
            "name": "demo5",
            "id": 5,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "4554157",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        },
        {
            "name": "demo6",
            "id": 6,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "1515151",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        },
        {
            "name": "demo7",
            "id": 7,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "214514215",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        },
        {
            "name": "demo8",
            "id": 8,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "1949149491495",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        },
        {
            "name": "demo9",
            "id": 9,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "2164149214",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        },
        {
            "name": "demo10",
            "id": 10,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "78250222",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        },
        {
            "name": "demo11",
            "id": 11,
            "email": "rahulmahecha8@gmail.com",
            "mobile": "98997643",
            "photo": "https://swarnim-bucket.blr1.digitaloceanspaces.com/swarnim/dealer/PUNJAB%20AGRO%20TRADERS%20-%20JAISALMER/RAHUL%20MAHECHA/145848-PHOTO.jpeg",
        }
    ]
}

export const Dealer = ({ navigation }: any) => {

    const [token, Settoken] = useState<string>();
    const [search, setSearch] = useState<any>("");
    const [search_data, Setsearchdata] = useState<any>("");

    const [loader, SetLoader] = useState<boolean>(false);


    const [user_data, SetUserData] = useState<any>();



    const get_dealer_data = async() => {

        // Settoken(eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zd2FybmltZmFybS5pbi9hcGkvbG9naW4iLCJpYXQiOjE3MDI0NDY2NTIsImV4cCI6MTcwMzA1MTQ1MiwibmJmIjoxNzAyNDQ2NjUyLCJqdGkiOiJtTVVWYzVMMTRMOHdYV3liIiwic3ViIjoiMTAxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.pvtDvWQE7lHFklerHKj6eb5LWMNHWwEOD8OmYlztE_o);

        try {

            const response = await axios.get(APP_BASE_URL + DEALERS , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
            console.log(">>>>>>>>>>>>>>>>>>response",response);
            
            // SetUserData(re)
        } catch (error) {
            console.log(">>>>>>>>.error",error);
            
        }

    }

    const press_back = () => {
        navigation.navigate('Home');
    }

    // const updateSearch = (search: any) => {

    //     console.log(";>>>>>>>>>>>>>>>search", search);

    //     if (search) {
    //         const newData = itemdata.data.filter(
    //             function (item) {
    //                 const mobiles = item.mobile;
    //                 // const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();

    //                 const mobile = search
    //                 // const textData = search.toUpperCase();

    //                 return mobiles.indexOf(mobile) > -1;
    //             });
    //         setSearch(search);
    //         Setsearchdata(newData);

    //     } else {
    //         console.log(user_data);

    //         setSearch(search);
    //         Setsearchdata(user_data);
    //     }
    // }

    const press_new_dealer = () => {
        console.log("<<,");

        // navigation.navigator("")
    }


    return (

        <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>

            {/* HEADER */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "5%", marginBottom: "2%" }}>
                <View style={{ width: "15%", alignItems: 'center' }}>
                    <TouchableOpacity onPress={press_back}>
                        <View>
                            <Image source={require('../../../assets/images/backicon.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "75%", alignItems: 'center' }}>
                    <Text style={{ color: '#388847', fontSize: 20, fontWeight: '600', fontFamily: 'Montserrat' }}>Dealers</Text>
                </View>
            </View>

            {/* SEARCH BAR */}
            {/* <View style={{ marginLeft: 20, marginRight: 20, borderRadius: 50, backgroundColor: '#F9F9F9' }}>
                <SearchBar
                    style={{ height: 60 }}
                    // showsCancelButton // HIDE CANCEL BUTTON
                    placeholder="Search Dealer"

                    onChangeText={updateSearch}
                />
            </View> */}

            {/* LIST */}
            <View style={{ flex: 1 }}>
                <FlatList
                    // contentContainerStyle={{ paddingBottom: 100 }}
                    data={search_data}
                    renderItem=
                    {({ item }) =>
                        <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1, margin: 10, alignItems: 'center', padding: 10 }}>
                            <View>
                                <Image style={{ width: 45, height: 50, borderRadius: 100 }} source={{ uri: item.photo }} />
                            </View>
                            <View>
                                <Text style={[Styles.text_style]}>{item.name}</Text>
                                <Text style={[Styles.text_style, { marginTop: 5 }]}>{item.mobile}</Text>
                            </View>
                        </View>

                    }
                />
            </View>

            {/* BUTTON */}
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={Styles.new_dealer_button} onPress={press_new_dealer}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{justifyContent: 'center'}}>
                            <Image source={require('../../../assets/images/plus.png')} />
                        </View>
                        <View>
                            <Text style={{ color: '#FFF', fontFamily: 'Montserrat', fontStyle: 'normal', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>New Dealer</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
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
        width: 165, height: 56,
        position: 'absolute',
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    }
})