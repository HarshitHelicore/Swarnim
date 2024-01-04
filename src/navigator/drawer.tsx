
//    //  PAGES

// import { Home } from '../Home/home';
// import { Farmer } from '../Drawer/pages/farmer';
// import { Dealer } from '../Drawer/pages/Dealer/dealer';
// import { New_dealer } from '../Drawer/pages/new_dealer';
// import { Expense } from '../Drawer/pages/Expense/expense';
// import { Stock } from '../Drawer/pages/stock';
// import { Report } from '../Drawer/pages/report';
// import { Leave_management } from '../Drawer/pages/Leave/leave_management';
// import { Todo } from '../Bottombutton/todo';
// import { Timesheet } from '../Bottombutton/Timesheet';

// import { NavigationContainer } from '@react-navigation/native';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//    // Drawer

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { Add_Delar } from '../Drawer/pages/Dealer/add_dealer';
// const Drawer = createDrawerNavigator();

// export const Drawers = ({name}:any) => {
    
//     return (
//         <Drawer.Navigator
//         screenOptions={({route}) => ({
//             headerTitle:name.route.name,            
//             // headerTintColor:'black',
//             // headerShown: false,
//             drawerStyle: {
//                 padding: 20,
//                 width: 320,
//                 borderTopRightRadius: 40,
//                 borderBottomEndRadius: 40,

//             },
//             // headerShown: name.route.name === ""
//         })}
//         >
//                 <Drawer.Screen name="Home" component={Home}
//                     options={{
//                         drawerItemStyle: { height: 0 }
//                       }}
//                 />

//                 <Drawer.Screen name="Todo" component={Todo}
//                     options={{
//                         drawerItemStyle: { height: 0 }
//                       }}
//                 />

//                 <Drawer.Screen name="Timesheet" component={Timesheet}
//                     options={{
//                         drawerItemStyle: { height: 0 }
//                       }}
//                 />


//                 <Drawer.Screen name="Farmer" component={Farmer}
//                     options={{
//                         drawerIcon:({focused}) => (
//                             <View>
//                                 <Image source={require('../Drawer/images/framer.png')}
//                                 />
//                             </View>   
//                         )
//                     }}
//                 />
//                 <Drawer.Screen name="Dealer" component={Dealer}
//                     options={{
//                         drawerIcon: ({focused}) => (
//                             <Image source={require('../Drawer/images/dealer.png')}/>
//                         )
//                     }}
//                 />
//                 <Drawer.Screen name="New Dealer" component={Add_Delar}
//                     options={{
//                         drawerIcon:({focused}) => (
//                             <Image source={require('../Drawer/images/new_dealer.png')}/>
//                         )
//                     }}
//                 />
//                 <Drawer.Screen name="Expense" component={Expense} 
//                     options={{
//                         drawerIcon:({focused}) => (
//                             <Image source={require('../Drawer/images/expense.png')}/>
//                         )
//                     }}
//                 />
//                 <Drawer.Screen name="Stock" component={Stock}
//                     options={{
//                         drawerIcon:({focused}) => (
//                             <Image source={require('../Drawer/images/stock.png')}/>
//                         )
//                     }}
//                 />
//                 <Drawer.Screen name="Report" component={Report}
//                     options={{
//                         drawerIcon:({focused}) => (
//                             <Image source={require('../Drawer/images/report.png')}/>
//                         )
//                     }}
//                 />
//                 <Drawer.Screen name="Leave Management" component={Leave_management}
//                     options={{
//                         drawerIcon:({focused}) => (
//                             <Image source={require('../Drawer/images/leave.png')}
//                             />
//                         )
//                     }}
//                 />

//                 {/* <Drawer.Screen name="Leave Management" component={Leave_management}
//                     options={{
//                         drawerIcon:({focused}) => (
//                             <Image source={require('./images/leave.png')}/>
//                         )
//                     }}
//                 /> */}
//         </Drawer.Navigator>
//     )
// }
