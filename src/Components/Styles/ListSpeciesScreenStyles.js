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
  },
  listItem: {
    margin: 5,
    padding: 10,
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
    borderRadius: 40
  },
  textRow: {
    padding: 10,
    alignItems: "center",
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1
  },
  titleRow: {
    textAlign: 'center',
    fontWeight: "bold",
    justifyContent: 'center',
    paddingBottom: 8

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
