import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

import HomeScreen from "../Containers/HomeScreen";
import FindByLocation from "../Containers/FindByLocationScreen";
import EnciclovidaScreen from "../Containers/EnciclovidaScreen";
import SymbologyScreen from "../Containers/SymbologyScreen";
import ListSpeciesScreen from "../Containers/ListSpeciesScreen";
import SlideMenu from "../Containers/SideMenu";

import AboutScreen from "../Containers/AboutScreen";
import MapScreen from "../Containers/MapScreen"; 
import MediaScreen from "../Containers/MediaScreen";
import ClassificationScreen from "../Containers/ClassificationScreen";


const TabNav = createBottomTabNavigator({
  About: { screen: AboutScreen },
  Map: {screen: MapScreen},
  Media: {screen: MediaScreen},
  Classification: {screen: ClassificationScreen},
},{
    headerMode: "none",
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
    backBehavior: 'initialRoute',
    swipeEnabled: true,
    animationEnabled: false,
    shifting: true,
})

const Drawer = createDrawerNavigator(
  {
    Find: { screen: HomeScreen },
    FindByLocation: { screen: FindByLocation },
    SpeciesByLocation: { screen: ListSpeciesScreen },
    SpeciesRisk: { screen: ListSpeciesScreen },
    SpeciesExotic: { screen: ListSpeciesScreen },
    SpeciesEndemic: { screen: ListSpeciesScreen },
    Info: { screen: EnciclovidaScreen },
    Symbology: { screen: SymbologyScreen },
    Tabs: { screen: TabNav }
  },
  {
    initialRouteName: "FindByLocation",
    contentComponent: SlideMenu,
    backBehavior: "history"
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Drawer
    },
    Tabs: { screen: TabNav }
  }, {
  headerMode: "none",
  disableKeyboardHandling: true,
  initialRouteName: "Home"

}
)

// export default AppNavigator;
const App = createAppContainer(AppNavigator);
export default App;