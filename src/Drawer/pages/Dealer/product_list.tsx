import { useEffect, useState } from "react";
import { Image, PermissionsAndroid, SafeAreaView, StyleSheet, Text, Alert, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Place_Order_list } from "./place_order_list";
import Ionicons from 'react-native-vector-icons/Ionicons';


export const Place_Order = ({ route, navigation }: any) => {

    const [dealer_id, Setdealerid] = useState<number>();
    const [dealerdata, Setdealerdata] = useState<any>();

    useEffect(() => {
        {
            !window.cn(route.params.dealer.id) && route.params.dealer.id &&
                Setdealerid(route.params.dealer.id);
        }
        {
            !window.cn(route.params.dealer) && route.params.dealer &&
                Setdealerdata(route.params.dealer);
        }

    }, [])

    const FirstRoute = () => (
        // navigation.navigate('Expense')
        <Place_Order_list navigation={navigation} dealer_id={dealer_id} />
    );

    const SecondRoute = () => (
        // navigation.navigate('Leave Management', navigation={navigation})
        <Place_Order_list navigation={navigation} />
    );


    const renderScene = SceneMap({
        stock: FirstRoute,
        dealer: SecondRoute,
    });


    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'stock', title: 'Stock' },
        { key: 'dealer', title: 'Dealer Transfer' },
    ]);

    const renderTabBar = props => {
        return (
            <TabBar
                {...props}
                renderLabel={({ focused, route }) => {
                    return (
                        <Text style={{ color: focused ? '#388847' : 'black', fontFamily: 'Montserrat', fontWeight: 'bold' }}
                        >
                            {route.title}
                        </Text>
                    );
                }}
                indicatorStyle={styles.indicatorStyle}
                style={styles.tabBar}
            />
        );
    };

    const press_back = () => {
        const user_data = route?.params?.dealer
        navigation.navigate('Dealer Profile', { user_data: user_data });
    }

    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>

            <>

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
                        <Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Select Product</Text>
                    </View>
                </View>

                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    style={{ marginTop: "5%" }}
                />
            </>
        </SafeAreaView>
    )


};

const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', backgroundColor: 'white' },
    tabBar: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    indicatorStyle: {
        backgroundColor: 'rgba(126, 205, 139, 0.70)',
        padding: 1.5,
        marginBottom: -2,
    },
    divider: {
        zIndex: 100,
        position: 'absolute',
        width: 1,
        height: 48,
        backgroundColor: 'black',
        alignSelf: 'center',
    },
});