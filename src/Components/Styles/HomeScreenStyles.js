import { StyleSheet } from "react-native";

import { Metrics, AppStyles, Colors, Fonts } from "../../Theme/";

export default StyleSheet.create({
  ...AppStyles.screen,
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
  },

  // Estilo para la barra de navegación
  navBar: {
    height: Metrics.navBarHeight,
    backgroundColor: Colors.navBarBackground,
    alignItems: "center",
    justifyContent: "center"
  },
  
  // Estilo para el autocompletado:
  // Vista que contiene el campo de texto (autocomplete)
  view: {
    alignItems: 'stretch',
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    height: 70,
  },
  
  // Imagen de fondo (enciclovida)
  image: {
    resizeMode: "contain",
    flex: 1,
  },

  viewImage: {
    height: 60,
    zIndex:-1,
    //marginBottom:40,
  },

  // - - - autocompletado
  autocomplete: {
    paddingLeft: 35,
    fontFamily: Fonts.family.base_bold,
    height: 45,
  },
  
  inputContainerStyle:{
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    borderWidth: 1,
    opacity: .8,
  },
  
  autocompleteContainer: {
    flex: 1,
    height: 300,
  },
  
  listStyle: {
    borderRadius: 10,
    height: 300,
  },

  contentItem: {
    flexDirection: "row",
    margin: 10,
  },
  
  text_view:{
    paddingLeft: 10,
  },
  
  itemText: {
    color: '#575659',
    fontSize: 15,
    margin: 2,
    fontFamily: Fonts.family.base,
  },
  
  itemTextSecond: {
    color: '#95928E',
    fontSize: 15,
    margin: 2,
    fontFamily: Fonts.family.base,
  },
  
  itemimage: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },
  
  favicon: {
    position: "absolute",
    zIndex: 2,
    top: 10,
    left: 25,
  },
  
  footerImage: {
    position: "absolute",
    height: '30%',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex:-1,
    //width: 'auto', 
    //height: '100%',
    resizeMode: 'cover'
  },
});