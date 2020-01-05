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
  containerempty: {
    flex: 1,
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
  clusterContainer: {
    width: 30,
    height: 30,
    borderWidth: 4,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#D8B2B2',
    justifyContent: 'center',
    backgroundColor: '#76AEF3'
  },
  counterText: {
    fontSize: 7,
    color: Colors.white,
    //fontWeight: '200',
    fontFamily: Fonts.family.base,
  },
  viewText: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex:10,
  },
  textmap: {
    ...Fonts.style.h1,
    color: colors.white,
    padding: 10,
  },
  image:{
    flex: 1,
    width: '100%', 
    height: '100%',
    resizeMode: 'cover'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLeyend: {
    ...Fonts.style.h3_small,
    flex: 1,
    color: "#DF8822",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 5,
    margin: 5
  },
  textLeyend1: {
    color: colors.black,
  },
  textLeyend2: {
    color: colors.black,
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
    margin:10,
    padding: 10,
  },
});
