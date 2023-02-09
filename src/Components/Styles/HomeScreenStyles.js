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

  contentList: {
    backgroundColor: Colors.navBarBackground,
    width: '100%'
  },
  
  // Estilo para el autocompletado:
  // Vista que contiene el campo de texto (autocomplete)
  view: {
    alignItems: 'stretch',
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    height: 70,
    //backgroundColor: 'red'
  },

  viewIn: {
    paddingTop: 15,
    alignItems: 'stretch',
    flexDirection: "row",
    paddingLeft: 1,
    paddingRight: 1,
    height: 100,
    //backgroundColor: 'red'
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
    paddingLeft: 45,
    fontFamily: Fonts.family.base_bold,
    height: 45,
  },
  
  inputContainerStyle:{
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 0.5,
    opacity: .8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 2.46,
  },
  
  autocompleteContainer: {
    flex: 1,
    height: 300,
    width: '110%'
  },

  autocompleteContainerIn: {
    flex: 1,
    height: 300,
    width: '100%'
  },
  
  listStyle: {
    borderRadius: 10,
    height: 300,
    marginLeft: -0,
    marginRight: -0,
    zIndex: 5
  },

  contentItem: {
    flexDirection: "row",
    margin: 10,
  },

  finSpeciesText: {
    color: '#575659',
    fontSize: 15,
    margin: 5,
    fontFamily: Fonts.family.base_italic,
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

  especieSeleccionada:{
    //marginTop: -100,
    paddingBottom: 160,
    zIndex: -1,
    //backgroundColor: 'red'
  },
  
  customSearchIcon: {
    position: "absolute",
    zIndex: 2,
    top: 10,
    left: 18,
    fontSize: 25,
    color: Colors.navBarBackground,
  },

  customClearIcon: {
    //position: "absolute",
    //zIndex: 2,
    //top: 10,
    //left: 320,
    fontSize: 25,
    padding: 10,
    color: Colors.gray,
    //backgroundColor: 'red'
  },

  customSearchIconIn: {
    position: "absolute",
    zIndex: 2,
    top: 10,
    left: 10,
    fontSize: 25,
    color: Colors.navBarBackground,
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