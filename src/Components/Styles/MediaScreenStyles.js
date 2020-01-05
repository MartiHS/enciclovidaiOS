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
  navBarDialog: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
    height: 300,
    width: '100%',
  },
  imageshow: {
    marginTop: 7,
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding:-10,
    marginRight:0
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
  view_text: {
    color: "#FFFFFF",
    fontSize: 13,
    //fontWeight: "bold",
    
  }
});
