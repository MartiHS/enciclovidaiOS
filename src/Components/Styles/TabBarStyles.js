import { StyleSheet } from "react-native";

import { Metrics, Colors, Fonts } from "../../Theme/";
export default StyleSheet.create({
  container: {
    height: Metrics.tabBarHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: Colors.backgroundTabUnSelect
  },
  view: {
    justifyContent: 'center',
    flex:1,
    alignItems: 'center'
  },
  text: {
    fontFamily: Fonts.family.base_bold,
    //fontWeight: "bold",
    color: Colors.white,
  },
  image: {
    height: 50,
    //resizeMode: "contain",
    flex: 1,
  },
  containerButton: {
    height: Metrics.tabBarHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundTabButton
  },
  tab: {
    flex: 1,
    height: Metrics.tabBarHeight,
    padding: Metrics.smallSpace,
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius:5,
    borderTopStartRadius:5
  },
  tabText: {
    color: Colors.TabUnSelect,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Fonts.family.base_bold,
    fontSize: Fonts.size.h3,
    //fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,//24
    letterSpacing: 0,
    textAlign: "center",
  },
  selected: {
    color: Colors.TabSelect,
    backgroundColor: Colors.backgroundTabSelect
  },
  tabLine: {
    position: "absolute",
    backgroundColor: Colors.TabSelect,
    height: 4,
    left: Metrics.baseSpace,
    right: Metrics.baseSpace,
    bottom: 0
  }
});
