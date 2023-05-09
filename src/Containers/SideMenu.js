import React from "react";
import {View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Image, ImageBackground, TouchableHighlight, Linking} from "react-native";

import {withNavigation} from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from "../Components/Styles/SideMenuStyles";
import { Colors, Fonts, Metrics } from "../Theme";

import Modal from "react-native-modal";
import { WebView } from 'react-native-webview';

import EnciclovidaScreen from "./EnciclovidaScreen";
import Helper from '../Config/Helpers';
import Listas from '../Config/Listas';

import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 

import { CustomAppIcon } from '../Theme/Fonts/Custom.App.Icon';

var nav_dispatch = null;

global.navigator = undefined;

class SideMenu extends React.Component {
  
  constructor(props) {
    super(props);   
    this.state = {
        mainModalVisible: false,
        mainModalUrl: '',
        mainModalTitle: ''
    }
  };

  goToFind = () => {
    const {navigation} = this.props;
    navigation.navigate("Find");
    navigation.closeDrawer();
  };

  goToHome = () => {
    const {navigation} = this.props;
    this.loadFilterOptions();
    global.title = "";
    global.subtitle = "";
    Helper.resteFilters();
    navigation.navigate("TheHOME");
    navigation.closeDrawer();
  };
  /**
   * @param {string} filter
   * @param {string} title
   * @param {string} listSpecies
   */
  setFilterProperties = (speciesClass) => {
    global.filtro = listsParams[speciesClass].filter;
    global.title = listsParams[speciesClass].title;
    global.listSpecies = speciesClass;
    global.subtitle = "";
    global.ListAnimales = Listas.DataFilterAnimales;
    global.ListPlantas = Listas.DataFilterPlantas;
    global.id_specie = 0;
  };

  loadFilterOptions = () => {
    global.ListReino = Listas.DataFilterReinos;
    global.ListAnimales = Listas.DataFilterAnimales;
    global.ListPlantas = Listas.DataFilterPlantas;
    global.id_specie = 0;
  };
  

  goToSpeciesList = (listName) => {
    if (Listas.listsParams[listName] !== undefined) {
      const{navigation}=this.props;
      this.setFilterProperties(listName);
      navigation.navigate(listName, {});
      navigation.closeDrawer();
    }
  };

  closeMenu = () => {
    const {navigation} = this.props;
    navigation.closeDrawer();
  };

  goToInfo = () => {
    global.title = "Enciclovida";
    global.subtitle = "";
    const {navigation} = this.props;
    navigation.navigate("Info", navigation.state.params);
    navigation.closeDrawer();
  };

  goToSymbology = () => {
    global.title = "Simbología";
    global.subtitle = "";
    const {navigation} = this.props;
    navigation.navigate("Symbology", {});
    navigation.closeDrawer();
  };

  iosEnciclovidaIcon = () => {
    return(
        <View style= {{flexDirection: 'row', bottom: 0, justifyContent: "center", paddingTop:10, padding: 10, width: '100%', height: 70}}> 
            <View>
                <CustomAppIcon style={{fontSize:50, marginBottom:-50, color: Colors.blue, width: 150}} name='enciclo'></CustomAppIcon>
                <CustomAppIcon style={{fontSize:50, color: 'rgba(140, 154, 81, 1)', width: 150}} name='vida'></CustomAppIcon>
            </View>
        </View>
    )
  }; 

  androidEnciclovidaIcon = () => {
      return(
          <View style= {{flexDirection: 'row', bottom: 0, justifyContent: "center", paddingTop:10, padding: 10, width: '100%', height: 70}}> 
              <View>
                  <CustomAppIcon style={{fontSize:50, marginBottom:-67, color: Colors.blue, width: 150}} name='enciclo'></CustomAppIcon>
                  <CustomAppIcon style={{fontSize:50, color: 'rgba(140, 154, 81, 1)', width: 150}} name='vida'></CustomAppIcon>
              </View>
          </View>
      )
  }; 

