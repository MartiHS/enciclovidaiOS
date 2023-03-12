import React, { Component } from 'react';
import { View, Image, FlatList, TouchableOpacity, Text, Keyboard, Alert, TouchableHighlight, ImageBackground} from 'react-native';
import { withNavigation } from "react-navigation";

import NavBar from '../Components/NavBar'; 
import styles from "../Components/Styles/FindByLocationStyles";
import Constants from '../Config/Constants';

import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import { createIconSetFromFontello } from "react-native-vector-icons";
import config from "../Theme/Fonts/config.json"
import { Fonts, Colors } from '../Theme';
const CustomIcon = createIconSetFromFontello(config);

const listsParams = {
    SpeciesRisk: {
      filter: "?iucn_ids=25&iucn_ids=26&iucn_ids=27&iucn_ids=28&iucn_ids=29",
      title: "Especies en riesgo", 
      icon: [
        {id:25, name: "Extinto (EX)", icon: "extinto-ex"},
        {id:26, name: "Extinto en estado silvestre (EW)", icon: "extinto-en-estado-silvestre-ew"},
        {id:27, name: "En peligro crítico (CR)", icon: "en-peligro-critico-cr"},
        {id:28, name: "En peligro (EN)", icon: "en-peligro-en"},
        {id:29, name: "Vulnerable (VU)", icon: "vulnerable-vu"},
      ]
    },
    SpeciesExotic: {
      filter: "?dist=10",
      title: "Especies exóticas",
      icon: {id:"6", name: "Exótica-Invasora", icon: "exotica-invasora"}
    },
    SpeciesEndemic: {
      filter: "?dist=3",
      title: "Especies endémicas",
      icon: {id:"3", name: "Endémica", icon: "endemica"}
    },
    SpeciesUses: {
        filter: "?uso=11-4-0-0-0-0-0&uso=11-16-0-0-0-0-0&uso=11-5-0-0-0-0-0&uso=11-40-1-0-0-0-0&uso=11-40-2-0-0-0-0&uso=11-8-0-0-0-0-0&uso=11-47-0-0-0-0-0&uso=11-9-0-0-0-0-0&uso=11-10-0-0-0-0-0&uso=11-11-0-0-0-0-0&uso=11-13-0-0-0-0-0&uso=11-15-0-0-0-0-0&uso=11-14-0-0-0-0-0",
        title: "Usos y agrobiodiversidad",
        icon: {id:"3", name: "Endémica", icon: "endemica"}
      },
    SpeciesByLocation: {
      filter: "",
      title: "BY L",
      icon: ""
    }
  };

/* HOMESCREEN: pantalla en la que se muestra el buscador de especies junto al menú  izquierdo */
class HomeScreen extends Component {

    constructor(props) {
        console.log("\n\n\nLlamada a FindByLocation\n---------------------------------\n");
        super(props); 
        global.id_specie = 0;
        global.title = "";
        global.subtitle = "";
        global.tipo_region = "";
        global.nom_reg = "";
        global.locationData = {nom_reg: ""}
        global.taxonPhotos = [];
        global.taxonPhotos_BDI_source = false;
        
        global.listSpecies = "";
        global.LastlistSpecies = "";
        global.lastLocationData = ""
        global.classificationList = [];
        global.ListReino = global.DataFilterReinos;
        global.ListAnimales = global.DataFilterAnimales;
        global.ListPlantas = global.DataFilterPlantas;

        this.state = {
            data: [],
            query: '',
            show: true,
        };
        this._keyboardDidShow = () => {
            this.setState({
                show: false
            });
        }
    
        this._keyboardDidHide = () => {
            this.setState({
                show: true
            });
        }
    }
 
