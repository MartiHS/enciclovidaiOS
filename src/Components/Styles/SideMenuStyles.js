import { StyleSheet } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Metrics, Colors, Fonts } from "../../Theme/";
import colors from "../../Theme/Colors";

export default StyleSheet.create({
  flex_1:{flex:1},
  pt_10:{ paddingTop: 0},
  p_10:{ padding:10},
  content: {
    backgroundColor: Colors.backgroundSlide,
    flexDirection:"column",
    justifyContent:"space-between", 
  },
  menu: {
    top: 20,
    flex:1,
    justifyContent:"flex-start",
    alignItems:"flex-start",
  },
  image_container:{
    flex:0.08,
    padding:10,
  },
  image: {
    height:"100%",
  },
  
  row: {
    padding:Metrics.baseSpace,
  },
  favicon: {
    paddingHorizontal: 10,
  },
  row2: {
    padding:Metrics.baseSpace,
    flexDirection: 'row',
  },
  menuContainer: {
    height: Metrics.navBarHeight,
    paddingHorizontal: Metrics.baseSpace,
    paddingVertical: Metrics.smallSpace,
    
  },
  touchmenu:{
    //height:50,
  },
  title: {
    ...Fonts.style.h3,
    color: Colors.white,
  },
  titleHeader: {
    ...Fonts.style.h4,
    color: Colors.white,
    paddingLeft: 25,
    paddingTop: 15,
  },
  tabLine: {
    backgroundColor: Colors.white,
    height: 2,
    marginLeft:10,
    width:"100%"
  },
  menuItem:{
    width:"100%",
    alignItems:"flex-start",
    justifyContent:"center",
    alignContent:"center",
  },
  subMenuItem:{
    width:"100%",
    paddingLeft:40,
    alignItems:"flex-start",
    justifyContent:"center",
    alignContent:"center",
  }
  
});
