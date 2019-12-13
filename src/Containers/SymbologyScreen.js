//import liraries
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { withNavigation } from "react-navigation";
import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";

import styles from "../Components/Styles/SymbologyScreenStyle";
import { ScrollView } from 'react-native-gesture-handler';



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
                                <Image source={{ uri: "ic_16" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Probablemente extinta en el medio silvestre (E)</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_14" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>En peligro de extinción (P)</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_15" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Amenazada (A)</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_17" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Sujeta a protección especial (Pr)</Text>
                            </View>
                        </View>
                        
                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Categoría internacional de riesgo</Text>
                            <Text style={styles.subtitletype}>Unión Internacional para la Conservación de la Naturaleza (IUCN)</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_25" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Extinto (EX)</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_26" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Extinto en estado silvestre (EW)</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_27" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>En peligro crítico (CR)</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_28" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>En peligro (EN)</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_29" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Vulnerable (VU)</Text>
                            </View>
                            
                        </View>

                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Tipo de distribución</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_3" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Endémica</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_7" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Nativa</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_10" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Exótica</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_6" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Exótica - Invasora</Text>
                            </View>
                        </View>

                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Especies prioritarias para la conservación</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_1033" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Prioritaria con grado alta</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_1034" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Prioritaria con grado media</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_1035" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Prioritaria con grado menor</Text>
                            </View>
                        </View>

                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Comercio Internacional (CITES)</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_22" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Apéndice I</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_23" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Apéndice II</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_24" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Apéndice III</Text>
                            </View>
                        </View>

                        <View style={styles.viewcontent}>
                            <Text style={styles.titletype}>Ambiente</Text>
                        </View>
                        <View style={styles.viewelement}>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_1026" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Terrestre</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_1025" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Dulceacuícola</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_1024" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Marino</Text>
                            </View>
                            <View style={styles.element}>
                                <Image source={{ uri: "ic_1027" }} style={styles.imageIcon} />
                                <Text style={styles.text_element}>Salobre</Text>
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
