import { StyleSheet } from "react-native";

import { Metrics, AppStyles, Colors, Fonts } from "../../Theme/";
import colors from "../../Theme/Colors";

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
  content: {
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: "justify",
  },
  text: {
    fontSize: 15,
    textAlign: "auto",
    fontFamily: Fonts.family.base,
  },
  info: {
    padding: 20,
  },
  bold: {
    //fontWeight: "bold",
    fontFamily: Fonts.family.base_bold,
  },
  rigth: {
    //fontWeight: "bold",
    textAlign: "right"
  },
  link: {
    color: colors.link,
    textDecorationLine: "underline",
  },
  viewImage: {
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    resizeMode: "contain",
    flex: 1,
  },
});
