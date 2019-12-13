import Fonts from "./Fonts";
import Metrics from "./Metrics";
import Colors from "./Colors";

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const AppStyles = {
  screen: {
    mainScreen: {
      flex: 1,
      backgroundColor: Colors.mainBackground
    },
    button: {
      margin: 10,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
      backgroundColor: '#102249',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 30,
      color: Colors.white,
      fontSize: 18,
      fontFamily: Fonts.family.base_bold,
      //fontWeight: 'bold',
      overflow: 'hidden',
      textAlign:'center',
    },
  }
};

export default AppStyles;
