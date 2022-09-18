import React from "react";
import {View, Text, ScrollView, TouchableOpacity, StatusBar, Image, TouchableHighlight} from "react-native";
import {createIconSetFromFontello} from "react-native-vector-icons";
import {withNavigation} from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import config from "../Theme/Fonts/config"
import styles from "../Components/Styles/SideMenuStyles";
import { Colors } from "../Theme";

const CustomIcon = createIconSetFromFontello(config);

global.DataFilterReinos = [
  {id: 1, name: "Animales", icon: "ic_re_animales", ev_icon: 'animalia', order: 1, selected: false },
  {id: 4, name: "Hongos", icon: "ic_re_hongos", ev_icon: 'fungi',  order: 2, selected: false },
  {id: 2, name: "Plantas", icon: "ic_re_plantas", ev_icon: 'plantae',  order: 3, selected: false},
  {id: 3, name: "Bacterias", icon: "ic_re_bacterias", ev_icon: 'prokaryotae',  order: 4, selected: false},
  {id: 5, name: "Protozoarios", icon: "ic_re_protozoarios", ev_icon: 'protoctista',  order: 5, selected: false},
];

global.DataFilterAnimales = [
  {id: 22653, name: "Mamíferos", icon: "ic_ga_mamiferos", ev_icon: 'mammalia',  order: 1, selected: false },
  {id: 22655, name: "Aves", icon: "ic_ga_aves", ev_icon: 'aves',  order: 2, selected: false},
  {id: 22647, name: "Reptiles", icon: "ic_ga_reptiles", ev_icon: 'reptilia',  order: 3, selected: false},
  {id: 22654, name: "Anfibios", icon: "ic_ga_anfibios", ev_icon: 'amphibia',  order: 4, selected: false},
  {id: 213482, name: "Peces con aletas radiadas", icon: "ic_ga_peces", ev_icon: 'actinopterygii',  order: 5, selected: false},
  {id: 22987, name: "Lampreas", icon: "ic_ga_lamprea", ev_icon: 'petomyzontidae',  order: 6, selected: false},
  {id: 22651, name: "Peces bruja	", icon: "ic_ga_peces_bruja", ev_icon: 'myxini',  order: 7, selected: false},
  {id: 22650, name: "Tiburones y rayas", icon: "ic_ga_tiburones", ev_icon: 'chondrichthyes',  order: 8, selected: false},
  {id: 66500, name: "Arañas, alacranes y parientes", icon: "ic_ga_alacranes", ev_icon: 'arachnida',  order: 9, selected: false},
  {id: 16912, name: "Insectos", icon: "ic_ga_insectos", ev_icon: 'insecta',  order: 10, selected: false},
  {id: 40672, name: "Caracoles, almejas y pulpos", icon: "mollusca", ev_icon: 'mollusca',  order: 11, selected: false},
  {id: 56646, name: "Camarones, cangrejos y parientes", icon: "ic_ga_camarones", ev_icon: 'crustacea',  order: 12, selected: false},
  {id: 40658, name: "Gusanos anillados", icon: "ic_ga_gusanos", ev_icon: 'annelida',  order: 13, selected: false},
  {id: 66499, name: "Milpiés, cienpiés y parientes", icon: "ic_ga_milpies", ev_icon: 'myriapoda',  order: 14, selected: false},
  {id: 129550, name: "Estrellas y erizos de mar", icon: "ic_ga_estrellas", ev_icon: 'echinodermata',  order: 15, selected: false  },
  {id: 40659, name: "Corales, medusas y parientes", icon: "ic_ga_corales", ev_icon: 'cnidaria',  order: 16, selected: false},
  {id: 40657, name: "Esponjas y parientes", icon: "ic_ga_esponjas", ev_icon: 'porifera',  order: 17, selected: false},
];

global.DataFilterPlantas = [
  {id: 135296,name: "Musgos, hepáticas y parientes", icon: "ic_gp_musgos", ev_icon: 'bryophyta',  order: 1, selected: false},
  {id: 135299, name: "Antoceros", icon: "ic_gp_antoceros", ev_icon: 'anthocerotophyta',  order: 2, selected: false },
  {id: 135313, name: "Helechos y parientes", icon: "ic_gp_helechos", ev_icon: 'polypodiidae',  order: 3,selected: false},
  {id: 135316,name: "Coníferas y parientes",icon: "ic_gp_coniferas",ev_icon: 'pinidae',  order: 4,selected: false},
  {id: 135314,name: "Cícadas",icon: "ic_gp_cicadas",ev_icon: 'cycadidae',  order: 5,selected: false},
  {id: 135324,name: "Pastos, palmeras y parientes",icon: "ic_gp_pastos",ev_icon: 'lilianae',  order: 6,selected: false},
  {id: 135306,name: "Magnolias, margaritas y parientes",icon: "ic_gp_magnolias",ev_icon: 'magnoliidae',  order: 7,selected: false},
];

