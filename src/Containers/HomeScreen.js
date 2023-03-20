import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, Keyboard, Alert, BackHandler } from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';
import { withNavigation } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

import NavBar from '../Components/NavBar'; 
import styles from "../Components/Styles/HomeScreenStyles";
import Constants from '../Config/Constants';

import { createIconSetFromFontello } from "react-native-vector-icons";
import config from "../Theme/Fonts/config.json"
const CustomIcon = createIconSetFromFontello(config);

import { Fonts, Colors } from '../Theme';


var arraydata = [];

/* HOMESCREEN: pantalla en la que se muestra el buscador de especies junto al menú  izquierdo */
class HomeScreen extends Component {

    constructor(props) {
        console.log("\n\n\nLlamada a HomeScreen\n---------------------------------\n");
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
    
    fetchData = async (text) => {
        this.setState({ query: text })
        // Si existe una query para llamar:
        if(text != null && text.length > 1){
            fetch(`${Constants.API_ENCICLOVIDA}/autocompleta/especies/${encodeURIComponent(text)}`)
            .then(res => res.json())
            .then((json) => {
                arraydata = [];
                if(!json.error){
                    Constants.RESULT_CATEGORIES.forEach( category => {
                        Array.prototype.push.apply(
                            arraydata, 
                            json.results[category].filter(item=> item.data.publico)
                        )
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
        this.setState({ query: "" })
        this.setState({ data : [] });
        //TODO Validar 
        global.id_specie = item.id;
        global.title = item.nombre_comun;
        global.subtitle = item.nombre_cientifico;
        global.classificationList = [];
        // Ir a "Acerca de"
        this.props.navigation.navigate("About", {});
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
                    <View style={{justifyContent: "center", alignItems: "center",  width:'100%'}}>
                        <Text style={styles.finSpeciesText}>Busca entre más de 113 mil especies</Text>
                    </View>
                    <View style={styles.view}>
                        <View style={{height:46, width: '90%'}}>
                            <Icon name="ios-search" style={styles.customSearchIcon} />
                            <Autocomplete
                                style={styles.autocomplete}
                                autoCapitalize="none"
                                autoCorrect={false}
                                inputContainerStyle={styles.inputContainerStyle}
                                containerStyle={styles.autocompleteContainer}
                                listStyle={styles.listStyle}
                                data={data}
                                defaultValue={query}
                                onChangeText={text => this.fetchData(text)}
                                placeholder="Ingresa la especie"
                                keyExtractor={(item, index) => item.id.toString() }
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            this.handlePress(item.data);
                                            this.setState({ query: "" })
                                        }}>
                                        <View style={styles.contentItem}>
                                            <Image source={{ uri: item.data.foto ? item.data.foto : 'ic_imagen_not_found' }} style={styles.itemimage} />
                                            <View style={styles.text_view}>
                                                <Text style={styles.itemText}>{item.data.nombre_comun}</Text>
                                                <Text style={styles.itemTextSecond}>({item.data.nombre_cientifico})</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <View style={{/*borderColor: 'blue', borderWidth: 1, borderBottomEndRadius:10, borderTopEndRadius: 10, */ color: 'gray', height: 45, width: '10%'}}>
                            <TouchableOpacity onPress={() => { this.setState({ query: "", data : [] })}} >
                                <Icon name="ios-close" style={styles.customClearIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style= {{flexDirection: 'row', bottom: 0, justifyContent: "center", paddingTop:60, zIndex: -10, padding: 10, width: '100%', }}> 
                        <View>
                            <CustomIcon style={{fontSize:50, marginBottom:-60, color: Colors.blue, width: 150}} name='enciclo'></CustomIcon>
                            <CustomIcon style={{fontSize:50, color: 'rgba(140, 154, 81, 1)', width: 150}} name='vida'></CustomIcon>
                        </View>
                    </View>

                    {this.footer()}
                </View>
            </View>
        );
    }
}

//make this component available to the app
export default withNavigation(HomeScreen);
