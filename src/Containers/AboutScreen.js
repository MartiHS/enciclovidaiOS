import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView, BackHandler } from 'react-native';
import { withNavigation } from "react-navigation";
import { createIconSetFromFontello } from "react-native-vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';

import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";
import config from "../Theme/Fonts/config"
import styles from "../Components/Styles/AboutScreenStyles"; 

import CurrentTaxon from '../Config/Consola';
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
 
  getSpecieResume(id_specie) {
    fetch(`${Constants.SPECIE_INFO_ENDPOINT}${id_specie}/resumen-wikipedia`)
      .then(res => res.json())
      .then((json) => {
        let result = [];
        try {
          var original = json.sumamry;
          if (original != "") {
            var arraytmp = [];
            var contet = this.getList(original, "<i><b>", "</b></i>", 1);
            contet = this.getList(contet, "<b>", "</b>", 2);
            contet = this.getList(contet, "<i>", "</i>", 3);
            arraytmp = contet.split("@");
            result = arraytmp.map((data, index) => {
              if (data.indexOf("~1") > -1)
                return this.renderTextBoldItalic(data.replace("~1", ""), index);
              if (data.indexOf("~2") > -1)
                return this.renderTextBold(data.replace("~2", ""), index);
              if (data.indexOf("~3") > -1)
                return this.renderTextItalic(data.replace("~3", ""), index);
              else
                return data;
            });
          } else {
            result = ["No existe ninguna descripción para esta especie"];
          }
        }
        catch (e) {
          Alert.alert("Error en los datos");
        }
        finally {
          // Obtener el resumen de la especie
          this.setState({ contenido_render_array: result, spinner: false });
          global.epecieActual.about_specie = result.map(value => { return value });
          //console.log("EL RESUMEN ES: " + global.epecieActual.about_specie);
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
        const response = await Helper.fetchDataFromNaturalista(id_specie);
        const fotos = await response;
        // Si el servicio devolvió {}, llamar a BDI
        if(fotos.length == 0) {
          //console.log("No hubo fotos en NaturaLista");
          const response2 = await Helper.fetchDataFromBDI(id_specie);
          const fotos2 = response2;
          defaultPhoto = Helper.getRandomImage(fotos2, true);
        } else {
          defaultPhoto = Helper.getRandomImage(fotos, false);
        }
        
        this.setState({ imagen: defaultPhoto });
        
        await this.getSpecieResume(id_specie);
      
      } else {
        this.setState({ spinner: false, pins: [] });
      }
      this.setAboutIdSpecie(id_specie);
    }
  }

  // se invoca antes de que un componente montado reciba nuevos props
  UNSAFE_componentWillReceiveProps(props) {
    console.log("\n\n - - UNSAFE_componentWillReceiveProps desde AboutScreen- - \n\n");
    console.log(props.params);
    //console.log(global.epecieActual);

    //global.epecieActual
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

    /*/ Se invoca inmediatamente después de que la actualización ocurra. Este método no es llamado para el renderizador inicial
  componentDidUpdate(props) {
    console.log("\n\n - - componentDidUpdate - - \n\n");
    return true;
  }*/

  /*/ Para avisar a React si la salida de un componente no se ve afectada por el cambio actual en el estado o los accesorios
  shouldComponentUpdate(nextProps, nextState) {
    console.log("\n\n - - shouldComponentUpdate - - \n\n");
    return true; 
  }*/

  /*/ se invoca justo antes de llamar al método de render
  static getDerivedStateFromProps(props, state) { 
    console.log("\n\n - - getDerivedStateFromProps - - \n\n");
    console.log("Llamada a AboutScreen \n" + JSON.stringify(props.navigation.state.params.id_specie));
    return true; 
  }*/
  
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
          <ScrollView>
            <Image source={{ uri: defaultimage }} style={styles.image} />
            <View style={styles.textcontent}>
              <Text style={styles.text}>
                {this.state.contenido_render_array.map(value => { return value })}
              </Text>
            </View>
          </ScrollView>
        </View>
        <TabBar shownav={true} selected="About" />
      </View>
    );
  }
}

//make this component available to the app
export default withNavigation(AboutScreen);