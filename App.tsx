import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Login } from './src/Auth/Login';
import { ForgotPassword } from './src/Auth/Forgotpassword';
import { PasswordVerification } from './src/Auth/PasswordVerification';
import { Home } from './src/Home/home';
import { NavigationContainer } from '@react-navigation/native';
import { HomeTabs, Home_drawers, Tabs } from './src/navigator/navigation';
import { Drawers } from './src/navigator/drawer';
import { Opning_screen } from './src/screen/opning_screen';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Leave_management } from './src/Drawer/pages/Leave/leave_management';
import { Sales_Marketing } from './src/screen/sales_marketing';
import { Dealer } from './src/Drawer/pages/Dealer/dealer';
import { Add_Delar } from './src/Drawer/pages/Dealer/add_dealer';
import { Add_Expense } from './src/Drawer/pages/Expense/new_expense';
import { Full_Leave } from './src/Drawer/pages/Leave/fullleave';
import { Time_Sheet } from './src/Drawer/pages/Time_sheet';
import { Dealer_Profile } from './src/Drawer/pages/Dealer/dealer_profile';
import { Dealer_Datails } from './src/Drawer/pages/Dealer/dealer_details';
import { Delar_List } from './src/Drawer/pages/Dealer/demo_dealer';
import { View_Orders } from './src/Home/view_order';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [islogin, Setlogin] = useState<boolean>(false);

  const get_user_token = async() => {

    
    const token = await AsyncStorage.getItem('token')
    if ( token ) {
      Setlogin(true);
    } else {
      Setlogin(false);
    }  
  }

  useEffect(() => {
      get_user_token();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <View>
    //   <Text>cdsbckdsbc</Text>
    // </View>
    <NavigationContainer>
      { islogin ? <HomeTabs/>
      :  
      <Tabs/>
    }
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
