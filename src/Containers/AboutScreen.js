import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView, BackHandler } from 'react-native';
import { withNavigation } from "react-navigation";
import { createIconSetFromFontello } from "react-native-vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';

import AutoHeightWebView from 'react-native-autoheight-webview'
import { Dimensions } from 'react-native'

import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";
import config from "../Theme/Fonts/config"
import styles from "../Components/Styles/AboutScreenStyles"; 

import Constants from '../Config/Constants';
import Helper from '../Config/Helpers';

const CustomIcon = createIconSetFromFontello(config);

// Esta pantalla será la primera que se ejecute al seleccionar una especie: lo ideal es que, como ya manda a llamar la galería de la especie, la almacene para que 
// Media no tenga que volver a hacer la llamada al servicio

/* ABOUTSCREEN: Pantalla en la que se muestra Una foto junto con información de la especie */
class AboutScreen extends Component {
  constructor(props) {
    
    // JSON.stringify(props)
    console.log("\n\n\nLlamada a AboutScreen desde constructor \n---------------------------------\n");
    ////CurrentTaxon.id_specie = 7632873;
    super(props)
    this.state = {
      imagen: "",
      contenido_render_array: [],
      spinner: false
    };

    this.fetchData = this.fetchData.bind(this);
    this.UNSAFE_componentWillReceiveProps = this.UNSAFE_componentWillReceiveProps.bind(this);
  }

  getList(content, start, finish, type) {
    var original = content, exist;
    do {
      exist = original.indexOf(start) > -1 ? true : false;
      if (exist) {
        var result = original.substring(original.indexOf(start) + start.length, original.indexOf(finish));
        var stringreplace = start + result + finish;
        if (type == 1)
          original = original.replace(stringreplace, "@~1" + result + "@");
        if (type == 2)
          original = original.replace(stringreplace, "@~2" + result + "@");
        if (type == 3)
          original = original.replace(stringreplace, "@~3" + result + "@");
      }
    } while (exist);
    return original;
  }
  
  getHTMLSpecieResume(id_specie) {
    var urlToGetSpecieInfo = `${Constants.API_ENCICLOVIDA_ESPECIES}${id_specie}${Constants.SPECIE_INFO_HTML}`;
    console.log(urlToGetSpecieInfo);
    fetch(urlToGetSpecieInfo).then((response) => {
      return response.text();
    }).then((html) => {
      try {
        
      } catch (e) {
        Alert.alert("Error en los datos");
      }
      finally {
        // Obtener el resumen de la especie
        //resumen_HTML += "<h1>HOLAAAAAA</h1>";
        this.setState({ resumen_HTML: html, spinner: false });
      }
      
    }).catch(error => {
      this.setState({ spinner: false });
    });
  }

  /* Para evitar la recarga de datos de la misma especie ya consultada */
  setAboutIdSpecie = (id_specie) => {
    global.about_id_specie = id_specie;
  }

  // Función para llamar a servicios de enciclovida: Llamar sólo cuando la especie en curso cambia.
  async fetchData(id_specie, about_id_specie) {
    if (id_specie != about_id_specie) {
      this.setState({ imagen: "", contenido_render_array: [], spinner: true });
      if (id_specie !== 0) {
        console.log("FETCH - LLAMADA A FOTOS Y RESUMEN");
        var defaultPhoto = "";
        // Obtener las fotos: desde el servicio NaturaLista
        const response = await Helper.fetchAllMedia(id_specie);
        const fotos = await response.fotos;
        const videos = await response.videos;
        const audios = await response.audios;

        global.taxonPhotos = fotos;
        global.taxonVideos = videos;
        global.taxonAudios = audios;

        defaultPhoto = Helper.getRandomImage(fotos);

        this.setState({ imagen: defaultPhoto });
        await this.getHTMLSpecieResume(id_specie);

      } else {
        this.setState({ spinner: false, pins: [] });
      }
      this.setAboutIdSpecie(id_specie);
    }
  }

  // se invoca antes de que un componente montado reciba nuevos props
  UNSAFE_componentWillReceiveProps(props) {
    console.log("\n\n - - UNSAFE_componentWillReceiveProps desde AboutScreen- - \n\n");
    //console.log(props.params);

    //about_id_specie
    //media_id_specie

    //Alert.alert("idProps", this.state.load.toString());
    this.fetchData(global.id_specie, global.about_id_specie);
  }
  
  // Se invoca inmediatamente después de que un componente se monte (se inserte en el árbol)
  componentDidMount() {
    console.log("\n\n - - componentDidMount - - \n\n");
    console.log("id_specie: " + global.id_specie + "  -  about_id_specie: " + global.about_id_specie);

    this.fetchData(global.id_specie, global.about_id_specie);
    /*this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
        console.log("back_about");
        global.navigation.navigate(global.listSpecies);
    }); */
    //this.s0! = this.props.navigation.addListener('willFocus', this.onEvent);
    // this.s1! = this.props.navigation.addListener('didFocus', this.onEvent);
    // this.s2! = this.props.navigation.addListener('willBlur', this.onEvent);
    // this.s3! = this.props.navigation.addListener('didBlur', this.onEvent);
  }
  
  // Se invoca inmediatamente antes de desmontar y destruir un componente
  componentWillUnmount() {
    //console.log("\n\n - - componentWillUnmount - - \n\n");
    // this.s0!.remove();
    // this.s1!.remove();
    // this.s2!.remove();
    // this.s3!.remove();
  }

  renderText = (title, i) => {
    return (
      <Text style={styles.text} key={i}>{title}</Text>
    )
  };
  renderTextBold = (title, i) => {
    return (
      <Text style={styles.textBold} key={i}>{title}</Text>
    )
  };
  renderTextItalic = (title, i) => {
    return (
      <Text style={styles.textItalic} key={i}>{title}</Text>
    )
  };
  renderTextBoldItalic = (title, i) => {
    return (
      <Text style={styles.textBoldItalic} key={i}>{title}</Text>
    )
  };

  render() {
    const defaultimage = this.state.imagen == '' ? 'ic_imagen_not_found' : this.state.imagen;
    return (
      <View style={[styles.mainScreen]}>
        <NavBar menuBlackButton={true} infoButton={true} />
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Cargando...'}
            textStyle={{ color: '#FFF' }}
          />
          <ScrollView style={{flex:1}}>
            <Image source={{ uri: defaultimage }} pointerEvents={"none"} style={[{flex: 1, flexDirection: "column" }, styles.image]} />
            
            <AutoHeightWebView 
              style={{ width: Dimensions.get('window').width - 15, marginTop: 35 }}
              //style={styles.textcontent, { width: Dimensions.get('window').width, marginTop: 0 }}
              customScript={`document.body.style.background = 'transparent';`}
              customStyle={styles.customStyleView}
              source={ { html: this.state.resumen_HTML} } 
              scalesPageToFit={true}
              viewportContent={'width=device-width, user-scalable=no'}
              showsVerticalScrollIndicator={true}
            />
          </ScrollView>
        </View>
        <TabBar shownav={true} selected="About" />
      </View>
    );
  }
}

//make this component available to the app
export default withNavigation(AboutScreen);