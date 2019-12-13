//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { withNavigation } from "react-navigation";
import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";

import styles from "../Components/Styles/EnciclovidaScreenStyles";

// create a component
class EnciclovidaScreen extends Component {
    render() {
        return (
            <View style={[styles.mainScreen]}>
                <NavBar imageButton={true}
                    menuBlackButton={true}/>
                <ScrollView>
                    <View style={[styles.container, styles.info]}>
                        <Text style={styles.text}>
                        <Text style={styles.bold}>EncicloVida</Text> integra información de la 
                        <Text style={styles.bold}> CONABIO</Text> y la complementa con 
                        información de otras fuentes (CITES, Norma Oficial Mexicana 059, Lista roja de UICN, 
                        NaturaLista, AverAves, Enciclopedia de la Vida, Wikipedia, Flickr, etc.).{'\n'}</Text>

                        <Text style={styles.rigth}>
                        Participa con fotos: utiliza 
                        <Text style={styles.link}onPress={() => Linking.openURL('http://www.naturalista.mx')}> NaturaLista</Text>
                        {'\n'}
                        Consulta: utiliza EncicloVida{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Nombres: </Text>
                        Nombres científicos, nombres comunes, sinonimias, estatus taxonómicos siguiendo los catálogos de autoridades de CONABIO.{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Fotografías: </Text> 
                        Fotos de las especies provenientes del
                        <Text style={styles.link}onPress={() => Linking.openURL('http://bdi.conabio.gob.mx/fotoweb')}> Banco de Imágenes de CONABIO</Text>, de
                        <Text style={styles.link}onPress={() => Linking.openURL('http://www.naturalista.mx/')}> NaturaLista</Text>, de
                        <Text style={styles.link}onPress={() => Linking.openURL('https://es.wikipedia.org/wiki/Wikipedia:Portada')}> Wikipedia</Text> y de
                        <Text style={styles.link}onPress={() => Linking.openURL('https://www.flickr.com/')}> Flickr</Text>.{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Mapas: </Text>
                        registros del Sistema Nacional de Información sobre Biodiversidad (colecciones científicas de plantas y animales de México) 
                        y registros de observaciones de <Text style={styles.link}onPress={() => Linking.openURL('http://www.naturalista.mx')}>NaturaLista</Text> y AverAVes.{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Categoría nacional de riesgo: </Text>
                        <Text style={styles.link}onPress={() => Linking.openURL('http://www.biodiversidad.gob.mx/especies/catRiesMexico.html')}>Norma Oficial Mexicana 059</Text> sobre especies en riesgo.{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Categoría internacional de riesgo: </Text>
                        Lista roja de la <Text style={styles.link}onPress={() => Linking.openURL('http://www.biodiversidad.gob.mx/especies/catRiesMundo.html')}>Unión Internacional para la Conservación de la Naturaleza</Text> (IUCN, por sus siglas en inglés).{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Especies protegidas del comercio internacional: </Text>
                        Especies con requerimientos especiales para su comercio internacional de acuerdo a la 
                        <Text style={styles.link}onPress={() => Linking.openURL('http://www.biodiversidad.gob.mx/planeta/cites/index.html')}>Convención Internacional sobre el Comercio de Especies Amenazadas de Fauna y Flora</Text> (CITES, por sus siglas en inglés).{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Especies prioritarias para la conservación: </Text>
                        Especies seleccionadas como prioritarias para su conservación por el gobierno mexicano.{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Tipo de distribución: </Text>
                        Indicación para especies nativas, endémicas, y exóticas (introducidas).{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Contenido biológico: </Text>
                        Descripción de la especie, distribución, hábitat, alimentación, biología de poblaciones, 
                        comportamiento, reproducción, estado de conservación, amenazas y referencias (Wikipedia).{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Clasificación: </Text>
                        Posición en la clasificación taxonómica, con opción de recorrer la jerarquía de clasificación y 
                        conocer especies relacionadas (Reino, Phylum, Clase, Orden, Familia, Género y Especie).{'\n'}
                        </Text>

                        <Text style={styles.text}><Text style={styles.bold}>Catálogos de CONABIO: </Text>
                        Información sobre las autoridades de los <Text style={styles.link}onPress={() => Linking.openURL('http://www.biodiversidad.gob.mx/especies/CAT.html')}>catálogos de nombres científicos</Text>.
                        </Text>

                    </View>
                </ScrollView>
                <TabBar />
            </View>
        );
    }
}

//make this component available to the app
export default withNavigation(EnciclovidaScreen);
