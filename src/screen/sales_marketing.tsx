import { useState } from "react";
import { SafeAreaView, View, Text, useWindowDimensions, TouchableOpacity, Image, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Expense } from "../Drawer/pages/Expense/expense";
import back_icon from '../assets/images/backicon.png';
import { Leave_management } from "../Drawer/pages/Leave/leave_management";
import Ionicons from 'react-native-vector-icons/Ionicons';





export const Sales_Marketing = ({ navigation }: any) => {

    const FirstRoute = () => (
        // navigation.navigate('Expense')
        <Expense navigation={navigation} />
    );

    const SecondRoute = () => (
        // navigation.navigate('Leave Management', navigation={navigation})
        <Leave_management navigation={navigation} />
    );


    const renderScene = SceneMap({
        expense: FirstRoute,
        leave: SecondRoute,
    });


    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'expense', title: 'Expense' },
        { key: 'leave', title: 'Leave' },
    ]);

    const press_back = () => {
        navigation.navigate('Home');
    }

    const renderTabBar = props => {
        return (
            <TabBar
                {...props}
                renderLabel={({ focused, route }) => {
                    return (
                        <Text style={{color: focused ?  '#388847': 'black', fontFamily: 'Montserrat', fontWeight: 'bold'}}
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


    return (
            <SafeAreaView style={{height: "100%", backgroundColor: 'white'}}>
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
                        <Text style={{ color: '#247401', fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Sales & Marketing</Text>
                    </View>
                </View>

                <TabView 
                renderTabBar={renderTabBar}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
           </>
            </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', backgroundColor: 'white' },
    tabBar: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    indicatorStyle: {
        backgroundColor: 'black',
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




// <SafeAreaView style={{ marginTop: "3%", backgroundColor: 'white' }}>
// {/* <View style={{ flexDirection: 'row' }}>
//     <View style={{ justifyContent: 'center', width: "20%", top: "2%", left: "50%" }}>
//         <TouchableOpacity onPress={press_back}>
//             <Image source={back_icon} />
//         </TouchableOpacity>
//     </View>
//     <View style={{ alignItems: 'center', width: "60%", top: "2%" }}>
//         <Text style={{ color: '#202020', fontSize: 20, fontWeight: '500' }}>Sales & Marketing</Text>
//     </View>
// </View> */}
// </SafeAreaView>

// <TabView 
// renderTabBar={renderTabBar}
// navigationState={{ index, routes}}
// renderScene={renderScene}
// onIndexChange={setIndex}
// initialLayout={{ width: layout.width }}
// style = {{marginTop : "7%"}}
// // showPageIndicator={true}



// // renderTabBar={renderTabBar}
// // navigationState={{ index, routes }}
// // renderScene={renderScene}
// // onIndexChange={setIndex}
// // initialLayout={{ width: layout.width }}
// // tabBarPosition="top"
// // style= {{
// //     marginTop: "7%",
// //     backgroundColor : '#FFF'
// // }}
// />