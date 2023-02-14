import React, { Component } from 'react';
import { View, Image, FlatList, TouchableOpacity, Text, Keyboard, Alert, TouchableHighlight, ImageBackground} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { withNavigation } from "react-navigation";

import NavBar from '../Components/NavBar'; 
import styles from "../Components/Styles/FindByLocationStyles";
import Constants from '../Config/Constants';


import stylesListEspecies from "../Components/Styles/ListSpeciesScreenStyles";

import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import { createIconSetFromFontello } from "react-native-vector-icons";
import config from "../Theme/Fonts/config.json"
import { Fonts } from '../Theme';
const CustomIcon = createIconSetFromFontello(config);

var arraydata = []; 


const listsParams = {
    SpeciesRisk: {
      filter: "&edo_cons=%5B17%2C15%2C14%2C16%2C29%2C28%2C27%2C26%2C25%5D",
      title: "Especies en riesgo"
    },
    SpeciesExotic: {
      filter: "&dist=%5B10%2C6%5D",
      title: "Especies exóticas"
    },
    SpeciesEndemic: {
      filter: "&dist=%5B3%5D",
      title: "Especies endémicas",
    },
    SpeciesByLocation: {
      filter: "",
      title: "BY L",
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
        
        //global.filtro = "";
        //global.filtroIcons = "";

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
    }

    // Este método es llamado cuando un componente se elimina del DOM
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }


    fetchSpeciesByLocation = async (location) => {
        console.log(">> fetchSpeciesByLocation");
        this.setState({ query: "" })
        // Si existe una query para llamar:
        if(location != null){
            console.log(`https://api.enciclovida.mx/v2/especies/busqueda/region?tipo_region=${encodeURIComponent(location.tipo_region)}&region_id=${encodeURIComponent(location.region_id)}`);
            fetch(`https://api.enciclovida.mx/v2/especies/busqueda/region?tipo_region=${encodeURIComponent(location.tipo_region)}&region_id=${encodeURIComponent(location.region_id)}`)
            .then(res => res.json())
            .then((json) => {
                try {
                    const result = json.taxones.map(item => {
                      return {
                        id: item.especie.IdNombre,
                        imagen: item.especie.foto_principal,
                        title: item.especie.nombre_comun_principal,
                        subtitle: item.especie.NombreCompleto
                      };
                    });


                    var entries = json.x_total_entries;
                    var len = json.taxones.length;
                    var totpage = 0;
                    var limit = 50;
                    if (len == limit) {
                      totpage = entries / len | 0;
                      var exact = json.x_total_entries % json.taxones.length;
                      if (exact != 0) {
                        totpage = totpage;
                      } else {
                        totpage = totpage + 1;
                      }
                    }
                    //Alert.alert("Total", json.x_total_entries.toString());
                    this.setState({ dataEsp: result, spinner: false, page: 1, total: totpage, loadingMore: entries > limit ? true : false });
                  } catch (e) {
                    this.setState({ spinner: false });
                    console.log(e);
                    Alert.alert("Error en los datos");
                  }

            }).catch((error) => {
                console.log("------------------");
            });
        } else {
            
            this.setState({ dataEsp : [] });
        }
    }


    setFilterProperties = (speciesClass) => {
        global.filtro = listsParams[speciesClass].filter;
        global.title = listsParams[speciesClass].title;
        global.listSpecies = speciesClass;
        global.subtitle = "";
        global.ListReino = global.DataFilterReinos;
        global.ListAnimales = global.DataFilterAnimales;
        global.ListPlantas = global.DataFilterPlantas;
        global.id_specie = 0;
      };


    goToSpeciesList = (listName) => {
        if (listsParams[listName] !== undefined) {
          const{navigation}=this.props;
          this.setFilterProperties(listName);
          navigation.navigate(listName, {});
          navigation.closeDrawer();
        }
      };

    // Obtener el minicipio a partir de la ubicación
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

    fetchData = async (text) => {
        this.setState({ query: text })
        // Si existe una query para llamar:
        if(text != null && text.length > 1){
           console.log(`https://api.enciclovida.mx/v2/autocompleta/regiones?q=${encodeURIComponent(text)}&reg=estado&reg=municipio&reg=anp`);
            fetch(`https://api.enciclovida.mx/v2/autocompleta/regiones?q=${encodeURIComponent(text)}&reg=estado&reg=municipio&reg=anp`)
            .then(res => res.json())
            .then((json) => {
                arraydata = [];
                if(!json.error){
                    Constants.RESULT_LOCATIONS.forEach( locationCategory => {
                        console.log(locationCategory);
                        Array.prototype.push.apply(
                            arraydata, json[locationCategory].filter(item => item.data)
                        )
                        console.log(json[locationCategory]);

                    });
                }
                this.setState({ data: arraydata.slice() });
            }).catch((error) => {

            });
        } else {
            this.setState({ data : [] });
        }
    }

    // Función encargada de la acción al presionar una ubicación
    handlePress(item) {
       
        console.log("\n\n>> handlePress");
        this.setState({ query: "" })
        this.setState({ data : [] });
        
        let dataLocation = {
            region_id: item.data.region_id,
            nom_reg: item.data.nombre_region,
            tipo_region: item.data.geojson.properties.tipo_region,
        };

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

        navigation.closeDrawer();
    }

    renderFooter() {
        if (this.state.loadingMore) {
          return (
            <View style={stylesListEspecies.footer} >
              <TouchableOpacity activeOpacity={0.9} style={stylesListEspecies.btnfooter} >
                <Text style={stylesListEspecies.textfooter} > Cargar Pagina {this.state.page} de {this.state.total} </Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          return (
            <View style={stylesListEspecies.footer} />
          );
        }
      }
    
    goToFind = () => {
        const {navigation} = this.props;
        navigation.navigate("Find");
        navigation.closeDrawer();
    };

    footer = () => {
        if(this.state.show){
            return(
                <View style= {{flexDirection: 'row', bottom: 0, justifyContent: "center", paddingTop:30, padding: 10, width: '100%', }}> 

                    <View>
                        <CustomIcon style={{fontSize:40, marginBottom:-48, color: 'white', width: 150}} name='enciclo'></CustomIcon>
                        <CustomIcon style={{fontSize:40, color: 'rgba(140, 154, 81, 1)', width: 150}} name='vida'></CustomIcon>
                    </View>

                    <CustomIcon style={{fontSize:40, color: 'white', width: 150}} name='conabio_completo'></CustomIcon>
                     
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
        const { query } = this.state;
        const { data } = this.state;
        return (
            /* Barra de navegación */
            <View style={[styles.mainScreen]}>
                <NavBar white={false} color={true} theColor={'rgba(50, 50, 50, 0.9)'} title = ""  menuLightButton={true}/> 
                <View style={styles.container}>
                <ImageBackground source={{uri: 'https://enciclovida.mx/assets/portada/en-riesgo.jpg'}} resizeMode="cover" style={{backgroundColor:'rgba(50, 50, 50, 0.9)'}} imageStyle={{opacity:0.1}}> 
                

                    <View style={styles.searchBar}>
                        <TouchableOpacity
                            style={styles.customLocationIconTouch}
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

                                        this.fetchMunicipality(coordsDevice);
                                    });
                                }
                            }}
                        >
                         
                            <Icon2 name="crosshairs-gps" style={styles.customLocationIcon}></Icon2>
                        </TouchableOpacity>
                        <View style={styles.view}>
                            <Autocomplete
                                style={styles.findBLAutocomplete}
                                autoCapitalize="none"
                                autoCorrect={false}
                                inputContainerStyle={styles.inputContainerStyle}
                                containerStyle={styles.autocompleteContainer}
                                listStyle={styles.listStyle}
                                data={data}
                                defaultValue={query}
                                //defaultValue=""
                                hideResults={false}
                                ref={(component) => { this._autocompleteByL = component }}
                                onChangeText={text => this.fetchData(text)}
                                placeholder="Ingresa una ubicación"
                                keyExtractor={(item, index) => item.id.toString() }
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            this.handlePress(item);
                                            this.setState({ query: "" })
                                        }}>
                                        <View style={styles.contentItem}>
                                            <View style={styles.text_view}>
                                                <Text style={styles.itemText}>{item.data.nombre_region}</Text>
                                                <Text style={styles.itemTextSecond}>({item.data.geojson.properties.tipo_region})</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />                  
                        </View> 
                    </View>   

                    <View style={{flexDirection:'row', justifyContent: 'center', width: '100%'}}>
                        <Text style={{color: 'white', fontFamily: Fonts.family.base_bold, fontSize: 15}}>
                            Prueba nuestras diferentes 
                        </Text>
                        <Text style={{paddingLeft: 3, color: 'yellow', fontFamily: Fonts.family.base_bold, fontSize: 15}}>
                            herramientas de búsqueda:
                        </Text>
                    </View>
                    
                    
                    
                    <View style={[{flexDirection:'row', padding: 10,  justifyContent: "center", alignItems: "center",  width:'100%'}]}>
                      
                        <TouchableHighlight onPress = {this.goToFind} style={styles.fHOMEButtonContainer} >
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx/assets/portada/clasificacion.jpg" }}
                                    />
                                </View>

                                <View style={styles.textHOMEButtonContainer}>
                                    <CustomIcon style={styles.textHOMEButtonIcon} name='grupo-iconico'></CustomIcon>
                                    <Text style={styles.textHOMEButton}>Especies</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.fHOMEButtonContainer}>
                            <View style={styles.imageHOMEButtonContainer}>
                                <Image
                                    style={styles.imageHOMEButton}
                                    source={{ uri: "https://enciclovida.mx//assets/portada/region.jpg" }}
                                />
                            </View>

                            <View style={styles.textHOMEButtonContainer}>
                                <Icon2 name="crosshairs-gps" style={styles.textHOMEButtonIcon}></Icon2>
                                <Text style={styles.textHOMEButton}>Por tu ubicación</Text>
                            </View>
                        </View>
                        
                    </View>


                    <View style={[{flexDirection:'row', padding: 10, justifyContent: "center", alignItems: "center",  width:'100%'}]}>

                        <TouchableHighlight onPress = {() => { this.goToSpeciesList("SpeciesEndemic")}} style={styles.fHOMEButtonContainer}>
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx//assets/portada/distribucion.jpg" }}
                                    />
                                </View>
                                <View style={styles.textHOMEButtonContainer}>
                                    <CustomIcon style={styles.textHOMEButtonIcon} name='endemica'></CustomIcon>
                                    <Text style={styles.textHOMEButton}>Endémicas</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress = {() => { this.goToSpeciesList("SpeciesExotic")}} style={styles.fHOMEButtonContainer} >
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx//assets/portada/exotica-invasora.jpg" }}
                                    />
                                </View>

                                <View style={styles.textHOMEButtonContainer}>
                                    <CustomIcon style={styles.textHOMEButtonIcon} name='exotica-invasora'></CustomIcon>
                                    <Text style={styles.textHOMEButton}>Exóticas invasoras</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                    </View>
                    

                    <View style={[{flexDirection:'row', padding: 10, justifyContent: "center", alignItems: "center",  width:'100%'}]}>
                        
                        <TouchableHighlight onPress = {() => { this.goToSpeciesList("SpeciesRisk")}} style={styles.fHOMEButtonContainer} >
                            <View>
                                <View style={styles.imageHOMEButtonContainer}>
                                    <Image
                                        style={styles.imageHOMEButton}
                                        source={{ uri: "https://enciclovida.mx/assets/portada/en-riesgo.jpg" }}
                                    />
                                </View>

                                <View style={styles.textHOMEButtonContainer}>
                                    <CustomIcon style={styles.textHOMEButtonIcon} name='en-riesgo'></CustomIcon>
                                    <Text style={styles.textHOMEButton}>En riesgo</Text>
                                </View>
                            </View>
                        </TouchableHighlight>


                        <View style={styles.fHOMEButtonContainer}>
                            <View style={styles.imageHOMEButtonContainer}>
                                <Image
                                    style={styles.imageHOMEButton}
                                    source={{ uri: "https://enciclovida.mx/assets/portada/usos.jpg" }}
                                />
                            </View>

                            <View style={styles.textHOMEButtonContainer}>
                                <CustomIcon style={styles.textHOMEButtonIcon} name='usos'></CustomIcon>
                                <Text style={styles.textHOMEButton}>Usos y agrobiodiversidad</Text>
                            </View>
                        </View>

                    </View>

                    {this.footer()}
                    </ImageBackground>
                </View>
            </View>
        );
    }
}

//make this component available to the app
export default withNavigation(HomeScreen);
