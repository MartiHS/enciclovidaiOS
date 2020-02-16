//import liraries
import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView , BackHandler} from 'react-native';
//import {Icon} from 'react-native-elements';
import { NavigationEventSubscription, withNavigation } from "react-navigation";
import { createIconSetFromFontello } from "react-native-vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';
import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";
import config from "../Theme/Fonts/config"
import styles from "../Components/Styles/AboutScreenStyles";

const CustomIcon = createIconSetFromFontello(config);

const SPECIE_PHOTOS_ENDPOINT = 'http://enciclovida.mx/especies/';
const SPECIE_INFO_ENDPOINT = 'http://api.enciclovida.mx/especie/descripcion/';

// create a component

class AboutScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imagen: "",
      contenido_render_array: [],
      spinner: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.UNSAFE_componentWillReceiveProps=this.UNSAFE_componentWillReceiveProps.bind(this);
  }   

  getSpecieImageUrl(id_specie){
    fetch(`${SPECIE_PHOTOS_ENDPOINT}${id_specie}/fotos-naturalista.json`)
    .then(res => res.json())
    .then((json) => {
      let specieImage=json.fotos && json.fotos.length > 0? json.fotos[0].photo.medium_url :"";
      this.setState({ imagen: specieImage});
      console.log(`${SPECIE_PHOTOS_ENDPOINT}${id_specie}/fotos-naturalista.json`);
      console.log(json);
    }).catch(error => {
      Alert.alert("Error en los datos");
      console.log(error);
    });
  }

  getList(content, start, finish, type){
    var original = content, exist;
    do{
      exist = original.indexOf(start) > -1 ? true : false;
      if(exist){
        var result = original.substring(original.indexOf(start)+start.length, original.indexOf(finish));
        var stringreplace = start + result + finish;
        if(type == 1)
          original = original.replace(stringreplace, "@~1"+result+"@");
        if(type == 2)
          original = original.replace(stringreplace, "@~2"+result+"@");
        if(type == 3)
          original = original.replace(stringreplace, "@~3"+result+"@");
      }
    }while(exist);
    return original;
  }

  getSpecieResume(id_specie){
    fetch(`${SPECIE_INFO_ENDPOINT}${id_specie}/resumen-wikipedia`)
    .then(res => res.json())
    .then((json) => {
      let result=[];
      try {
        var original = json.sumamry;
        if(original != ""){
          var arraytmp = [];
          var contet = this.getList(original, "<i><b>", "</b></i>", 1);
          contet = this.getList(contet, "<b>", "</b>", 2);
          contet = this.getList(contet, "<i>", "</i>", 3);
          arraytmp = contet.split("@");
          result = arraytmp.map((data, index) => { 
            if(data.indexOf("~1") > -1)
              return this.renderTextBoldItalic(data.replace("~1", ""), index);
            if(data.indexOf("~2") > -1)
              return this.renderTextBold(data.replace("~2", ""), index);
            if(data.indexOf("~3") > -1)
              return this.renderTextItalic(data.replace("~3", ""), index);
            else
              return data;
          });
        }
      }
      catch (e) {
        Alert.alert("Error en los datos");
      }
      finally{
        this.setState({ contenido_render_array: result, spinner: false });
      }
    }).catch(error => {
      this.setState({ spinner: false });
    });
  }

    /**to prevent reload data from the same specie */
    setAboutIdSpecie=(id_specie)=>{
        global.about_id_specie=id_specie;
    }

    async fetchData (id_specie, about_id_specie) {        
        if(id_specie != about_id_specie){
            this.setState({ imagen: "", contenido_render_array:[], spinner: true});
            if(id_specie !== 0){
                
                await this.getSpecieImageUrl(id_specie);
                await this.getSpecieResume(id_specie);
            }
            else {
                this.setState({ spinner: false, pins: [] });
            }
            this.setAboutIdSpecie(id_specie);
        }
    }

    

    UNSAFE_componentWillReceiveProps() {
        //Alert.alert("idProps", this.state.load.toString());
        this.fetchData(global.id_specie, global.about_id_specie);
    }

    
    componentDidMount(){
      this.fetchData(global.id_specie, global.about_id_specie);
      /*this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
          console.log("back_about");
          global.navigation.navigate(global.listSpecies);
      });*/
      //this.s0! = this.props.navigation.addListener('willFocus', this.onEvent);
      // this.s1! = this.props.navigation.addListener('didFocus', this.onEvent);
      // this.s2! = this.props.navigation.addListener('willBlur', this.onEvent);
      // this.s3! = this.props.navigation.addListener('didBlur', this.onEvent);
    }

    componentWillUnmount(){
      // this.s0!.remove();
      // this.s1!.remove();
      // this.s2!.remove();
      // this.s3!.remove();
    }

    renderText = (title, i) => {
        return(
            <Text style={styles.text} key={i}>{title}</Text>
        )
    };
    renderTextBold = (title, i) => {
        return(
            <Text style={styles.textBold} key={i}>{title}</Text>
        )
    };
    renderTextItalic = (title, i) => {
        return(
            <Text style={styles.textItalic} key={i}>{title}</Text>
        )
    };
    renderTextBoldItalic = (title, i) => {
        return(
            <Text style={styles.textBoldItalic} key={i}>{title}</Text>
        )
    };

    render() {
        const defaultimage = this.state.imagen == '' ? 'ic_imagen_not_found' : this.state.imagen;
        return (
            <View style={[styles.mainScreen]}>
                <NavBar menuBlackButton={true} infoButton={true}/>
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Cargando...'}
                        textStyle={{color: '#FFF'}}
                        />
                    <ScrollView>
                        <Image source={{ uri: defaultimage }} 
                            style={styles.image} />
                        <View style={styles.textcontent}>
                            <Text style={styles.text}>
                                {this.state.contenido_render_array.map(value => {return value})}
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