  biomexContentModal = () => {
    return(

      <View style = {{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>  
        
        <View style = {{width: '100%', height: '30%', backgroundColor: "black"}}>  
          <ImageBackground 
            source={{uri: 'https://enciclovida.mx/imagenes/app/acerca/biodiversidad.jpg'}} 
            resizeMode='cover'
            style={{width: '100%', height: '100%'}} 
            imageStyle={{opacity:0.9}} > 
          </ImageBackground>
        </View>

        
        <View style = {{width: '80%', height: '20%', padding: 10, backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 10, top: -30}}>  
          <Image style={{position: 'relative',
            height: '40%',
            width: '100%',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex:-1,
            resizeMode: 'cover'}} source={{uri: 'ic_footer_bio'}}
          />

          <Text></Text>
          <Text style={{ textAlign: 'center', fontFamily: Fonts.family.base_bold, fontSize: Fonts.size.h2, color: '#722B2C' }}>Navega y conoce</Text>
          <Text style={{ textAlign: 'center', fontFamily: Fonts.family.base_bold, color: Colors.gray }} onPress={() => Linking.openURL('https://www.biodiversidad.gob.mx')}>https://www.biodiversidad.gob.mx</Text>
        </View>
        <ScrollView>
          <View style = {{width: '100%', height: '50%', backgroundColor: "white"}}>  
            <View style = {{ paddingRight: 20, paddingLeft: 20, backgroundColor: "white"}}> 
              <Text style={{fontFamily: Fonts.family.base_bold}}>• ¿Qué son los ecosistemas?</Text> 
              <Text style={{fontFamily: Fonts.family.base_bold}}>• ¿Qué son las especies?</Text>
              <Text style={{fontFamily: Fonts.family.base_bold}}>• ¿Por qué se pierde la biodiversidad?</Text>
              <Text style={{fontFamily: Fonts.family.base_bold}}>• ¿Cuáles son las plantas domesticadas en México?</Text>
              <Text style={{fontFamily: Fonts.family.base_bold}}>• ¿En donde hay incendios?</Text>
              <Text style={{fontFamily: Fonts.family.base_bold}}>• ¿Cuál es el estado de los manglares?</Text>
              <Text style={{fontFamily: Fonts.family.base_bold}}>• ¿Cuáles son los compromisos internacionales sobre la naturaleza?</Text>
              <Text style={{fontFamily: Fonts.family.base_bold}}>• ¿Qué es ciencia ciudadana?</Text>
              <Text/>
            </View>
            <View style = {{width: '100%', padding: 10, backgroundColor: "#E5E5E5"}}>  
              <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                <Image style={{width: 70, height: 40, resizeMode: 'contain'}} source={require('../../assets/images/logo_MosaicoNM.png')} />
                <Text style={{paddingLeft: 10, fontFamily: Fonts.family.base_bold}}>Concurso de fotografía de naturaleza</Text>
              </View>
              <Text/>
              <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', width: '90%'}}>
                <Image style={{width: 70, height: 40, resizeMode: 'contain'}} source={require('../../assets/images/logo_entreAyV.png')} />
                <Text style={{paddingLeft: 10, fontFamily: Fonts.family.base_bold}}>Concurso de dibujo y pintura para {'\n'} niños y jóvenes </Text>
              </View>
            </View>

          </View>
        </ScrollView>
      </View> 
    );
  }

  enciclovidaContentModal = () => {
    return(
      <View style = {{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>  
          <View style = {{width: '100%', height: '30%', backgroundColor: "black"}}>  
            <ImageBackground 
              source={{uri: 'https://enciclovida.mx/imagenes/app/acerca/enciclovida.jpg'}} 
              resizeMode='cover'
              style={{width: '100%', height: '100%'}} 
              imageStyle={{opacity:0.9}} > 
            </ImageBackground>
          </View>        
          <View style = {{width: '80%', height: '20%', padding: 10, backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 10, top: -30}}>  
            <View style= {{flexDirection: 'row', bottom: 0, justifyContent: "center", paddingTop:10, padding: 10, width: '100%', }}> 
                <View>
                  {(Platform.OS === 'android') ?  this.androidEnciclovidaIcon() : this.iosEnciclovidaIcon()}
                </View>
            </View>
          </View>
          <ScrollView style={{top: -60, marginBottom: -60}}>
            {EnciclovidaScreen()}
          </ScrollView>
      </View> 
    );
  }

  naturalistaContentModal = () => {
    return(

      <View style = {{backgroundColor: 'white', alignItems: 'center'}}>  
        <View style = {{width: '100%', height: '30%', backgroundColor: "black"}}>  
          <ImageBackground 
            source={{uri: 'https://enciclovida.mx/imagenes/app/acerca/naturalista.jpg'}} 
            resizeMode='cover'
            style={{width: '100%', height: '100%'}} 
            imageStyle={{opacity:0.9}} > 
          </ImageBackground>
        </View>

        
        <View style = {{width: '80%', height: '10%', padding: 10, backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 10, top: -30}}>  
          
          <View style={{backgroundColor: 'white', height: 'auto'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <CustomAppIcon style={{fontSize: 45, color: '#8F572E', top:-6}} name='naturalista'></CustomAppIcon>
              <CustomAppIcon style={{fontSize: 30, bottom: -12, left: -25, color: '#74783C' }} name='naturalista-2'></CustomAppIcon>
              <CustomAppIcon style={{fontSize: 80, top: -18, left: -10, color: '#74783C' }} name='naturalista-3'></CustomAppIcon>
              <CustomAppIcon style={{fontSize: 50, top: 0, left: -8, color: '#8F572E' }} name='naturalista-4'></CustomAppIcon>
            </View>
            <Text style={{ fontSize: 14, fontFamily: Fonts.family.base_bold, top: -40, textAlign:'right', width: '100%', color: 'gray' }} onPress={() => Linking.openURL('https://www.naturalista.mx')}>www.naturalista.mx</Text>
          </View>
        </View>

        <View style = {{width: '100%', height: '60%', backgroundColor: "white"}}>  
          <ScrollView>
            <View style = {{width: '100%', padding: 20}}>  
              <Text style={{ textAlign: 'center', justifyContent:'center', fontSize: 17, fontFamily: Fonts.family.base_bold, color: '#74783C' }}>¡Tu puedes aumentar la lista de especies de tu municipio!</Text>
              <Text/>
              <Text style={{fontSize: 15, fontFamily: Fonts.family.base_bold}}>¿Ya utilizas Naturalista?</Text> 
              <Text style={{fontSize: 15, fontFamily: Fonts.family.base}}>Registra tus propias observaciones</Text>
            </View>
          
            <View style = {{width: '100%', padding:20, backgroundColor: "#E5E5E5"}}>  
              <Text style={{fontSize: 15, fontFamily: Fonts.family.base_bold}}>Al capturar fotos en Naturalista podrás identificar a las especies y contribuirás al conocimiento de la naturaleza mexicana en Enciclovida</Text>
              <Text/>
              <Text style={{fontFamily: Fonts.family.base_bold}}>¡Descarga Naturalista!</Text>
            </View>
            
            <View style = {{width: '100%', padding: 20}}>
              <Text style={{fontFamily: Fonts.family.base_bold}}>Disponible para:</Text>  
              <View style={{flexDirection: 'row'}}>
                <Image style={{width:'30%', resizeMode: 'contain', marginRight: 10}} source={require('../../assets/icons/414-original.png')} />
                <Image style={{width:'30%', resizeMode: 'contain'}} source={require('../../assets/icons/416-original.png')} />
              </View>  
            </View>      
          </ScrollView>
                          
        </View>

      </View>
      
    );
  }

  render() {
    
    const itemUnderlaycolor = "#304E5B";
    const {  mainModalVisible, mainModalUrl, mainModalTitle } = this.state;
    
    return (
      <SafeAreaView style = {[styles.content, styles.flex_1]} >
        <StatusBar barStyle="light-content" backgroundColor={Colors.statusBarBackground} /> 

        <Modal 
            animationInTiming={400} 
            coverScreen={ true }
            isVisible={mainModalVisible} 
            hasBackdrop={true}
            backdropColor={'black'}
            backdropOpacity={0.7}
            onBackdropPress={() => {
                this.setState({mainModalVisible: !mainModalVisible});
            }}
            style={{ flex: 1, }}
        >
     
          <SafeAreaView style = {{flex: 1}}>
            <View style={{flexDirection:'row', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <View  style={{ width: '70%'}}>
                <Text style={{fontFamily: Fonts.family.base_bold, fontSize: Fonts.size.h1,  color:Colors.blue, padding: 10}}>{mainModalTitle}</Text>
              </View>
              <View  style={{ width: '30%', alignContent:'flex-end', alignItems:'flex-end'}}>
                <TouchableOpacity style={{ }} onPress={() => { this.setState({mainModalVisible: !mainModalVisible}) }} >
                  <Icon2 name="close" color={Colors.blue} style={{fontSize: Fonts.size.h2, padding: 10, paddingTop: 15}} />
                </TouchableOpacity>
              </View> 
            </View>
                
            <View style = {{flex: 1}}>  
              {
                mainModalUrl == 'biomex' ? 
                  this.biomexContentModal() : 
                  mainModalUrl == 'naturalista' ? 
                    this.naturalistaContentModal() :
                    this.enciclovidaContentModal()
                    
              }
            </View> 
          </SafeAreaView>
        </Modal>
        
        <ScrollView contentContainerStyle = {styles.menu} >
          
          <View style = {{ backgroundColor: 'transparent' }} >
            <TouchableHighlight style = {[styles.touchmenu]} onPress = {this.closeMenu} >
              <Icon name="menu"  size = {25} color = "white" style = {[styles.favicon, styles.pt_10]} />
            </TouchableHighlight>
          </View>

          <TouchableHighlight onPress = {this.goToHome} style = { [styles.menuItem] } >
            <View style = {styles.row2} >
              <Icon name="home" size = {25} color = "white" style = {styles.favicon }></Icon>
              <Text style = {[styles.title, {top: 10, color: 'white', fontSize: 20, fontWeight: '800'}]} > Inicio </Text>
            </View>
          </TouchableHighlight>
          <Text/>

          <TouchableHighlight onPress = {() => { this.setState({ mainModalVisible: true, mainModalUrl: 'enciclovida', mainModalTitle: 'enciclovida.mx' })}} style = {[styles.menuItem, {alignItems: 'flex-start'}]} underlayColor = {itemUnderlaycolor} >
            <View style = {[styles.row]} >
              <Text style = {[styles.title, {textAlign: 'left', fontSize: 18, fontWeight: '800', marginRight: 10 }]} > ¿Qué es Enciclovida ? </Text>
            </View>
          </TouchableHighlight> 
          
          <TouchableHighlight onPress = {this.goToSymbology} style = {[styles.menuItem, {alignItems: 'flex-start'}]} underlayColor = {itemUnderlaycolor} >
            <View style = {[styles.row, {flexDirection: 'row'}]} >
              <CustomAppIcon style={{fontSize: 28, color: 'white' }} name='enciclovida'></CustomAppIcon>
              <Text style = {[styles.title, {top: 10, marginLeft: 10, fontSize: 16, fontWeight: '800', marginRight: 10 }]} > Simbología </Text>
            </View>
          </TouchableHighlight> 

          <View style = {[{ backgroundColor: '#DEE3BA', width: '100%', height: '100%', top: 35, Bottom: 30, alignItems: 'center' }]}>
            <Text/>

            <TouchableHighlight onPress = {() => { this.setState({ mainModalVisible: true, mainModalUrl: 'naturalista', mainModalTitle: 'naturalista.mx' })}} underlayColor = {itemUnderlaycolor} >
              <View style = {[styles.row, {alignItems: 'center'}]} >
                <View style={{flexDirection: 'row'}}>
                  <CustomAppIcon style={{fontSize: 45, color: '#8F572E', top:-6}} name='naturalista'></CustomAppIcon>
                  <CustomAppIcon style={{fontSize: 30, bottom: -12, left: -25, color: '#74783C' }} name='naturalista-2'></CustomAppIcon>
                </View>
                <Text style={{textAlign: 'center', fontSize: Fonts.size.h2, fontFamily: Fonts.family.base_bold, color: '#74783C', top:-6}} >¿Quieres contribuir al conocimiento de la Biodiversidad en México?</Text>
              </View>
            </TouchableHighlight>

            <Text/>

            <TouchableHighlight onPress = {() => { this.setState({ mainModalVisible: true, mainModalUrl: 'biomex', mainModalTitle: 'biodiversidad.gob.mx' })}} underlayColor = {itemUnderlaycolor} >
              <View style = {[styles.row, {  alignItems: 'center'}]} >
                <Image style={{width:'50%', resizeMode: 'contain'}} source={require('../../assets/images/logo_Biomex.png')} />
                <Text style={{textAlign: 'center', fontSize: Fonts.size.h2, fontFamily: Fonts.family.base_bold, color: '#74783C', top:-6}} >¿Quieres conocer más sobre la naturaleza de México?</Text>
              </View>
            </TouchableHighlight>

          </View>

        </ScrollView>
        
        <View style={[{flexDirection: 'row', height: '14%', backgroundColor: '#DEE3BA'}]}>
          <Image style={{width:240, height: '90%', top: 0, resizeMode: 'contain'}} source={require('../../assets/icons/conabio_horizontal.png')} />
        </View>
        
      </SafeAreaView>
    );
  }
}

export default withNavigation(SideMenu);