var nav_dispatch = null;

const listsParams = {
  SpeciesRisk: {
    filter: "&edo_cons=%5B17%2C15%2C14%2C16%2C29%2C28%2C27%2C26%2C25%5D",
    title: "Especies en riesgo"
  },
  SpeciesExotic: {
    filter: "&dist=%5B10%2C6%5D",
    title: "Especies exóticas"
  },
  SpeciesEndemic: {
    filter: "&dist=%5B3%5D",
    title: "Especies endémicas",
  },
  SpeciesByLocation: {
    filter: "",
    title: "BY L",
  }
};

global.navigator = undefined;

class SideMenu extends React.Component {
  goToFind = () => {
    const {navigation} = this.props;
    navigation.navigate("Find");
    navigation.closeDrawer();
  };

  goToFindByLocation = () => {
    const {navigation} = this.props;
    this.loadFilterOptions();
    navigation.navigate("FindByLocation");
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
    global.ListReino = global.DataFilterReinos;
    global.ListAnimales = global.DataFilterAnimales;
    global.ListPlantas = global.DataFilterPlantas;
    global.id_specie = 0;
  };

  loadFilterOptions = () => {
    global.ListReino = global.DataFilterReinos;
    global.ListAnimales = global.DataFilterAnimales;
    global.ListPlantas = global.DataFilterPlantas;
    global.id_specie = 0;
  };

  goToSpeciesList = (listName) => {
    if (listsParams[listName] !== undefined) {
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

  render() {
    const itemUnderlaycolor = "#304E5B";
    return (
      <View style = {[styles.content, styles.flex_1]} >
        <StatusBar barStyle="light-content" backgroundColor={Colors.statusBarBackground} /> 
        <ScrollView contentContainerStyle = {styles.menu} >
          <View >
            <TouchableHighlight style = {[styles.touchmenu]} onPress = {this.closeMenu} >
              <Icon name="ios-menu"  size = {25} color = "#304E5B" style = {[styles.favicon, styles.pt_10]} />
            </TouchableHighlight>
          </View>

          <TouchableHighlight onPress = {this.goToFindByLocation} style = { [styles.menuItem] } >
            <View style = {styles.row2} >
              <CustomIcon name="region" size = {22} color = "#fff" style = {styles.favicon }></CustomIcon>
              <Text style = {styles.title} > Busca por tu ubicación </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress = {this.goToFind} style = { [styles.menuItem] } >
            <View style = {styles.row2} >
              <Icon name="ios-search"  size = {25} color = "#fff" style = {styles.favicon } />
              <Text style = {styles.title} > Busca una especie </Text>
            </View>
          </TouchableHighlight>
         
          <Text style = {styles.titleHeader } > A NIVEL NACIONAL: </Text>
          
          <TouchableHighlight onPress = {() => { this.goToSpeciesList("SpeciesRisk")}} style = {[styles.subMenuItem]} underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > En riesgo </Text>
            </View>
          </TouchableHighlight>
          
          <TouchableHighlight onPress = {() => {this.goToSpeciesList("SpeciesEndemic")}} style = {[styles.subMenuItem]} underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > Endémicas </Text>
            </View>
          </TouchableHighlight>
          
          <TouchableHighlight onPress = {() => {this.goToSpeciesList("SpeciesExotic")}} style = {[styles.subMenuItem]} underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > Exóticas </Text>
            </View>
          </TouchableHighlight>
          
          <View style = {styles.tabLine}/>
          
          <TouchableHighlight onPress = {this.goToInfo} style = {[styles.menuItem]} underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > ¿Qué es Enciclovida ? </Text>
            </View>
          </TouchableHighlight>
          
          <TouchableHighlight onPress = {this.goToSymbology} style = {[styles.menuItem]}underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > Simbología </Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        
        <View style = {styles.image_container} >
          <Image style = {styles.image} source = {{uri: 'ic_footer_menu'}} resizeMode = "contain" />
        </View>
      </View>
    );
  }
}

export default withNavigation(SideMenu);