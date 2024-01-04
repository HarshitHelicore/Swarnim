
import { Image, StyleSheet, View, Text } from "react-native";

// Login
import { Login } from "../Auth/Login";
import { ForgotPassword } from "../Auth/Forgotpassword";
import { PasswordVerification } from "../Auth/PasswordVerification";

// Main 
import { Home } from "../Home/home";
import { Timerclock } from "../Bottombutton/timerclock";
import { Todo } from "../Bottombutton/todo";
import { Timesheet } from "../Bottombutton/Timesheet";
import { Orders } from "../Bottombutton/Orders";
import { View_Orders } from "../Home/view_order";

//Drawer
import { Farmer } from "../Drawer/pages/farmer";
import { Dealer } from "../Drawer/pages/Dealer/dealer";
import { New_dealer } from "../Drawer/pages/new_dealer";
import { Expense } from "../Drawer/pages/Expense/expense";
import { Stock } from "../Drawer/pages/stock";
import { Report } from "../Drawer/pages/report";
import { Leave_management } from "../Drawer/pages/Leave/leave_management";

// Leave Management
import { Full_Leave } from "../Drawer/pages/Leave/fullleave";
import { Custom_Leave } from "../Drawer/pages/Leave/customleave";
import { Half_Leave } from "../Drawer/pages/Leave/HalfLeave";

// Expense
import { Add_Expense } from "../Drawer/pages/Expense/new_expense";


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { InterfaceOrientation, log } from "react-native-reanimated";
import { useState } from "react";
import { Opning_screen } from "../screen/opning_screen";
import { color } from "react-native-elements/dist/helpers";
import { Sales_Marketing } from "../screen/sales_marketing";
import { Add_Delar } from "../Drawer/pages/Dealer/add_dealer";
import { Delar_List } from "../Drawer/pages/Dealer/demo_dealer";
import { Dealer_Profile } from "../Drawer/pages/Dealer/dealer_profile";
import { Open_Order } from "../Home/open_order";
import { Place_Order } from "../Drawer/pages/Dealer/product_list";
import { Product_Details } from "../Drawer/pages/Dealer/product_details";
// // import { Icon } from "react-native-elements";
// import Icon from 'react-native-ionicons'
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ant from 'react-native-vector-icons/AntDesign';



import { Icon } from 'react-native-elements'
import { Other_Expense } from "../Drawer/pages/Expense/other_expense";

// Leave Management

const Leave_Stack = createNativeStackNavigator();

export const Leave_Tabs = () => {
    return (
        <Leave_Stack.Navigator initialRouteName="Leave Management">
            <Leave_Stack.Screen name="Leave Management" component={Leave_management}
                options={{
                    headerShown: false
                }}
            />
            <Leave_Stack.Screen name="Full Leave" component={Full_Leave} options={{headerShown: false}}/>
            <Leave_Stack.Screen name="Custom Leave" component={Custom_Leave} options={{headerShown: false}}/>
            <Leave_Stack.Screen name="Half Leave" component={Half_Leave} options={{headerShown: false}}/>
        </Leave_Stack.Navigator>
    )
}


// Login Navigation


const Login_Stack = createNativeStackNavigator();

export const Tabs = () => {
    return (
        <Login_Stack.Navigator initialRouteName="Opning Screen"
        // screenOptions={
        //     ({route}) => ({
        //         const font = route.params.current_route_name;
        //     })
        // }
        >
            <Login_Stack.Screen name="Opning Screen" component={Opning_screen} options={{ headerShown: false }} />
            <Login_Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Login_Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Login_Stack.Screen name="PasswordVerification" component={PasswordVerification} />
            <Login_Stack.Screen name="Navigate_Home" component={HomeTabs}
                options={{
                    headerShown: false
                }}
            />
        </Login_Stack.Navigator>
    )
}


// Home Navigation

const Home_Stack = createNativeStackNavigator();

export const HomeTabs = () => {
    return (
        <Home_Stack.Navigator initialRouteName="main">
            <Home_Stack.Screen name="View Orders" component={View_Orders} options={{ headerShown: false }} />
            <Home_Stack.Screen name="Open Order" component={Open_Order} options={{ headerShown: false }} />
            <Home_Stack.Screen name="main" component={Home_drawers} options={{ headerShown: false }} />

        </Home_Stack.Navigator>
    )
}


