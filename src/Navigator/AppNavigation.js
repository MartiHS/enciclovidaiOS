import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from "../Containers/HomeScreen";
import EnciclovidaScreen from "../Containers/EnciclovidaScreen";
import SymbologyScreen from "../Containers/SymbologyScreen";
import ListSpeciesScreen from "../Containers/ListSpeciesScreen";
import SlideMenu from "../Containers/SideMenu";

import AboutScreen from "../Containers/AboutScreen";
import MapScreen from "../Containers/MapScreen"; 
import MediaScreen from "../Containers/MediaScreen";


const TabNav = createBottomTabNavigator({
  About: { screen: AboutScreen },
  Map: {screen: MapScreen},
  Media: {screen: MediaScreen},
},
  {
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
    SpeciesRisk: { screen: ListSpeciesScreen },
    SpeciesExotic: { screen: ListSpeciesScreen },
    SpeciesEndemic: { screen: ListSpeciesScreen },
    Info: { screen: EnciclovidaScreen },
    Symbology: { screen: SymbologyScreen },
    Tabs: { screen: TabNav }
  },
  {
    initialRouteName: "Find",
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