import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Marker } from 'react-native-maps'
import { withNavigation } from "react-navigation";
import ClusteredMapView from 'react-native-maps-super-cluster';
import { createIconSetFromFontello } from "react-native-vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";

import config from "../Theme/Fonts/config"
import styles from "../Components/Styles/MapScreenStyles";
import colors from "../Theme/Colors";

import Constants from '../Config/Constants';

const CustomIcon = createIconSetFromFontello(config);

var arraydata = [];
let theCurrentRegion = {};

// create a component
class MapScreen extends Component {
    constructor(props) {
        super(props)

        if((global.locationData['latitud'] != undefined) && (global.locationData['latitud'] != "")){
            theCurrentRegion['latitude'] = global.locationData['latitud'];
            theCurrentRegion['longitude'] = global.locationData['logitud'];
            theCurrentRegion['latitudeDelta'] = global.locationData['latitudeDelta'];
            theCurrentRegion['longitudeDelta'] = global.locationData['longitudeDelta'];
            console.log(' - - - YA HAY REGION POR GPS - - - - -  ');
            console.log(theCurrentRegion);
            console.log(' - - - - - - - - - - -  ');
        } else {
            console.log(' - - - USAR REGION GENERAL - - - - -  ');
            theCurrentRegion = Constants.DEFAULT_REGION;
            console.log(theCurrentRegion);
        }

        this.state = {
            pins: [],
            spinner: false,
            region: theCurrentRegion,
            showmap: false,
        }
        this.fetchData = this.fetchData.bind(this);
        this.loadgeodata = this.loadgeodata.bind(this);
        this.renderMarker = this.renderMarker.bind(this);
        this.renderCluster = this.renderCluster.bind(this);
    }

    loadgeodata = async (url, url_snib, last) => {
        if (url) {
            fetch(url).then(res => res.json()).then((json) => {
                const result = json.map(data => {
                    if (last) return { id: `01,pin${data[2]}`, color: colors.iconMap1, location: { latitude: data[1], longitude: data[0] } };
                    else return { id: `00,pin${data[2]}`, color: colors.iconMap2, location: { latitude: data[1], longitude: data[0] } };
                });
                if (last) {
                    arraydata = [];

                    Array.prototype.push.apply(arraydata, this.state.pins);
                    Array.prototype.push.apply(arraydata, result);

                    if (this.state.pins.length == 0)
                        this.setState({ pins: arraydata, spinner: false, region: theCurrentRegion });
                    else {

                        this.setState({ pins: arraydata, spinner: false, showmap: true, region: theCurrentRegion });
                    }
                }
                else {
                    this.setState({ pins: result });
                    this.loadgeodata(url_snib, null, true);
                }
            }).catch(error => {
                this.setState({ spinner: false, showmap: false });
            });
        }
        else {
            if (last)
                this.setState({ spinner: false, showmap: false });
            else
                this.loadgeodata(url_snib, null, true);
        }
    }
    
    setMapIdSpecie = (id_specie) => {
        global.map_id_specie = id_specie;
    }
    
    fetchData = async (id_specie, map_id_specie) => {
        if (id_specie != map_id_specie) {
            this.setState({ pins: [], region: theCurrentRegion, spinner: true });
            if (id_specie != 0) {
                fetch(`${Constants.API_ENCICLOVIDA}/especie/${id_specie}`).then(res => res.json()).then((json) => {
                    const url = json.e_geodata.naturalista_mapa_json;
                    const url_snib = json.e_geodata.snib_mapa_json;
                    if (url || url_snib) {
                        this.loadgeodata(url, url_snib, false);
                        this.setMapIdSpecie(id_specie);
                    }
                    else
                        this.setState({ spinner: false, showmap: false });
                }).catch(error => {
                    this.setState({ spinner: false, showmap: false });
                });
            }
            else {
                this.setState({ spinner: false, pins: [], showmap: false });
            }
        }
    }

    renderCluster = (cluster, onPress) => {
        const pointCount = cluster.pointCount,
            coordinate = cluster.coordinate,
            clusterId = cluster.clusterId;
        return (
            <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
                <View style={[styles.clusterContainer]}>
                    <Text style={styles.counterText}>
                        {pointCount}
                    </Text>
                </View>
            </Marker>
        )
    }
 