// Dealer Profile

const dealer_profile = createNativeStackNavigator();

export const Delar_profile_pages = () => {
    return (
        <dealer_profile.Navigator initialRouteName="Delar List">
            <dealer_profile.Screen name="Delar List" component={Delar_List} options={{ headerShown: false }} />
            <dealer_profile.Screen name="Dealer Profile" component={Dealer_Profile} options={{ headerShown: false }} />
            <dealer_profile.Screen name="Place Order" component={Place_Order} options={{ headerShown: false }} />
            <dealer_profile.Screen name="Product Details" component={Product_Details} options={{ headerShown: false }} />





            {/* <dealer_profile.Screen name="main" component={Home_drawers} options={{headerShown:false}}/> */}

        </dealer_profile.Navigator>
    )
}



// Drawer Navigation


const Home_Drawer = createDrawerNavigator();

export const Home_drawers = () => {
    // var name = "New Dealer"
    return (
        <Home_Drawer.Navigator
            // initialRouteName={name}
            // drawerContent={Dealer}
            screenOptions={
                ({ route }) => ({
                    // headerTitle:route_names.route.name,  
                    // drawerInactiveTintColor:'#247401',
                    headerTintColor: '#247401',
                    drawerStyle: {
                        padding: 10,
                        width: 320,
                        borderTopRightRadius: 40,
                        borderBottomEndRadius: 40,
                    }
                })
            }
        >
            <Home_Drawer.Screen name="Drawer Home" component={Home_bottoms}
                options={{
                    headerTitle: "Helicore",
                    headerShown: false,
                    headerTitleStyle: { fontSize: 20, fontWeight: '500', color: '#247401', fontFamily: 'Montserrat' },
                    headerTitleAlign: 'center',
                    drawerLabelStyle: { color: 'black' },
                    drawerItemStyle: { height: 0 },
                }}
            />








            <Home_Drawer.Screen name="To Do" component={Todo}
                options={{
                    drawerItemStyle: { height: 0 }
                }}
            />
            <Home_Drawer.Screen name="Dealer Profile" component={Delar_profile_pages}
                options={{
                    drawerItemStyle: { height: 0 },
                    headerShown: false
                }}
            />
            <Home_Drawer.Screen name="Dealers List" component={Orders}
                options={{
                    drawerItemStyle: { height: 0 }
                }}
            />
            {/* <Home_Drawer.Screen name="Place Order" component={Place_Order} /> */}
            {/* <Home_Drawer.Screen name="Logo" component={Home}
                options={{
                    drawerIcon:({focused}) => (
                        <View style={{marginTop: "20%", height: "50%"}}>
                            <Image source={require('../assets/images/swarnim_logo.png')}
                            />
                        </View>   
                    )
                  }}
            /> */}
            <Home_Drawer.Screen name="Framer" component={Farmer}
                options={{
                    headerTitle: "Farmer Form",
                    headerShown: false,
                    headerTitleStyle: { fontSize: 20, fontWeight: '500', color: '#171C15', fontFamily: 'Montserrat' },
                    drawerLabelStyle: { color: '#171C15', fontFamily: 'Montserrat', fontSize: 17, fontStyle: 'normal', fontWeight: '500' },
                    drawerItemStyle: { height: 0 },
                    drawerIcon: ({ focused }) => (
                        <View>
                            <Image source={require('../Drawer/images/framer.png')}
                            />
                        </View>
                    )
                }}
            />
            <Home_Drawer.Screen name="Dealer" component={Delar_profile_pages}
                options={{
                    headerShown: false,
                    drawerItemStyle: { marginTop: "70%" },
                    drawerLabelStyle: { color: '#171C15', fontFamily: 'Montserrat', fontSize: 17, fontStyle: 'normal', fontWeight: '500' },
                    drawerIcon: ({ focused }) => (
                        <Image source={require('../Drawer/images/dealer.png')} />
                    )
                }}
            />
            <Home_Drawer.Screen name="New Dealer" component={Add_Delar}
                options={{
                    headerShown: false,
                    drawerLabelStyle: { color: '#171C15', fontFamily: 'Montserrat', fontSize: 17, fontStyle: 'normal', fontWeight: '500' },
                    drawerIcon: ({ focused }) => (
                        <Image source={require('../Drawer/images/new_dealer.png')} />
                    )
                }}
            />
            <Home_Drawer.Screen name="Sales & Marketing" component={Sales_Marketing_Tabs}
                options={{
                    headerShown: false,
                    drawerLabelStyle: { color: '#171C15', fontFamily: 'Montserrat', fontSize: 17, fontStyle: 'normal', fontWeight: '500' },
                    drawerIcon: ({ focused }) => (
                        <Image source={require('../Drawer/images/expense.png')} />
                    )
                }}
            />
            <Home_Drawer.Screen name="Expense" component={Expense}
                options={{
                    headerShown: false,
                    drawerItemStyle: { height: 0 },
                    drawerLabelStyle: { color: '#171C15', fontFamily: 'Montserrat', fontSize: 17, fontStyle: 'normal', fontWeight: '500' },
                    drawerIcon: ({ focused }) => (
                        <Image source={require('../Drawer/images/expense.png')} />
                    )
                }}
            />
            <Home_Drawer.Screen name="Stock" component={Stock}
                options={{
                    headerShown: false,
                    drawerItemStyle: { height: 0 },
                    drawerLabelStyle: { color: '#171C15', fontFamily: 'Montserrat', fontSize: 17, fontStyle: 'normal', fontWeight: '500' },
                    drawerIcon: ({ focused }) => (
                        <Image source={require('../Drawer/images/stock.png')} />
                    )
                }}
            />
            <Home_Drawer.Screen name="Report" component={Report}
                options={{
                    drawerItemStyle: { height: 0 },
                    headerShown: false,
                    drawerLabelStyle: { color: '#171C15', fontFamily: 'Montserrat', fontSize: 17, fontStyle: 'normal', fontWeight: '500' },
                    drawerIcon: ({ focused }) => (
                        <Image source={require('../Drawer/images/report.png')} />
                    )
                }}
            />
            <Home_Drawer.Screen name="Leave Management" component={Leave_Tabs} initialParams={{ current_route_name: "route_leave_management" }}
                options={{
                    drawerItemStyle: { height: 0 },
                    headerShown: false,
                    drawerLabelStyle: { color: '#171C15', fontFamily: 'Montserrat', fontSize: 17, fontStyle: 'normal', fontWeight: '500', marginRight: "-25%" },
                    drawerIcon: ({ focused }) => (
                        <Image source={require('../Drawer/images/leave.png')}
                        />
                    )
                }}
            />
            <Home_Drawer.Screen name="Sign Out" component={Tabs}
                options={{
                    drawerLabelStyle: { color: '#171C15', fontFamily: 'Montserrat', fontSize: 17, fontStyle: 'normal', fontWeight: '500' },
                    headerShown: false,
                    // headerShadowVisible: false,
                    drawerItemStyle: { marginTop: "70%" },
                    drawerIcon: ({ focused }) => (
                        <Ant
                            name="poweroff" size={25} color='black'
                        />
                        // <Image source={require('../Drawer/images/drawersignout.png')}
                        // />
                    )
                }}
            />

        </Home_Drawer.Navigator>
    )
}


