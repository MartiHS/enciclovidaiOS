import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { withNavigation } from "react-navigation";
import { ScrollView } from 'react-native-gesture-handler';

import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";
import styles from "../Components/Styles/SymbologyScreenStyle";
import { Colors, Fonts } from '../Theme';

import { createIconSetFromFontello } from "react-native-vector-icons";
import config from "../Theme/Fonts/config";
const CustomIcon = createIconSetFromFontello(config);

const InfoArray = {
    10: {name: "Exótica", iconFont: 'exotica', icon:"ic_10",title: "Tipo de distribución", order: 1},
    7: {name: "Nativa", iconFont: 'nativa', icon:"ic_7", title: "Tipo de distribución", order: 2 },
    6: {name: "Exótica - Invasora", iconFont: 'exotica-invasora', icon:"ic_6", title: "Tipo de distribución", order: 3 },
    3: {name: "Endémica", iconFont: 'endemica', icon:"ic_3", title: "Tipo de distribución", order: 4 },
    17: {name: "Sujeta a protección especial (Pr)", iconFont: 'sujeta-a-proteccion-especial-pr', icon:"ic_17", title: "Categoría nacional de riesgo", order: 5 },
    15: {name: "Amenazada (A)", iconFont: 'amenazada-a', icon:"ic_15", title: "Categoría nacional de riesgo", order: 6 },
    14: {name: "En peligro de extinción (P)", iconFont: 'en-peligro-de-extincion-p', icon:"ic_14", title: "Categoría nacional de riesgo", order: 7 },
    16: {name: "Probablemente extinta en el medio silvestre (E)", iconFont: 'probablemente-extinta-en-el-medio-silvestre-e', icon:"ic_16", title: "Categoría nacional de riesgo", order: 8 },
    29: {name: "Vulnerable (VU)", iconFont: 'vulnerable-vu', icon:"ic_29", title: "Categoría internacional de riesgo", order: 9 },
    28: {name: "En peligro (EN)", iconFont: 'en-peligro-en', icon:"ic_28", title: "Categoría internacional de riesgo", order: 10 },
    27: {name: "En peligro crítico (CR)", iconFont: 'en-peligro-critico-cr', icon:"ic_27", title: "Categoría internacional de riesgo", order: 11 },
    26: {name: "Extinto en estado silvestre (EW)", iconFont: 'extinto-en-estado-silvestre-ew', icon:"ic_26", title: "Categoría internacional de riesgo", order: 12 },
    25: {name: "Extinto (EX)", iconFont: 'extinto-ex', icon:"ic_25", title: "Categoría internacional de riesgo", order: 13 },
    22: {name: "Apéndice I", iconFont: 'apendice-i', icon:"ic_22", title: "Protegidas del comercio internacional", order: 14 },
    23: {name: "Apéndice II", iconFont: 'apendice-ii', icon:"ic_23", title: "Protegidas del comercio internacional", order: 15 },
    24: {name: "Apéndice III", iconFont: 'apendice-iii', icon:"ic_24", title: "Protegidas del comercio internacional", order: 16 },
    1033: {name: "Prioritaria con grado alta", iconFont: 'alta', icon:"ic_1033", title: "Prioritarias para la conservación", order: 17 },
    1034: {name: "Prioritaria con grado media", iconFont: 'media', icon:"ic_1034", title: "Prioritarias para la conservación", order: 18 },
    1035: {name: "Prioritaria con grado menor", iconFont: 'menor', icon:"ic_1053", title: "Prioritarias para la conservación", order: 19 },
    1026: {name: "Terrestre", iconFont: 'terrestre', icon:"ic_1026", title: "Ambiente", order: 20 },
    1025: {name: "Dulceacuícola", iconFont: 'dulceacuicola', icon:"ic_1025", title: "Ambiente", order: 21 },
    1024: {name: "Marino", iconFont: 'marino', icon:"ic_1024", title: "Ambiente", order: 23 },
    1027: {name: "Salobre", iconFont: 'salobre', icon:"ic_1027", title: "Ambiente", order: 24 },
};
   
  

// create a component
class SymbologyScreen extends Component {
    render() {
        return (
            <View style={[styles.mainScreen]}>
                <NavBar small={true}
                    menuBlackButton={true}/>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Categoría nacional de riesgo</Text>
                            <Text style={styles.subtitletype}>Norma Oficial Mexicana NOM-059</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[16]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[16]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[16]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[14]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[14]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[14]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[15]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[15]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[15]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[17]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[17]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[17]['name']}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Categoría internacional de riesgo</Text>
                            <Text style={styles.subtitletype}>Unión Internacional para la Conservación de la Naturaleza (IUCN)</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[25]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[25]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[17]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[26]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[26]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[17]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[27]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[27]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[27]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[28]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[28]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[28]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[29]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[29]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[29]['name']}</Text>
                            </View>
                            
                        </View>

                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Tipo de distribución</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[3]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[3]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[3]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[7]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[7]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[7]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[10]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[10]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[10]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[6]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[6]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[6]['name']}</Text>
                            </View>
                        </View>

                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Especies prioritarias para la conservación</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[1033]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[1033]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[1033]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[1034]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[1034]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[1034]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[1035]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[1035]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[1035]['name']}</Text>
                            </View>
                        </View>

                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Comercio Internacional (CITES)</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[22]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[22]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[22]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[23]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[23]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[23]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                                <CustomIcon name={InfoArray[24]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[24]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[24]['name']}</Text>
                            </View>
                        </View>

                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Ambiente</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                            <CustomIcon name={InfoArray[1026]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[1026]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[1026]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                            <CustomIcon name={InfoArray[1025]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[1025]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[1025]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                            <CustomIcon name={InfoArray[1024]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[1024]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[1024]['name']}</Text>
                            </View>
                            <View style={styles.element}>
                            <CustomIcon name={InfoArray[1027]['iconFont']} style={[styles.iconImage, { color: Colors[InfoArray[1027]['iconFont']] }]}></CustomIcon>
                                <Text style={styles.text_element}>{InfoArray[1027]['name']}</Text>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                <TabBar />
            </View>
        );
    }
}

//make this component available to the app
export default withNavigation(SymbologyScreen);