    renderMarker = (pin) => {
        return (
            <Marker identifier={`pin-${pin.id}`} key={pin.id} coordinate={pin.location}>
                {
                    //<CustomIcon name="mark" size={12} color={pin.color} style={styles.favicon} />
                }
                <Icon name="circle" size={10} color={pin.color} style={styles.favicon} />
            </Marker>
        )
    }

    _handleMapRegionChange = region => {
        this.setState({ region: region });
        //console.log(region);
        //console.log(this.state.region)
    };

    componentDidMount = () => {
        this.fetchData(global.id_specie, global.map_id_specie);
    }
    UNSAFE_componentWillReceiveProps = () => {
        console.log("\n\n - - UNSAFE_componentWillReceiveProps desde MapScreen- - \n\n");

        if((global.locationData['latitud'] != undefined) && (global.locationData['latitud'] != "")){
            theCurrentRegion['latitude'] = global.locationData['latitud'];
            theCurrentRegion['longitude'] = global.locationData['logitud'];
            theCurrentRegion['latitudeDelta'] = global.locationData['latitudeDelta'];
            theCurrentRegion['longitudeDelta'] = global.locationData['longitudeDelta'];
            console.log(' - - - YA HAY REGION POR GPS - - - - -  ');
            console.log(theCurrentRegion);
            console.log(' - - - - - - - - - - -  ');
        } else {
            console.log(' - - - USAR REGION GENERAL - - - - -  ');
            theCurrentRegion = Constants.DEFAULT_REGION;
        }
    console.log(" <<<<<<<<<");
    
        this.fetchData(global.id_specie, global.map_id_specie);
    };

    render() {
        if (this.state.showmap) {
            return (
                <View style={[styles.mainScreen]}>
                    <NavBar menuBlackButton={true}
                        infoButton={true} />
                    <View style={styles.container}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Cargando...'}
                            textStyle={{ color: '#FFF' }}
                        />
                        <ClusteredMapView
                            style = {{ flex: 1 }}
                            data = {this.state.pins}
                            ref = {(r) => { this.map = r }}
                            clusterPressMaxChildren = {1000}
                            rotateEnabled = {false}
                            renderMarker = {this.renderMarker}
                            renderCluster = {this.renderCluster}
                            //onRegionChange = {this._handleMapRegionChange}
                            onRegionChangeComplete = {this._handleMapRegionChange}
                            mapType = {"hybrid"}
                            //initialRegion={this.state.region}
                            region = {this.state.region}
                            //animateClusters={false}
                        >
                            {}
                        </ClusteredMapView>
                        <View style={styles.overlay}>
                            <View style={styles.row}>
                                {
                                    //<CustomIcon name="mark" size={12} color={colors.iconMap1} style={styles.favicon} />
                                }
                                <Icon name="circle" size={10} color={colors.iconMap1} style={styles.favicon} />
                                <Text style={(styles.textLeyend, styles.textLeyend1)}> Registros científicos</Text>
                            </View>
                            <View style={styles.row}>
                                {
                                    //<CustomIcon name="mark" size={12} color={colors.iconMap2} style={styles.favicon} />
                                }
                                <Icon name="circle" size={10} color={colors.iconMap2} style={styles.favicon} />
                                
                                <Text style={(styles.textLeyend, styles.textLeyend2)}> Ciencia Ciudadana</Text>
                            </View>
                        </View>
                    </View>
                    <TabBar shownav={true} selected="Map" />
                </View>
            );
        } else {
            return (
                <View style={[styles.mainScreen]}>
                    <NavBar menuBlackButton={true}
                        infoButton={true} />
                    <View style={styles.containerempty}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Cargando...'}
                            textStyle={{ color: '#FFF' }}
                        />
                        <Image source={{ uri: 'ic_fondo_mapa' }} style={styles.image} />
                        <View style={styles.viewText}>
                            <Text style={styles.textmap}> Sin Datos </Text>
                        </View>
                    </View>
                    <TabBar shownav={true} selected="Map" />
                </View>
            );
        }

    }
}

//make this component available to the app
export default withNavigation(MapScreen);