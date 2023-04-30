//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, ImageBackground} from 'react-native';
import { withNavigation } from "react-navigation";

import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";

import { createIconSetFromFontello } from "react-native-vector-icons";
import config from "../Theme/Fonts/config.json"
import { Fonts, Colors } from '../Theme';
const CustomIcon = createIconSetFromFontello(config);

import stylesEnci from "../Components/Styles/EnciclovidaScreenStyles";


const EnciclovidaScreen = ()=>{
    return(
        <View style={[stylesEnci.mainScreen]}>
            <ScrollView>
                <View style={[stylesEnci.container, stylesEnci.info]}>
                    <Text style={stylesEnci.text}>
                    <Text style={stylesEnci.bold}>EncicloVida</Text> es una plataforma digital que integra información de 
                    <Text style={stylesEnci.bold}> CONABIO</Text> y la complementa con información de otras fuentes (Norma Oficial Mexicana 059, Lista roja de IUCN, CITES, NaturaLista, Wikipedia, Universidad de Cornell, Jardín Botánico de Missouri).{'\n'}</Text>

                    <Text style={stylesEnci.rigth}>
                    Participa con fotos: utiliza 
                    <Text style={stylesEnci.link}onPress={() => Linking.openURL('http://www.naturalista.mx')}> NaturaLista</Text>
                    {'\n'}
                    Consulta: utiliza EncicloVida{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Nombres: </Text>
                    Nombres científicos, nombres comunes, sinonimias, estatus taxonómicos siguiendo los catálogos de autoridades de CONABIO.{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Fotografías: </Text> 
                    Fotos de las especies provenientes del
                    <Text style={stylesEnci.link}onPress={() => Linking.openURL('http://bdi.conabio.gob.mx/fotoweb')}> Banco de Imágenes de CONABIO</Text>, de
                    <Text style={stylesEnci.link}onPress={() => Linking.openURL('http://www.naturalista.mx/')}> NaturaLista</Text>, de
                    <Text style={stylesEnci.link}onPress={() => Linking.openURL('https://www.macaulaylibrary.org/')}> Biblioteca Macaulay</Text> y de la  de la Universidad de Cornell.{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Audios: </Text> 
                    Biblioteca Macaulay de la Universidad de Cornell y Xeno-canto.{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Videos: </Text> 
                    Biblioteca Macaulay de la Universidad de Cornell.{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Mapas: </Text> 
                    Mapas de distribución potencial de la CONABIO.{'\n'} 
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Registros de especies:</Text> 
                    del Sistema Nacional de Información sobre Biodiversidad (colecciones científicas de plantas y animales de México) y registros de observaciones de <Text style={stylesEnci.link}onPress={() => Linking.openURL('http://www.naturalista.mx/')}> NaturaLista</Text> y <Text style={stylesEnci.link}onPress={() => Linking.openURL('https://ebird.org/home')}> AverAVes</Text>. {'\n'} 
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Categoría nacional de riesgo: </Text>
                    <Text style={stylesEnci.link}onPress={() => Linking.openURL('http://www.biodiversidad.gob.mx/especies/catRiesMexico.html')}>Norma Oficial Mexicana 059</Text> sobre especies en riesgo.{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Categoría internacional de riesgo: </Text>
                    Lista roja de la <Text style={stylesEnci.link}onPress={() => Linking.openURL('http://www.biodiversidad.gob.mx/especies/catRiesMundo.html')}>Unión Internacional para la Conservación de la Naturaleza</Text> (IUCN, por sus siglas en inglés).{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Especies protegidas del comercio internacional: </Text>
                    Especies con requerimientos especiales para su comercio internacional de acuerdo a la 
                    <Text style={stylesEnci.link}onPress={() => Linking.openURL('http://www.biodiversidad.gob.mx/planeta/cites/index.html')}>Convención Internacional sobre el Comercio de Especies Amenazadas de Fauna y Flora</Text> (CITES, por sus siglas en inglés).{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Especies prioritarias para la conservación: </Text>
                    Especies seleccionadas como prioritarias para su conservación por el gobierno mexicano.{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Especies evaluadas como en riesgo. </Text>
                    Análisis de la Comisión Nacional para el Conocimiento y Uso de la Biodiversidad.{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Tipo de distribución: </Text>
                    Indicación para especies nativas, endémicas, exóticas (introducidas) y exóticas invasoras.{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Contenido biológico: </Text>
                    Descripción de la especie, distribución, hábitat, alimentación, biología de poblaciones, comportamiento, reproducción, estado de conservación, amenazas y referencias (CONABIO resumen, CONABIO descripción, Lista roja de UICN, Wikipedia en Español y Wikipedia en Inglés).{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Clasificación: </Text>
                    Posición en la clasificación taxonómica, con opción de recorrer la jerarquía de clasificación y conocer especies relacionadas (Reino, Phylum, Clase, Orden, Familia, Género y Especie).{'\n'}
                    </Text>

                    <Text style={stylesEnci.text}><Text style={stylesEnci.bold}>Catálogos de CONABIO: </Text>
                    Información sobre las autoridades de los <Text style={stylesEnci.link}onPress={() => Linking.openURL('https://www.biodiversidad.gob.mx/especies/CAT')}>catálogos de nombres científicos</Text>.
                    </Text>

                </View>
            </ScrollView>
            <TabBar />
        </View>
    );
};

export default EnciclovidaScreen;

//make this component available to the app
//export default withNavigation(EnciclovidaScreen);
