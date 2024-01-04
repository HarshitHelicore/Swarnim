/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Global Window Object
window.helicore = window.helicore || {};
window.cn = function (o) {
  return 'undefined' === typeof o || null === o || '' === o.toString().trim();
};
window.cb = function (o) {
  if (o === 'true') {
    return true;
  } else {
    return false;
  }
};
AppRegistry.registerComponent(appName, () => App);

