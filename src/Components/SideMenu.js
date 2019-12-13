import React from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableHighlight
} from "react-native";
import {createIconSetFromFontello} from "react-native-vector-icons";
import {withNavigation} from "react-navigation";
import config from "../Theme/Fonts/config"
import styles from "./Styles/SideMenuStyles";
const CustomIcon = createIconSetFromFontello(config);
const DataFilterReinos = [
  {id: 1, name: "Animales", icon: "ic_re_animales", order: 1, selected: false },
  {id: 4, name: "Hongos", icon: "ic_re_hongos", order: 2, selected: false },
  {id: 2, name: "Plantas", icon: "ic_re_plantas", order: 3, selected: false},
  {id: 3, name: "Bacterias", icon: "ic_re_bacterias", order: 4, selected: false},
  {id: 5, name: "Protozoarios", icon: "ic_re_protozoarios", order: 5, selected: false},
];

const DataFilterAnimales = [
  {id: 22653, name: "Mamíferos", icon: "ic_ga_mamiferos", order: 1, selected: false },
  {id: 22655, name: "Aves", icon: "ic_ga_aves", order: 2, selected: false},
  {id: 22647, name: "Reptiles", icon: "ic_ga_reptiles", order: 3, selected: false},
  {id: 22654, name: "Anfibios", icon: "ic_ga_anfibios", order: 4, selected: false},
  {id: 213482, name: "Peces con aletas radiadas", icon: "ic_ga_peces", order: 5, selected: false},
  {id: 22987, name: "Lampreas", icon: "ic_ga_lamprea", order: 6, selected: false},
  {id: 22651, name: "Peces bruja	", icon: "ic_ga_peces_bruja", order: 7, selected: false},
  {id: 22650, name: "Tiburones y rayas", icon: "ic_ga_tiburones", order: 8, selected: false},
  {id: 66500, name: "Arañas, alacranes y parientes", icon: "ic_ga_alacranes", order: 9, selected: false},
  {id: 16912, name: "Insectos", icon: "ic_ga_insectos", order: 10, selected: false},
  {id: 40672, name: "Caracoles, almejas y pulpos", icon: "ic_ga_caracoles", order: 11, selected: false},
  {id: 56646, name: "Camarones, cangrejos y parientes", icon: "ic_ga_camarones", order: 12, selected: false},
  {id: 40658, name: "Gusanos anillados", icon: "ic_ga_gusanos", order: 13, selected: false},
  {id: 66499, name: "Milpiés, cienpiés y parientes", icon: "ic_ga_milpies", order: 14, selected: false},
  {id: 129550, name: "Estrellas y erizos de mar", icon: "ic_ga_estrellas", order: 15, selected: false  },
  {id: 40659, name: "Corales, medusas y parientes", icon: "ic_ga_corales", order: 16, selected: false},
  {id: 40657, name: "Esponjas y parientes", icon: "ic_ga_esponjas", order: 17, selected: false},
];

const DataFilterPlantas = [
  {id: 135296,name: "Musgos, hepáticas y parientes", icon: "ic_gp_musgos", order: 1, selected: false},
  {id: 135299, name: "Antoceros", icon: "ic_gp_antoceros", order: 2, selected: false },
  {id: 135313, name: "Helechos y parientes", icon: "ic_gp_helechos", order: 3,selected: false},
  {id: 135316,name: "Coníferas y parientes",icon: "ic_gp_coniferas",order: 4,selected: false},
  {id: 135314,name: "Cícadas",icon: "ic_gp_cicadas",order: 5,selected: false},
  {id: 135324,name: "Pastos, palmeras y parientes",icon: "ic_gp_pastos",order: 6,selected: false},
  {id: 135306,name: "Magnolias, margaritas y parientes",icon: "ic_gp_magnolias",order: 7,selected: false},
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
  }
};
global.navigator = undefined;
class SideMenu extends React.Component {
  goToFind = () => {
    const {navigation} = this.props;
    navigation.navigate("Find");
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
    global.ListReino = DataFilterReinos;
    global.ListAnimales = DataFilterAnimales;
    global.ListPlantas = DataFilterPlantas;
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
        <ScrollView contentContainerStyle = {styles.menu} >
        <View >
          <TouchableHighlight style = {[styles.touchmenu]} onPress = {this.closeMenu} >
            <CustomIcon name = "menu" size = {25} color = "#304E5B" style = {[styles.favicon, styles.pt_10]}/>
          </TouchableHighlight >
        </View>
        <TouchableHighlight onPress = {this.goToFind} style = { [styles.menuItem] } >
          <View style = {styles.row2} >
            <CustomIcon name = "find" size = {25} color = "#fff" style = {styles.favicon }/>
            <Text style = {styles.title} > Busca una especie </Text>
          </View >
          </TouchableHighlight>
          <TouchableHighlight onPress = {() => { this.goToSpeciesList("SpeciesRisk")}} style = {[styles.menuItem]} underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > En riesgo </Text>
            </View >
          </TouchableHighlight>
          <TouchableHighlight onPress = {() => {this.goToSpeciesList("SpeciesEndemic")}} style = {[styles.menuItem]} underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > Endémicas </Text>
            </View >
          </TouchableHighlight>
          <TouchableHighlight onPress = {() => {this.goToSpeciesList("SpeciesExotic")}} style = {[styles.menuItem]} underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > Exóticas </Text>
            </View >
          </TouchableHighlight>
          <View style = {styles.tabLine}/>
          <TouchableHighlight onPress = {this.goToInfo} style = {[styles.menuItem]} underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > ¿Qué es Enciclovida ? </Text>
            </View >
          </TouchableHighlight>
          <TouchableHighlight onPress = {this.goToSymbology} style = {[styles.menuItem]}underlayColor = {itemUnderlaycolor} >
            <View style = {styles.row} >
              <Text style = {styles.title} > Simbología </Text>
              </View>
            </TouchableHighlight>
          </ScrollView >
        <View style = {styles.image_container} >
          <Image style = {styles.image} source = {{uri: 'ic_footer_menu'}} resizeMode = "contain" />
        </View>
      </View>
    );
  }
}

export default withNavigation(SideMenu);