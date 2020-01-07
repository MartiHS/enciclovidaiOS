import { StyleSheet } from "react-native";

import { Metrics, AppStyles, Colors, Fonts } from "../../Theme";

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
    height: 40,
    width: 20,
  },
  image_ico: {
    height: 20,
    width: 20,
  },
  text: {
    fontFamily: Fonts.family.base,
  },
  text_comun: {
    fontFamily: Fonts.family.base_bold,
  },
  text_cientifico: {
    fontFamily: Fonts.family.base_italic,
  },
});