// Bottom Bar Navigation

const Home_Bottom = createBottomTabNavigator();

export const Home_bottoms = () => {
    return (
        <Home_Bottom.Navigator
            // tabBar={props => (
            //     <View>
            //     <Home_drawers {...props} />
            //     </View>
            // )}
            screenOptions={
                ({ route }) => ({

                    tabBarShowLabel: false,
                    tabBarStyle: {
                        borderTopWidth: 0.6,
                        borderStartWidth: 0.1,
                        borderEndWidth: 0.1,
                        borderTopLeftRadius: 30,
                        borderTopEndRadius: 30,
                        position: 'absolute',
                        backgroundColor: "#fff",
                        height: 80,

                    }
                })
            }
        >
            <Home_Bottom.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Ant
                                name="home" size={25} color={focused ? '#7ECD8B' : '#748c94'}
                            />

                            {/* <Image source={require('../assets/images/bottomhome.png')}
                                resizeMode={'stretch'}
                                style = {{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#7ECD8B' : '#748c94',
                                }}
                            /> */}
                            <Text style={Styles.bottom_input}>
                                Dashboard
                            </Text>
                        </View>
                    )
                }}
            />
            <Home_Bottom.Screen name="Timer Clock" component={Timerclock}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <FontAwesome
                                name="schedule" size={25} color={focused ? '#7ECD8B' : '#748c94'}
                            />
                            {/* <Image source={require('../assets/images/bottomclock.png')}
                                resizeMode={'stretch'}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#7ECD8B' : '#748c94'
                                }}
                            /> */}
                            <Text style={Styles.bottom_input}>
                                Timer Clock
                            </Text>
                        </View>
                    )
                }}
            />
            <Home_Bottom.Screen name="To Do" component={Todo}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ marginTop:50}}>
                            {/* <FontAwesome
                                name="house" size={30} color={focused ? '#7ECD8B' : '#748c94'}
                            /> */}
                            <Image source={require('../assets/images/swarnim_logo.png')}
                                resizeMode='contain'
                                style={{
                                    width: 78,
                                    height: 78,
                                    bottom: 30,
                                }}
                            />
                        </View>
                    )
                }}
            />
            <Home_Bottom.Screen name="Time Sheet" component={Timesheet}
                options={{
                    // headerTitle(props) {
                    //     {}
                    // },
                    headerShown: false,
                    tabBarLabel: "All Orders",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <FontAwesome
                                name="rocket" size={25} color={focused ? '#7ECD8B' : '#748c94'}
                            />

                            {/* <Image source={require('../assets/images/bottomcal.png')}
                                resizeMode={'stretch'}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#7ECD8B' : '#748c94'
                                }}
                            /> */}
                            <Text style={Styles.bottom_input}>
                                Time Sheet
                            </Text>
                        </View>
                    )
                }}
            />
            <Home_Bottom.Screen name="Order" component={Orders}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <FontAwesome5
                                name="clipboard-list" size={25} color={focused ? '#7ECD8B' : '#748c94'}
                            />
                            {/* <Image source={require('../assets/images/bottomnotes.png')}
                                resizeMode={'stretch'}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#7ECD8B' : '#748c94'
                                }}
                            /> */}
                            <Text style={Styles.bottom_input}>
                                Sells
                            </Text>
                        </View>
                    )
                }}
            />
        </Home_Bottom.Navigator>
    )
}

