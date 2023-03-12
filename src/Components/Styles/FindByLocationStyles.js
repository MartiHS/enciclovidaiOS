import { StyleSheet } from "react-native";

import { Metrics, AppStyles, Colors, Fonts } from "../../Theme";

export default StyleSheet.create({
  ...AppStyles.screen,
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    //backgroundColor: 'rgba(48, 50, 44, 0.8)'
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
    paddingLeft: 35,
    paddingRight: 20,
    height: 55,
    width:"90%"
  },

  viewResultLocationStyle:{
    paddingLeft: 55,
  },
  
  // Imagen de fondo (enciclovida)
  image: {
    resizeMode: "contain",
    flex: 1,
  },

  viewImage: {
    height: 60,
    zIndex:-1,
    marginTop:20
    //marginBottom:40,
  },

  searchBar:{
    flexDirection: "row",
    width:"100%",
    //paddingTop: 30,
  },
  // - - - autocompletado
  autocomplete: {
    paddingRight: 15,
    paddingLeft: 15,
    fontFamily: Fonts.family.base_bold,
    height: 45,
    color: Colors.black,
  },

  findBLAutocomplete: {
    paddingRight: 15,
    paddingLeft: 15,
    fontFamily: Fonts.family.base_bold,
    height: 45,
    color: Colors.black,
  },

  customLocationIconTouch:{ 
    top: 5,
    left: 18,
  },

  customLocationIcon: {
    fontSize: 30,
    color: Colors.navBarBackground,
  },

  clearInputText: {
    fontSize: 20,
    color: Colors.navBarBackground,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  
  inputContainerStyle:{
    backgroundColor: 'white',
    borderRadius: 10,
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
  },
  
  listStyle: {
    borderRadius: 10,
    height: 300,
  },

  contentItem: {
    flexDirection: "row",
    margin: 10,
    //backgroundColor: '',
    zIndex: 10,
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

  text_element:{
    fontSize: 15,
    paddingLeft: 10,
    color: "#777777",
    fontFamily: Fonts.family.base,
  },
  
  customSearchIcon: {
    position: "absolute",
    zIndex: 2,
    top: 5,
    left: 18,
    fontSize: 35,
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


  // Estilos para los botones de imagenes

  fHOMEButtonContainer: {
    margin: 5, 
    borderRadius:10, 
    width: "50%"
  },

  imageHOMEButtonContainer: {
    padding: 0, 
    margin: 0, 
    width:"100%"
  },

  imageHOMEButton: {
    width: '100%', 
    height: 150, 
    borderRadius:10,
  },

  textHOMEButtonContainer: {
    backgroundColor: 'rgba(250, 250, 250, 0.9)',  
    marginTop:-24, 
    height:24, 
    paddingTop:2, 
    paddingLeft: 5, 
    margin: 0, 
    width:"100%", 
    flexDirection:'row', 
    borderBottomLeftRadius:10, 
    borderBottomRightRadius:10,

    // Sombra
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textHOMEButtonIcon: {
    fontSize: 17, 
    color: Colors.green,
    //textShadowColor: 'rgba(0, 0, 0, 0.3)',
    //textShadowOffset: {width: -0.6, height: 0.6},
    textShadowRadius: 0.2,
  },

  textHOMEButton: {
    marginLeft: 5,
    fontSize: 14, 
    fontWeight: '600',
    top: 0,
    //textShadowColor: 'rgba(0, 0, 0, 0.3)',
    //textShadowOffset: {width: -0.6, height: 0.6},
    textShadowRadius: 0.2,
    color: Colors.green,
    fontFamily: Fonts.family.base_bold
  },

});


