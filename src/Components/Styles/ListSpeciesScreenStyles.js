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

  container: {
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
  },
  touchableItem: {
    flexDirection: 'row',
    width: '100%',
    margin: 0,
    padding: 0,
    //backgroundColor: 'red'
  },
  listItem: {
    margin: 5,
    padding: 0,
    backgroundColor: "#FFFFFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 20,
    // Sobreado
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  imageItem: {
    width: 80,
    height: 80,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 20,
    margin:0,
    padding:45
  },
  customHIcon: {
   backgroundColor: Colors.green,
   padding: 4,
   borderRadius: 4,
   marginRight: 5,
   height: '90%'
  },
  customHIconText: {
    fontSize: 9,
    color: Colors.white,
    fontFamily: Fonts.family.base_bold
  },
  specieIcons: {
    flexDirection: 'row',
    width: '100%',
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
  specieIcon: {
    paddingLeft: 5,
    fontSize: 15
  },
  headerResults: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    padding:3,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 10
  },
  textInHeaderResults: {
    width: '30%',
    paddingLeft: 10,
    fontFamily: Fonts.family.base_bold,
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: Colors.gray,
  },
  iconsInHeaderResults: {
    width: '70%',
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flatIconList: {
   // backgroundColor: 'blue',
  },
  filterHIcon:{
    paddingRight: 5,
    color: Colors.blue,
    fontSize: 20
  },
  textRow: {
    padding: 10,
    alignItems: "flex-start",
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
  },
  titleRow: {
    textAlign: 'center',
    fontWeight: "bold",
    justifyContent: 'center',
    paddingBottom: 3,
    color: Colors.black,
  },
  subTitleRow: {
    textAlign: 'left',
    fontWeight: 'normal',
    justifyContent: 'flex-start',
    fontStyle: 'italic',
    paddingBottom: 10
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

  /* BASURA: 
  
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
    imageempty: {
    opacity: 0.5,
    height: 180,
    width: '100%',
    resizeMode:"cover"
  },
  
  */
});
