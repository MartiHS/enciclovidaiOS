import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';

import { createIconSetFromFontello } from "react-native-vector-icons";
import config from "./config.json"

export const CustomAppIcon = (Platform.OS === 'android') ?  createIconSetFromFontello(config) : createIconSetFromIcoMoon(icoMoonConfig);