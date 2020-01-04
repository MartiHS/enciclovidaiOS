import { StyleSheet } from "react-native";

import { Metrics, AppStyles, Colors, Fonts } from "../../Theme/";

export default StyleSheet.create({
  ...AppStyles.screen,
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: Colors.mainBackground,
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
  viewcontent:{
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  titletype:{
    color: "#850A0B",
    paddingTop: 5,
    textAlign: "left",
    fontSize: 15,
    fontFamily: Fonts.family.base,
  },
  subtitletype:{
    color: "#969696",
    alignItems: "center",
    fontSize: 11,
    fontFamily: Fonts.family.base,
  },
  viewelement:{
    paddingLeft: 30,
    paddingRight: 30
  },
  element:{
    flexDirection: 'row',
  },
  imageIcon:{
    height: 20,
    width: 20,
  },
  text_element:{
    fontSize: 15,
    paddingLeft: 10,
    color: "#777777",
    fontFamily: Fonts.family.base,
  },
});
