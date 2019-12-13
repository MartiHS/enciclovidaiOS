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
  flatList:{
    flex:1
  },
  viewflat:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 300,
    width: '100%',
  },
  imageempty: {
    opacity: 0.5,
    height: 180,
    width: '100%',
    resizeMode:"cover"
  },
  view_text_image: {
    padding: 10,
    backgroundColor: '#000000',
    opacity: 0.8,
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  view_text_title: {
    color: "#FFFFFF",
    fontSize: 15,
    //fontWeight: "bold",
    fontFamily: Fonts.family.base_bold,
  },
  view_text_subtitle: {
    color: "#FFFFFF",
    fontSize: 13,
    //fontStyle: "italic",
    fontFamily: Fonts.family.base_italic,
  },
  btnfooter: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textfooter: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  empty_text: {
    flex: 1,
    height: 500,
    justifyContent: 'center', 
    alignItems: 'center'
  },
});