    // Se invoca inmediatamente después de que un componente se monte (se inserte en el árbol)
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide
        );
        console.log("Estoy en HOME");
    }

    // Este método es llamado cuando un componente se elimina del DOM
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    goToFind = () => {
        const {navigation} = this.props;
        navigation.navigate("Find");
        navigation.closeDrawer();
    };

    goToFindByL = () => {
        const {navigation} = this.props;
        navigation.navigate("FindByLocation");
        navigation.closeDrawer();
    };

    goToSpeciesList = (listName) => {
        if (listsParams[listName] !== undefined) {
            const { navigation } = this.props;
            this.setFilterProperties(listName);
            navigation.navigate(listName, {});
            navigation.closeDrawer();
        }
    };

    setFilterProperties = (speciesClass) => {
        global.filtro = listsParams[speciesClass].filter;
        global.filtroIcons = [listsParams[speciesClass].icon];
        global.title = listsParams[speciesClass].title;
        global.listSpecies = speciesClass;
        global.subtitle = "";

        global.ListReino = global.DataFilterReinos;
        global.ListAnimales = global.DataFilterAnimales;
        global.ListPlantas = global.DataFilterPlantas;
        global.id_specie = 0;
    };

    footer = () => {
        if(this.state.show){
            return(
                <View style= {{flexDirection: 'row', bottom: 0, justifyContent: "center", paddingTop:10, padding: 10, width: '100%', }}> 
                    <View>
                        <CustomIcon style={{fontSize:50, marginBottom:-60, color: Colors.blue, width: 150}} name='enciclo'></CustomIcon>
                        <CustomIcon style={{fontSize:50, color: 'rgba(140, 154, 81, 1)', width: 150}} name='vida'></CustomIcon>
                    </View>
                </View>
            )
        }
        else { 
            return(
                <View></View>
            )
        }
    }; 

    render() {
    
        return (
            /* Barra de navegación */
            <View style={[styles.mainScreen]}>
                <NavBar white={true} title = ""  menuLightButton={true}/>  
                
                <View style={styles.container}>
                    
                    <View style={{flexDirection:'row', justifyContent: 'center', paddingLeft: 15, paddingRight: 15, top: 0, width: '100%'}}>
                        <Text style={{textAlign: 'center', color: Colors.gray, fontFamily: Fonts.family.base_bold, fontSize: 15}}>
                            Prueba nuestras diferentes herramientas de búsqueda:
                        </Text>
                    </View>
                    
                    <View style={[{flexDirection:'row', padding: 10,  justifyContent: "center", alignItems: "center",  width:'100%'}]}>
                      
                        <TouchableHighlight onPress = {this.goToFind} style={styles.fHOMEButtonContainer} >
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx/imagenes/app/home/especies.jpg" }}
                                    />
                                </View>

                                <View style={styles.textHOMEButtonContainer}>
                                    <CustomIcon style={styles.textHOMEButtonIcon} name='grupo-iconico'></CustomIcon>
                                    <Text style={styles.textHOMEButton}>Especies</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress = {this.goToFindByL} style={styles.fHOMEButtonContainer} >
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx/imagenes/app/home/ubicacion.jpg" }}
                                    />
                                </View>

                                <View style={styles.textHOMEButtonContainer}>
                                    <Icon2 name="crosshairs-gps" style={styles.textHOMEButtonIcon}></Icon2>
                                    <Text style={styles.textHOMEButton}>Por tu ubicación</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
 
                    </View>


                    <View style={[{flexDirection:'row', padding: 10, justifyContent: "center", alignItems: "center",  width:'100%'}]}>

                        <TouchableHighlight onPress = {() => { this.goToSpeciesList("SpeciesEndemic")}} style={styles.fHOMEButtonContainer}>
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx/imagenes/app/home/endemicas.jpg" }}
                                    />
                                </View>
                                <View style={styles.textHOMEButtonContainer}>
                                    <CustomIcon style={styles.textHOMEButtonIcon} name='endemica'></CustomIcon>
                                    <Text style={styles.textHOMEButton}>Endémicas</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress = {() => { this.goToSpeciesList("SpeciesRisk")}} style={styles.fHOMEButtonContainer} >
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx/imagenes/app/home/en_peligro.jpg" }}
                                    />
                                </View>

                                <View style={styles.textHOMEButtonContainer}>
                                    <CustomIcon style={styles.textHOMEButtonIcon} name='en-riesgo'></CustomIcon>
                                    <Text style={styles.textHOMEButton}>En riesgo</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                    </View>
                    

                    <View style={[{flexDirection:'row', padding: 10, justifyContent: "center", alignItems: "center",  width:'100%'}]}>
                        
                        <TouchableHighlight onPress = {() => { this.goToSpeciesList("SpeciesUses")}} style={styles.fHOMEButtonContainer} >
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx/imagenes/app/home/usos.jpg" }}
                                    />
                                </View>

                                <View style={styles.textHOMEButtonContainer}>
                                    <CustomIcon style={styles.textHOMEButtonIcon} name='exotica-invasora'></CustomIcon>
                                    <Text style={styles.textHOMEButton}>Usos y agrobiodiversidad</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress = {() => { this.goToSpeciesList("SpeciesExotic")}} style={styles.fHOMEButtonContainer} >
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx/imagenes/app/home/exoticas.jpg" }}
                                    />
                                </View>

                                <View style={styles.textHOMEButtonContainer}>
                                    <CustomIcon style={styles.textHOMEButtonIcon} name='exotica-invasora'></CustomIcon>
                                    <Text style={styles.textHOMEButton}>Exóticas invasoras</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                    </View>
                    {this.footer()}
                </View>
            </View>
        );
    }
}

//make this component available to the app
export default withNavigation(HomeScreen);