const Styles = StyleSheet.create({
    bottom_input: {
        color: '#388847',
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '500',
        width: 60,
        fontFamily: 'Montserrat'
    }
})



// SALES MARKETING

const Sales_Marketing_Stack = createNativeStackNavigator();

export const Sales_Marketing_Tabs = ({ navigation }: any) => {
    console.log('>>>>>>>>>>>>navigation',navigation);
    
    return (
        <Sales_Marketing_Stack.Navigator initialRouteName="Sales Marketing">
            <Sales_Marketing_Stack.Screen name="Sales Marketing" component={Sales_Marketing} 
                options={{
                    headerShown: false,
                }}
            />
            <Sales_Marketing_Stack.Screen name="Expense" component={Expense} />
            <Sales_Marketing_Stack.Screen name="Add Expense" component={Add_Expense} options={{headerShown: false}}/>
            <Sales_Marketing_Stack.Screen name="Other Expense" component={Other_Expense} options={{headerShown: false}}/>
            <Sales_Marketing_Stack.Screen name="Leave Management" component={Leave_management} />
            <Sales_Marketing_Stack.Screen name="Full Leave" component={Full_Leave} options={{headerShown: false}}/>
            <Sales_Marketing_Stack.Screen name="Custom Leave" component={Custom_Leave} options={{headerShown: false}}/>
            <Sales_Marketing_Stack.Screen name="Half Leave" component={Half_Leave} options={{headerShown: false}}/>
        </Sales_Marketing_Stack.Navigator>
    )
}
