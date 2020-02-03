// Librerías de react
import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView } from 'react-native';

// Librerías específicas
import { withNavigation } from "react-navigation";
import TreeView from 'react-native-final-tree-view'
import Spinner from 'react-native-loading-spinner-overlay';

import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";

// Importar estilos, tipografías y más
import styles from "../Components/Styles/ClassificationScreenStyles";

// Por mover
const API = 'http://api.enciclovida.mx';

var maxlevel = 0;

const family = [
  {
    id: 'Grandparent',
    name: 'Grandpa',
    age: 78,
    children: [
      {
        id: 'Me',
        name: 'Me',
        age: 30,
        children: [
          {
            id: 'Erick',
            name: 'Erick',
            age: 10,
          },
          {
            id: 'Rose',
            name: 'Rose',
            age: 12,
          },
        ],
      },
    ],
  },
]

function getIndicator(isExpanded, hasChildrenNodes) {
    if (!hasChildrenNodes) {
      return '-'
    } else if (isExpanded) {
      return '\\/'
    } else {
      return '>'
    }
  }

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
        if (abreviation === 'R') {
            return "Reino";
        }
        else if (abreviation === 'P') {
            return "Phylum";
        }
        else if (abreviation === 'D') {
            return "División";
        }
        else if (abreviation === 'C') {
            return "Clase";
        }
        else if (abreviation === 'O') {
            return "Orden";
        }
        else if (abreviation === 'F') {
            return "Familia";
        }
        else if (abreviation === 'G') {
            return "Género";
        }
        else if (abreviation === 'E') {
            return "Especie";
        }
    }

    constructJSON = (json, initial = false) => {
        if (json.children) {
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
        else {
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

    setClassificationIdSpecie = (id_specie) => {
        global.classification_id_specie = id_specie;
    }

    fetchData = async (id_especie, classification_id_specie) => {
        if (id_specie !== classification_id_specie) {
            this.setState({ spinner: true, data: [] });
            if (id_especie != 0) {
                fetch(`${API}/especie/${id_especie}/ancestry`).then(res => res.json()).then((json) => {
                    maxlevel = 0;
                    const results = this.constructJSON(json, true);
                    this.setState({ data: results, spinner: false });
                    this.setClassificationIdSpecie(id_specie);
                }).catch(error => {
                    this.setState({ spinner: false });
                });
            }
            else {
                this.setState({ data: [], spinner: false });
            }
        }
    }

    refreshdata = (id, nombre_comun, nombre_cientifico) => {
        global.classificationList.push({ "id": global.id_specie, "title": global.title, "subtitle": global.subtitle });
        global.id_specie = id;
        global.title = nombre_comun;
        global.subtitle = nombre_cientifico;
        this.setState({ data: [] });
        this.fetchData(global.id_specie);

        this.props.navigation.navigate("About", {});

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
                <NavBar menuBlackButton={true} infoButton={true} />

                <View style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Cargando...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ padding: 20 }}>
                        <ScrollView horizontal={true}>
                        <TreeView
                            data={family} // defined above
                            renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
                                return (
                                <View>
                                    <Text
                                    style={{
                                        marginLeft: 25 * level,
                                    }}
                                    >
                                    {getIndicator(isExpanded, hasChildrenNodes)} {node.name}
                                    </Text>
                                </View>
                                )
                            }}
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