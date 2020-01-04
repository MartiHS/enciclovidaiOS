
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from "../Containers/HomeScreen";
import EnciclovidaScreen from "../Containers/EnciclovidaScreen";
import SymbologyScreen from "../Containers/SymbologyScreen";
import SlideMenu from "../Containers/SideMenu";





const TabNav = createBottomTabNavigator({
    Find: { screen: HomeScreen },
},  
{
    headerMode: "none",
    defaultNavigationOptions : { 
      tabBarVisible: false ,
    },
    backBehavior: 'initialRoute',
    swipeEnabled: true,
    animationEnabled: false,
    shifting: true,


})

const Drawer = createDrawerNavigator(
  {
    Find: { screen: HomeScreen },
    Info: { screen: EnciclovidaScreen },
    Symbology: { screen: SymbologyScreen },
    Tabs: { screen: TabNav }
  },
  {
    initialRouteName: "Find",
    contentComponent: SlideMenu,
    backBehavior:"history"
  }
);

const AppNavigator = createStackNavigator(
    {
      Home: {
        screen: Drawer
      },
      Tabs: { screen: TabNav }
    },{
        headerMode: "none",
        disableKeyboardHandling: true,
        initialRouteName: "Home"

    }
)

// export default AppNavigator;
const App = createAppContainer(AppNavigator);
export default App;