import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../Containers/HomeScreen";


import SlideMenu from "../Components/SideMenu";



const Drawer = createDrawerNavigator(
    {
      Find: { screen: HomeScreen }
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
      }
    },
    {
        headerMode: "none",
        disableKeyboardHandling:true,
        initialRouteName:"Home"

    }
)

//export default AppNavigator;
const App = createAppContainer(AppNavigator);
export default App;