import React from 'react';
import {
  FlatList,
  NavigationEventSubscription,
  NavigationScreenProp,
  SafeAreaView,
  Themed,
  ScrollView,
  NavigationEventPayload,
  NavigationState,
} from 'react-navigation';
import {Icon} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import AboutScreen from "../Containers/AboutScreen";
import MediaScreen from "../Containers/MediaScreen";
import HomeScreen from "../Containers/HomeScreen";
import MapScreen from "../Containers/MapScreen";
import { Interface } from 'readline';
import ClassificationScreen from '../Containers/ClassificationScreen';
/*
{this.renderTab({ route: "About", text: "Acerca" })}
                {this.renderTab({ route: "Map", text: "Mapa" })}
                {this.renderTab({ route: "Media", text: "Fotos" })}
                {this.renderTab({ route: "Classification", text: "Grupo" })}
*/

const SpecieTabBar= createBottomTabNavigator({
  About:{
    path: 'about',
    screen: AboutScreen
  },
  Map:{
    path:'map',
    screen:MapScreen
  },
  Media:{
    path:'media',
    screen:MediaScreen
  },
  Classification:{
    path:'classification',
    screen: ClassificationScreen
  }
});