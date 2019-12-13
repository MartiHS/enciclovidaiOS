//import liraries
import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView } from 'react-native';
import { withNavigation } from "react-navigation";
import TreeView from 'react-native-final-tree-view'
import Spinner from 'react-native-loading-spinner-overlay';
import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";

import styles from "../Components/Styles/ClassificationScreenStyles";

const API = 'http://api.enciclovida.mx';

var maxlevel = 0;

// create a component
class ClassificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            load: 0,
            spinner: false,
        };
    }

    abreviation = (abreviation) => {
        if(abreviation === 'R'){
            return "Reino";
        }
        else if(abreviation === 'P'){
            return "Phylum";
        }
        else if(abreviation === 'D'){
            return "División";
        }
        else if(abreviation === 'C'){
            return "Clase";
        }
        else if(abreviation === 'O'){
            return "Orden";
        }
        else if(abreviation === 'F'){
            return "Familia";
        }
        else if(abreviation === 'G'){
            return "Género";
        }
        else if(abreviation === 'E'){
            return "Especie";
        }
    }

    constructJSON = (json, initial = false) =>{
        if(json.children) {
            maxlevel = maxlevel + 1;
            return [
                {
                    id: json.especie_id,
                    last: false,
                    last_list: json.children[0].children ? false : true,
                    initial: initial,
                    collapsed: false,
                    nombre_cientifico: json.nombre_cientifico,
                    nombre_comun: json.nombre_comun,
                    abreviacion_categoria: this.abreviation(json.abreviacion_categoria),
                    children: this.constructJSON(json.children[0])
                }
            ];
        }
        else{
            return [
                {
                    id: json.especie_id,
                    last: true,
                    last_list: false,
                    initial: initial,
                    collapsed: false,
                    nombre_cientifico: json.nombre_cientifico,
                    nombre_comun: json.nombre_comun,
                    abreviacion_categoria: this.abreviation(json.abreviacion_categoria),
                }
            ];
        }
    }

    setClassificationIdSpecie=(id_specie)=>{
        global.classification_id_specie=id_specie;
    }

    fetchData = async (id_especie, classification_id_specie) => {
        if(id_specie!==classification_id_specie)
        {
            this.setState({ spinner: true , data : []});
            if(id_especie != 0){
                fetch(`${API}/especie/${id_especie}/ancestry`).then(res => res.json()).then((json) => {
                    maxlevel = 0;
                    const results = this.constructJSON(json, true);
                    this.setState({ data: results, spinner: false });
                    this.setClassificationIdSpecie(id_specie);
                }).catch(error => {
                    this.setState({ spinner: false });    
                });
            }
            else
            {
                this.setState({ data : [], spinner: false });
            }
        }
    }

    refreshdata = (id, nombre_comun, nombre_cientifico) => {
        global.classificationList.push({"id": global.id_specie,"title": global.title, "subtitle": global.subtitle});
        global.id_specie = id;
        global.title = nombre_comun;
        global.subtitle = nombre_cientifico;
        this.setState({ data : [] });
        this.fetchData(global.id_specie);
        
        this.props.navigation.navigate("About", { });
        
    };

    componentWillReceiveProps = () => {
        //Alert.alert("idProps", this.state.load.toString());
        //Alert.alert("idProps", global.id_specie.toString());
        
        this.fetchData(global.id_specie, global.classification_id_specie);
    };

    componentDidMount = () => {
        //Alert.alert("idMount", global.id_specie.toString());
        
        this.fetchData(global.id_specie, global.classification_id_specie);
    };

    render() {
        return (
            <View style={[styles.mainScreen]}>
                <NavBar menuBlackButton={true}
                    infoButton={true}/>
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Cargando...'}
                        textStyle={{color: '#FFF'}}
                        />
                    <View style={{padding:20}}>
                        <ScrollView horizontal={true}>
                            <TreeView
                                ref={ref => (this.treeView = ref)}
                                data={this.state.data}
                                collapsedItemHeight={40}
                                onItemPress={(node, level) => {
                                    //alert('Level: ' + level + '\n' + 'Node: ' + JSON.stringify(node));
                                    if(maxlevel != level){
                                        this.refreshdata(node.id, node.nombre_comun, node.nombre_cientifico)
                                        /*Alert.alert("Cambiar Busqueda", 
                                        `¿Deseas cambiar a "${node.nombre_cientifico}" los resultados de la busqueda?`, 
                                            [
                                                {
                                                    text: 'SI', 
                                                    onPress: () => this.refreshdata(node.id, node.nombre_comun, node.nombre_cientifico)
                                                },
                                                {
                                                    text: 'No',
                                                },
                                            ],
                                            { cancelable: false }
                                        );*/
                                    }
                                }}
                                renderItem={(item, level) => (
                                <View style={{marginLeft: item.last ? 0 : 9.5 * level, marginTop: item.last && level > 1 ? 30 : 0, flexDirection: "row"}} >
                                    {item.collapsed !== null ? (
                                        <View>
                                            {item.initial ? (item.collapsed ? (<Image style={[styles.image]} source={{uri:'ic_tree_unique'}}/>) 
                                                    : (<Image style={[styles.image]} source={{uri:'ic_tree_start'}}/>) 
                                                )
                                                : 
                                                (item.collapsed ? (<Image style={styles.image} source={{uri:'ic_tree_finish'}}/>) : 
                                                    (item.last_list ? (<Image style={styles.image} source={{uri:'ic_tree_finish'}}/>) : 
                                                        (<Image style={styles.image} source={{uri:'ic_tree'}}/>)
                                                    )
                                                )}
                                        </View>
                                    ) : (
                                        <Image style={styles.image} source={{uri:'ic_tree_unique'}}/>
                                    )}
                                    <View>
                                        <Text style={styles.text} numberOfLines={1} ellipsizeMode ={'tail'}>
                                        {item.abreviacion_categoria} <Text style={styles.text_comun}> {item.nombre_comun}</Text> 
                                        </Text>
                                        <Text style={styles.text_cientifico}> {item.nombre_cientifico}</Text>
                                    </View>
                                </View>
                                )}
                            />
                        </ScrollView>
                    </View>
                </View>
                <TabBar shownav={true} selected="Classification" />
            </View>
        );
    }
}

//make this component available to the app
export default withNavigation(ClassificationScreen);