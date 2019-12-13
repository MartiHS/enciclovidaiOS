import { StyleSheet } from "react-native";

import { Metrics, AppStyles, Colors, Fonts } from "../../Theme/";

export default StyleSheet.create({
  ...AppStyles.screen,
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: Colors.mainBackground
  },
  navBar: {
    height: Metrics.navBarHeight,
    backgroundColor: Colors.navBarBackground,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    //fontWeight: "bold",
    fontFamily: Fonts.family.base_bold,
  },
  image: {
    height: 300,
    width: '100%',
  },
  textcontent: {
    padding: 20,
    //fontFamily: Fonts.family.base,
  },
  text: {
    fontFamily: Fonts.family.base,
  },
  textBold: {
    fontFamily: Fonts.family.base_bold,
  },
  textItalic: {
    fontFamily: Fonts.family.base_italic,
  },
  textBoldItalic: {
    fontFamily: Fonts.family.base_bold_italic,
  },
});
