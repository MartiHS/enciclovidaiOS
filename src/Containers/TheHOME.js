import React, { Component } from 'react';
import { View, Image, FlatList, TouchableOpacity, Text, Keyboard, Alert, TouchableHighlight, ImageBackground} from 'react-native';
import { withNavigation } from "react-navigation";

import NavBar from '../Components/NavBar'; 
import styles from "../Components/Styles/FindByLocationStyles";
import Constants from '../Config/Constants';

import Icon2 from 'react-native-vector-icons/MaterialIcons';

import { Fonts, Colors } from '../Theme';

import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Listas from '../Config/Listas';
import Helper from '../Config/Helpers';

import { CustomAppIcon } from '../Theme/Fonts/Custom.App.Icon';

const listsParams = {
    SpeciesRisk: {
      filter: "?nom_ids=14&nom_ids=15&nom_ids=16&nom_ids=17",
      title: "Especies en riesgo", 
      icon: [
        {id:16, name: "Probablemente extinta en el medio silvestre (E)", icon: "probablemente-extinta-en-el-medio-silvestre-e", order: 1, selected: false},
        {id:14, name: "En peligro de extinción (P)", icon: "en-peligro-de-extincion-p", order: 1, selected: false},
        {id:15, name: "Amenazada (A)", icon: "amenazada-a", order: 1, selected: false},
        {id:17, name: "Sujeta a protección especial (Pr)", icon: "sujeta-a-proteccion-especial-pr", order: 1, selected: false},
      ]
    },
    SpeciesExotic: {
      filter: "?dist=6",
      title: "Exóticas invasoras",
      icon: [
        {name: "Exótica-Invasora", icon: "exotica-invasora"}
      ]
    },
    SpeciesEndemic: {
      filter: "?dist=3",
      title: "Especies endémicas",
      icon: [{name: "Endémica", icon: "endemica"}]
    },
    SpeciesUses: {
        filter: "?uso=11-4-0-0-0-0-0&uso=11-16-0-0-0-0-0&uso=11-5-0-0-0-0-0&uso=11-40-1-0-0-0-0&uso=11-40-2-0-0-0-0&uso=11-8-0-0-0-0-0&uso=11-47-0-0-0-0-0&uso=11-9-0-0-0-0-0&uso=11-10-0-0-0-0-0&uso=11-11-0-0-0-0-0&uso=11-13-0-0-0-0-0&uso=11-15-0-0-0-0-0&uso=11-14-0-0-0-0-0",
        title: "Usos y agrobiodiversidad",
        icon: [
            {name: "Ambiental", icon: "-"},
            {name: "Artesanía", icon: "-"},
            {name: "Combustible", icon: "-"},
            {name: "Consumo animal", icon: "-"},
            {name: "Consumo humano", icon: "-"},
            {name: "Industrial", icon: "-"},
            {name: "Maderable", icon: "-"},
            {name: "Manejo de plagas", icon: "-"},
            {name: "Materiales", icon: "-"},
            {name: "Medicinal", icon: "-"},
            {name: "Melífera", icon: "-"},
            {name: "Ornamental", icon: "-"},
            {name: "Sociales/religiosos", icon: "-"},
        ]
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
        global.locationData = {nom_reg: ""};
        global.taxonPhotos = [];
        global.taxonPhotos_BDI_source = false;

        global.gFiltro = "";
    global.gFiltroIcons =  {};

        global.listSpecies = "";
        global.LastlistSpecies = "";
        global.lastLocationData = ""
        global.classificationList = [];
        global.ListAnimales = Listas.DataFilterAnimales;
        global.ListPlantas = Listas.DataFilterPlantas;

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
        
        Helper.resteFilters();

        console.log("Estoy en HOME");
    }

    // Este método es llamado cuando un componente se elimina del DOM
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    // Ir al buscador de especies
    goToFind = () => {
        const {navigation} = this.props;
        Helper.resteFilters();
        navigation.navigate("Find");
        navigation.closeDrawer();
    };

    // Ir al buscador de especies por ubicación
    goToFindByL = () => {
        const {navigation} = this.props;
        Helper.resteFilters();
        navigation.navigate("FindByLocation");
        navigation.closeDrawer();
    };

    // Ir a las búsquedas a nivel nacional
    goToSpeciesList = (listName) => {
        if (listsParams[listName] !== undefined) {
            // Limpiar filtros
            Helper.resteFilters();
            // Actualizar filtros globales
            Helper.applyGFilters(listName);
            // Abrir Vista
            const { navigation } = this.props;
            navigation.navigate(listName, {});
            navigation.closeDrawer();
        }
    };

    fetchMunicipality = async (location) => {
        console.log(">> fetchMunicipality");
        this.setState({ query: "" })
        // Si existe una query para llamar:
        if(location != null){ 
            fetch('https://api.enciclovida.mx/v2/municipios/ubicacion?latitud=' + location['lat'] + '&longitud=' + location['lng'])
            .then(res => res.json())
            .then((json) => {
                let dataLocation = {
                    region_id: json.munid,
                    nom_reg: json.nom_mun + ', ' + json.nom_ent,
                    tipo_region: 'Municipio',
                    latitud: location['lat'],
                    logitud: location['lng'],
                };
                console.log(">> LOCATION INFO");
                console.log(dataLocation);
                this.setState({ dataLoc: dataLocation});
                
                const{ navigation } = this.props;
                global.listSpecies = "SpeciesByLocation";
                global.locationData = dataLocation;
                global.title = global.locationData.nom_reg + " - " + global.locationData.tipo_region;
                global.subtitle = "";
          
                navigation.navigate(global.listSpecies, {
                    data: { 
                        origen: 'ByLocation',
                    },
                });

            }).catch((error) => {

            });
        } else {
            this.setState({ dataLoc : [] });
        }
    }

    iosEnciclovidaIcon = () => {
        return(
            <View style= {{flexDirection: 'row', bottom: 0, justifyContent: "center", paddingTop:10, padding: 10, width: '100%', height: 70}}> 
                <View>
                    <CustomAppIcon style={{fontSize:50, marginBottom:-50, color: Colors.blue, width: 150}} name='enciclo'></CustomAppIcon>
                    <CustomAppIcon style={{fontSize:50, color: 'rgba(140, 154, 81, 1)', width: 150}} name='vida'></CustomAppIcon>
                </View>
            </View>
        )
    }; 

    androidEnciclovidaIcon = () => {
        return(
            <View style= {{flexDirection: 'row', bottom: 0, justifyContent: "center", paddingTop:10, padding: 10, width: '100%', height: 70}}> 
                <View>
                    <CustomAppIcon style={{fontSize:50, marginBottom:-67, color: Colors.blue, width: 150}} name='enciclo'></CustomAppIcon>
                    <CustomAppIcon style={{fontSize:50, color: 'rgba(140, 154, 81, 1)', width: 150}} name='vida'></CustomAppIcon>
                </View>
            </View>
        )
    }; 

    footer = () => {
        if(this.state.show){
            return((Platform.OS === 'android') ?  this.androidEnciclovidaIcon() : this.iosEnciclovidaIcon());
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
                    
                    <View style={{flexDirection:'row', justifyContent: 'center', paddingLeft: 15, paddingRight: 15, top: -10, width: '100%'}}>
                        <Text style={{textAlign: 'center', color: Colors.gray, fontFamily: Fonts.family.base_bold, fontSize: Fonts.size.h1}}>
                            Buscar
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
                                    <CustomAppIcon style={styles.textHOMEButtonIcon} name='grupo-iconico'></CustomAppIcon>
                                    <Text style={styles.textHOMEButton}>Especies</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight 
                            onPress = { async() => {
                                const hasLocationPermission = await request(
                                    Platform.select({
                                        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                                        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                                    }),
                                    {
                                        title: 'Enciclovida',
                                        message: 'Enciclovida would like access to your location ',
                                    },
                                );
                                
                                if (hasLocationPermission=== 'granted') {
                                    Geolocation.getCurrentPosition(async(position) => {
                                        console.log('position: ');
                                        console.log(position);
                                        console.log(position.coords.latitude);
                                        console.log(position.coords.longitude);
                                        let coordsDevice = {
                                            lat: position.coords.latitude,
                                            lng: position.coords.longitude
                                        };
                                        Helper.resteFilters();
                                        this.fetchMunicipality(coordsDevice);
                                    });
                                }
                            }}
                        
                         style={styles.fHOMEButtonContainer} >
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx/imagenes/app/home/ubicacion.jpg" }}
                                    />
                                </View>

                                <View style={styles.textHOMEButtonContainer}>
                                    <Icon2 name="gps-fixed" style={styles.textHOMEButtonIcon}></Icon2>
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
                                    <CustomAppIcon style={styles.textHOMEButtonIcon} name='endemica'></CustomAppIcon>
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
                                    <CustomAppIcon style={styles.textHOMEButtonIcon} name='en-riesgo'></CustomAppIcon>
                                    
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
                                    <CustomAppIcon style={styles.textHOMEButtonIcon} name='exotica-invasora'></CustomAppIcon>
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
                                    <CustomAppIcon style={styles.textHOMEButtonIcon} name='exotica-invasora'></CustomAppIcon>
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
