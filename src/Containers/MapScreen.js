import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Marker } from 'react-native-maps'
import { withNavigation } from "react-navigation";
import ClusteredMapView from 'react-native-maps-super-cluster';

import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";


import styles from "../Components/Styles/MapScreenStyles";
import colors from "../Theme/Colors";

import Constants from '../Config/Constants';

var arraydata = [];
let theCurrentRegion = {};

// create a component
class MapScreen extends Component {
    constructor(props) {
        super(props)

        console.log(' - - - USAR REGION GENERAL - - - - -  ');
        theCurrentRegion = Constants.DEFAULT_REGION;
        console.log(theCurrentRegion);

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
            console.log(url);
            fetch(url).then(res => res.json()).then((json) => {
                const result = json.map(data => {
                    if (last) return { id: `01,pin${data[2]}`, color: colors.iconMap1, location: { latitude: data[1], longitude: data[0] } };
                    else return { id: `00,pin${data[2]}`, color: colors.iconMap2, location: { latitude: data[1], longitude: data[0] } };
                });

                console.log(last);
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
        console.log("fetchData");
        console.log(id_specie);
        console.log(map_id_specie);
        if (id_specie != map_id_specie) {
            console.log("SII ");
            console.log(theCurrentRegion);
            this.setState({ pins: [], region: theCurrentRegion, spinner: true });
            if (id_specie != 0) {
                console.log("SI ES DIFERENTE");
                let query = `${Constants.API_ENCICLOVIDA}v2/especies/${id_specie}`;
                console.log(query);
                fetch(query).then(res => res.json()).then((json) => {
                    const url = json.e_geodata.naturalista_mapa_json;
                    const url_snib = json.e_geodata.snib_mapa_json;
                    console.log(url);
                    console.log(url_snib);
                    if (url || url_snib) {
                        console.log("SI PASO")
                        this.loadgeodata(url, url_snib, false);
                        this.setMapIdSpecie(id_specie);
                    }
                    else
                        this.setState({ spinner: false, showmap: false });
                }).catch(error => {
                    console.log("ERROR ");
                    console.log(error);

                    this.setState({ spinner: false, showmap: false });
                });
            } else {
                console.log("NO ");
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
        console.log(' - - - USAR REGION GENERAL - - - - -  ');
        theCurrentRegion = Constants.DEFAULT_REGION;
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
                                <Icon name="circle" size={10} color={colors.iconMap1} style={styles.favicon} />
                                <Text style={(styles.textLeyend, styles.textLeyend1)}> Registros científicos</Text>
                            </View>
                            <View style={styles.row}>
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