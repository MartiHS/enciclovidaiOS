import React, { Component } from 'react';
import { View, Image, FlatList, TouchableOpacity, Text, Keyboard, Alert, BackHandler } from 'react-native';
import { createIconSetFromFontello } from "react-native-vector-icons";
import Autocomplete from 'react-native-autocomplete-input';
import { withNavigation } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

import NavBar from '../Components/NavBar'; 
import styles from "../Components/Styles/FindByLocationStyles";
import Constants from '../Config/Constants';


import stylesListEspecies from "../Components/Styles/ListSpeciesScreenStyles";


import config from "../Theme/Fonts/config.json"
const CustomIcon = createIconSetFromFontello(config);

import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';


import styless from "../Components/Styles/ListSpeciesScreenStyles";


import { NetworkInfo } from "react-native-network-info";

NetworkInfo.getIPAddress().then(ipAddress => {
    console.log(ipAddress);
  }); 

  NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
    console.log(defaultGateway);
  })


var arraydata = []; 

/* HOMESCREEN: pantalla en la que se muestra el buscador de especies junto al menú  izquierdo */
class HomeScreen extends Component {

    constructor(props) {
        console.log("\n\n\nLlamada a FindByLocation\n---------------------------------\n");
        super(props); 
        global.id_specie = 0;
        global.title = "";
        global.subtitle = "";
        global.taxonPhotos = [];
        global.taxonPhotos_BDI_source = false;
        global.filtro = "";
        global.listSpecies = "";
        global.LastlistSpecies = "";
        global.classificationList = [];
        global.ListReino = [];
        global.ListAnimales = [];
        global.ListPlantas = [];

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
        console.log("------------------");
        this.setState({ query: "text" })
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


    fetchMunicipality = async (location) => {
        console.log("------------------");
        this.setState({ query: "text" })
        // Si existe una query para llamar:
        if(location != null){ 
            fetch('https://api.enciclovida.mx/v2/municipios/ubicacion?latitud=' + location['lat'] + '&longitud=' + location['lng'])
            .then(res => res.json())
            .then((json) => {
                let dataLocation = {
                    region_id: json.munid,
                    nom_reg: json.nom_mun + ', ' + json.nom_ent,
                    tipo_region: 'Municipio'
                };

                console.log("------------------");
                console.log(dataLocation);
                this.setState({ dataLoc: dataLocation});
                
                console.log("------------------");
                console.log("------------------");
                console.log("------------------");

                //this.fetchSpeciesByLocation(dataLocation);

                const{navigation}=this.props;

                navigation.navigate('SpeciesByLocation', {
                    data: { 
                        origen: 'ByLocation',
                        location: dataLocation
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

    // Función encargada de la acción al presionar una sugerencia:
    handlePress(item) {
       
        console.log("\n\n**Nueva seleccion\n\n");
        let dataLocation = {
            region_id: item.data.region_id,
            nom_reg: item.data.nombre_region,
            tipo_region: item.data.geojson.properties.tipo_region,
        };


        console.log(item.data.nombre_region);
        console.log(item.data.region_id);
        console.log(item.data.geojson.properties.tipo_region);

        const{navigation}=this.props;

        navigation.navigate('SpeciesByLocation', {
            data: { 
                origen: 'ByLocation',
                location: dataLocation
            },
        });
        

        //this.fetchSpeciesByLocation(dataLocation);
       
       /*
        console.log("\n\n**Nueva seleccion\n\n");
        this.setState({ query: "" })
        this.setState({ data : [] });
        //TODO Validar 
        global.id_specie = item.id;
        global.title = item.nombre_comun;
        global.subtitle = item.nombre_cientifico;
        global.classificationList = [];
        // Ir a "Acerca de"
        this.props.navigation.navigate("About", {});*/
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

    footer = () => {
        if(this.state.show){
            return(
                <Image style={styles.footerImage}
                    source={{uri: 'ic_footer_home'}}/>
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
                <NavBar white={true} title = ""  menuLightButton={true}/> 
                <View style={styles.container}>
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
                            <Icon name="pescado-ev-icon" style={styles.customLocationIcon}></Icon>
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
                                //defaultValue={query}
                                defaultValue=""
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


                    <View style={styles.viewResultLocationStyle}>
                        <Text style={styles.text_element}>{}</Text> 
                    </View>
                    
                   

                    <FlatList
                        style = {stylesListEspecies.flatList} 
                        data={this.state.dataEsp}
                        extraData={this.state}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={this._listEmptyComponent}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        renderItem={({ item, index }) => (

                        <View style={stylesListEspecies.listItem}>
                            <TouchableOpacity style={stylesListEspecies.touchableItem} onPress={() => { this.handlePress(item) }} >
                            <Image source={{ uri: item.imagen ? item.imagen : 'ic_imagen_not_found_small' }} style={stylesListEspecies.imageItem} />
                            <View style={stylesListEspecies.textRow}>
                                <Text style={stylesListEspecies.titleRow}>{item.title}</Text>
                                <Text>{item.subtitle}</Text> 
                            </View>
                            </TouchableOpacity>
                        </View>
                        )}
                        numColumns={1}
                        onEndReached = {this._handleLoadMore}
                        onEndReachedThreshold = {0.1}
                        initialNumToRender = {50}
                        onRefresh = {this._handleRefresh}
                        refreshing = {this.state.refreshing}
                        />


                 

                    

                    {this.footer()}
                </View>
            </View>
        );
    }
}

//make this component available to the app
export default withNavigation(HomeScreen);
