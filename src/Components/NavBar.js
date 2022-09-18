//import liraries
import React from 'react';
import { Keyboard, View, Text, TouchableOpacity, FlatList, Image, ScrollView, Alert, BackHandler, Linking, StatusBar } from 'react-native';
import { createIconSetFromFontello } from "react-native-vector-icons";
import { withNavigation } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';

import Dialog, { DialogContent } from 'react-native-popup-dialog';
import styles from "./Styles/NavBarStyle";
import config from "../Theme/Fonts/config";
import MultiSelect from 'react-native-multiple-select';
import { Colors, Fonts } from '../Theme';


// Tipo de distribución:
const T_DISTRIBUCION = [
  {id:"3", name: "Endémica", icon: "endemica", order: 1, selected: false},
  {id:"7", name: "Nativa", icon: "nativa", order: 1, selected: false},
  {id:"10", name: "Exótica", icon: "exotica", order: 1, selected: false},
  {id:"6", name: "Exótica-Invasora", icon: "exotica-invasora", order: 1, selected: false},
];

// Norma Oficial Mexicana (NOM-059):
const T_NOM_059 = [
  {id:16, name: "Probablemente extinta en el medio silvestre (E)", icon: "endemica", order: 1, selected: false},
  {id:14, name: "En peligro de extinción (P)", icon: "endemica", order: 1, selected: false},
  {id:15, name: "Amenazada (A)", icon: "endemica", order: 1, selected: false},
  {id:17, name: "Sujeta a protección especial (Pr)", icon: "endemica", order: 1, selected: false},
];

// Unión Internacional para la Conservación de la Naturaleza (IUCN):
const T_IUCN = [
  {id:25, name: "Extinto (EX)", icon: "endemica", order: 1, selected: false},
  {id:26, name: "Extinto en estado silvestre (EW)", icon: "endemica", order: 1, selected: false},
  {id:27, name: "En peligro crítico (CR)", icon: "endemica", order: 1, selected: false},
  {id:28, name: "En peligro (EN)", icon: "endemica", order: 1, selected: false},
  {id:29, name: "Vulnerable (VU)", icon: "endemica", order: 1, selected: false},
];

// Comercio Internacional (CITES):
const T_CITES = [
  {id:22, name: "Apéndice I", icon: "apendice-i", order: 1, selected: false},
  {id:23, name: "Apéndice II", icon: "apendice-ii", order: 1, selected: false},
  {id:24, name: "Apéndice III", icon: "apendice-iii", order: 1, selected: false},
];

// Evaluación CONABIO:
const T_EVAL_CONABIO = [
  {id:1102, name: "En peligro de extinción (P)", icon: "endemica", order: 1, selected: false},
  {id:1103, name: "Amenazada (A)", icon: "endemica", order: 1, selected: false},
  {id:1104, name: "Sujetas a protección especial (Pr)", icon: "endemica", order: 1, selected: false},
]; 

// USO
const T_USO = [
  {id:"11-4-0-0-0-0-0", name: "Ambiental", icon: "endemica", order: 1, selected: false},
  {id:"11-16-0-0-0-0-0", name: "Artesanía", icon: "endemica", order: 1, selected: false},
  {id:"11-5-0-0-0-0-0", name: "Combustible", icon: "endemica", order: 1, selected: false},
  {id:"11-40-1-0-0-0-0", name: "Consumo animal", icon: "endemica", order: 1, selected: false},
  {id:"11-40-2-0-0-0-0", name: "Consumo humano", icon: "endemica", order: 1, selected: false},
  {id:"11-8-0-0-0-0-0", name: "Industrial", icon: "endemica", order: 1, selected: false},
  {id:"11-47-0-0-0-0-0", name: "Maderable", icon: "endemica", order: 1, selected: false},
  {id:"11-9-0-0-0-0-0", name: "Manejo de plagas", icon: "endemica", order: 1, selected: false},
  {id:"11-10-0-0-0-0-0", name: "Materiales", icon: "endemica", order: 1, selected: false},
  {id:"11-11-0-0-0-0-0", name: "Medicinal", icon: "endemica", order: 1, selected: false},
  {id:"11-13-0-0-0-0-0", name: "Melífera", icon: "endemica", order: 1, selected: false},
  {id:"11-15-0-0-0-0-0", name: "Ornamental", icon: "endemica", order: 1, selected: false},
  {id:"11-14-0-0-0-0-0", name: "Sociales/religiosos", icon: "endemica", order: 1, selected: false},
]; 


// Forma de crecimiento (solo plantas)
const T_FORMA_CRECIMIENTO = [
  {id:"18-14-0-0-0-0-0", name: "Arborescente", icon: "usos", order: 1, selected: false},
  {id:"18-2-0-0-0-0-0", name: "Arbusto", icon: "usos", order: 1, selected: false},
  {id:"18-15-0-0-0-0-0", name: "Bejuco", icon: "usos", order: 1, selected: false},
  {id:"18-6-0-0-0-0-0", name: "Columnar", icon: "usos", order: 1, selected: false},
  {id:"18-9-0-0-0-0-0", name: "Epilítica", icon: "usos", order: 1, selected: false},
  {id:"18-7-0-0-0-0-0", name: "Epífita", icon: "usos", order: 1, selected: false},
  {id:"18-16-0-0-0-0-0", name: "Geófita", icon: "usos", order: 1, selected: false},
  {id:"18-3-0-0-0-0-0", name: "Hierba", icon: "usos", order: 1, selected: false},
  {id:"18-5-0-0-0-0-0", name: "Liana", icon: "usos", order: 1, selected: false},
  {id:"18-18-0-0-0-0-0", name: "Palma", icon: "usos", order: 1, selected: false},
  {id:"18-10-0-0-0-0-0", name: "Parásita", icon: "usos", order: 1, selected: false},
  {id:"18-11-0-0-0-0-0", name: "Rastrera", icon: "usos", order: 1, selected: false},
  {id:"18-8-0-0-0-0-0", name: "Rosetófila", icon: "usos", order: 1, selected: false},
  {id:"18-12-0-0-0-0-0", name: "Suculenta", icon: "usos", order: 1, selected: false},
  {id:"18-4-0-0-0-0-0", name: "Sufrútice", icon: "usos", order: 1, selected: false},
  {id:"18-13-0-0-0-0-0", name: "Taloide", icon: "usos", order: 1, selected: false},
  {id:"18-17-0-0-0-0-0", name: "Trepadora", icon: "usos", order: 1, selected: false},
  {id:"18-1-0-0-0-0-0", name: "Árbol", icon: "usos", order: 1, selected: false},
]; 


// Ambiente
const T_AMBIENTE = [
  {id:1024, name: "Marino", icon: "marino", order: 1, selected: false},
  {id:1025, name: "Dulceacuícola", icon: "dulceacuicola", order: 1, selected: false},
  {id:1026, name: "Terrestre", icon: "terrestre", order: 1, selected: false},
  {id:1027, name: "Salobre", icon: "salobre", order: 1, selected: false},
  {id:1207, name: "Salino", icon: "salino", order: 1, selected: false},
  {id:1208, name: "Hiposalino", icon: "hiposalino", order: 1, selected: false},
  {id:1209, name: "Mesosalino", icon: "mesosalino", order: 1, selected: false},
  {id:1210, name: "Hipersalino", icon: "hipersalino", order: 1, selected: false}, 
];


const CustomIcon = createIconSetFromFontello(config);

const InfoArray = [
    {id: 10, name: "Exótica", icon:"ic_10",title: "Tipo de distribución", order: 1 },
    {id: 7, name: "Nativa", icon:"ic_7", title: "Tipo de distribución", order: 2 },
    {id: 6, name: "Exótica - Invasora", icon:"ic_6", title: "Tipo de distribución", order: 3 },
    {id: 3, name: "Endémica", icon:"ic_3", title: "Tipo de distribución", order: 4 },
    {id: 17, name: "Sujeta a protección especial (Pr)", icon:"ic_17", title: "Categoría nacional de riesgo", order: 5 },
    {id: 15, name: "Amenazada (A)", icon:"ic_15", title: "Categoría nacional de riesgo", order: 6 },
    {id: 14, name: "En peligro de extinción (P)", icon:"ic_14", title: "Categoría nacional de riesgo", order: 7 },
    {id: 16, name: "Probablemente extinta en el medio silvestre (E)", icon:"ic_16", title: "Categoría nacional de riesgo", order: 8 },
    {id: 29, name: "Vulnerable (VU)", icon:"ic_29", title: "Categoría internacional de riesgo", order: 9 },
    {id: 28, name: "En peligro (EN)", icon:"ic_28", title: "Categoría internacional de riesgo", order: 10 },
    {id: 27, name: "En peligro crítico (CR)", icon:"ic_27", title: "Categoría internacional de riesgo", order: 11 },
    {id: 26, name: "Extinto en estado silvestre (EW)", icon:"ic_26", title: "Categoría internacional de riesgo", order: 12 },
    {id: 25, name: "Extinto (EX)", icon:"ic_25", title: "Categoría internacional de riesgo", order: 13 },
    {id: 22, name: "Apéndice I", icon:"ic_22", title: "Protegidas del comercio internacional", order: 14 },
    {id: 23, name: "Apéndice II", icon:"ic_23", title: "Protegidas del comercio internacional", order: 15 },
    {id: 24, name: "Apéndice III", icon:"ic_24", title: "Protegidas del comercio internacional", order: 16 },
    {id: 1033, name: "Prioritaria con grado alta", icon:"ic_1033", title: "Prioritarias para la conservación", order: 17 },
    {id: 1034, name: "Prioritaria con grado media", icon:"ic_1034", title: "Prioritarias para la conservación", order: 18 },
    {id: 1035, name: "Prioritaria con grado menor", icon:"ic_1053", title: "Prioritarias para la conservación", order: 19 },
    {id: 1026, name: "Terrestre", icon:"ic_1026", title: "Ambiente", order: 20 },
    {id: 1025, name: "Dulceacuícola", icon:"ic_1025", title: "Ambiente", order: 21 },
    {id: 1024, name: "Marino", icon:"ic_1024", title: "Ambiente", order: 23 },
    {id: 1027, name: "Salobre", icon:"ic_1027", title: "Ambiente", order: 24 },
];
var arraydata = [];

const API = 'https://api.enciclovida.mx';

// create a component
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      filtershow: false,
      filterByLshow: false,
      data: [],
      id_tmp: 0,
      title:"",
      subtitle:"",
      selected_T_Group: "",
      selected_T_DISTRIBUCION:[],
      selectedItems : [],
      selected_T_NOM_059: [],
      selected_T_IUCN: [],
      selected_T_CITES: [],
      selected_T_EVAL_CONABIO: [], 
      selected_T_USO: [],
      selected_T_FORMA_CRECIMIENTO: [],
      selected_T_AMBIENTE: [],
    };
  }

  displayDrawerMenu = () => {
    const {navigation} = this.props;
    navigation.openDrawer();
    this.setState({dialog: false ,filtershow: false, filterByLshow: false});
  }

  showSpecieInfo = () => {
    this.setState({
      dialog: true,
    });
  };

  showFilterDialog = () => {
    if(this.state.filtershow)
      this.setState({filtershow: false});
    else
      this.setState({filtershow: true});
  };

  showFilterByLDialog = () => {
    if(this.state.filterByLshow)
      this.setState({filterByLshow: false});
    else
      this.setState({filterByLshow: true});
  };

  renderLeftButton = () => {
    const { menuLightButton} = this.props;
    const iconColor= menuLightButton? "#304E5B" : "#FFF";
    return(
      <TouchableOpacity style={styles.touchmenu} onPress={this.displayDrawerMenu}>
        <Icon name="ios-menu" size={25} color={iconColor} style={styles.faviconmenu} />
      </TouchableOpacity>
    ) 
    };

  renderRightButton = () => {
    const { infoButton, filterButton, imageButton, filterButtonByL } = this.props;
    const { menuLightButton} = this.props;
    const iconColor= menuLightButton? "#304E5B" : "#FFF";
    if(infoButton){
      return(
        <TouchableOpacity onPress={this.showSpecieInfo} >
          <Icon name="ios-information-circle-outline" size={30} color={iconColor} style={[styles.favIcon]} />
        </TouchableOpacity>
      )
    }
    else if(imageButton){
      return(
        <TouchableOpacity onPress={() => Linking.openURL('http://enciclovida.mx/')}>
          <Icon name="ios-information-circle-outline" size={30} color={iconColor} style={[styles.favIcon]} />
        </TouchableOpacity>
      )
    }
    else if(filterButton){
      return(
        <TouchableOpacity onPress={this.showFilterDialog} >
          <Icon2 name="filter" color={iconColor} style={styles.favIcon} />
        </TouchableOpacity>
      )
    }
    else if(filterButtonByL) {
      return(
        <TouchableOpacity onPress={this.showFilterByLDialog} >
          <CustomIcon name="avanzada" style={styles.favIcon2}></CustomIcon>
        </TouchableOpacity>
      )
    }
  };

  clearFilters = () => {  
    console.log("limpiar filtros");

    this.state = {
      selected_T_Group: "",
      selectedItems : [],
      selected_T_DISTRIBUCION: [],
      selected_T_NOM_059: [],
      selected_T_IUCN: [],
      selected_T_CITES: [],
      selected_T_EVAL_CONABIO: [], 
      selected_T_USO: [],
      selected_T_FORMA_CRECIMIENTO: [],
      selected_T_AMBIENTE: [],
    };
  };

  getSpecieDescription=(propNameToEvaluate, jsonResponseArrayElement)=>{
    return jsonResponseArrayElement.map(item => { 
      var found = InfoArray.find(function(element) {
        return element.id == item[propNameToEvaluate];
      });
      if(found)
        return {
          id: found.id, 
          isLast: false, 
          name: found.name, 
          icon: found.icon, 
          title: found.title, 
          order: found.order 
        };
      else
        return null;
    }).filter(result => result != null);
  }

  getSpecieInfo = async (id_especie) => {
    if(id_especie != 0 && id_especie != this.state.id_tmp){
      this.setState({ id_tmp: id_especie });
      fetch(`${API}/especie/${id_especie}`)
      .then(res => res.json())
      .then((json) => {
        arraydata = [];
        Array.prototype.push.apply(
          arraydata, 
          this.getSpecieDescription("IdTipoDistribucion", json.e_tipo_distribucion)
        );
        
        Array.prototype.push.apply(
          arraydata, 
          this.getSpecieDescription("IdCatNombre", json.e_caracteristicas)
        );
        
        arraydata.sort(function (a, b) {
          if (a.order > b.order) {return 1;} if (a.order < b.order) {return -1;} return 0;
        });

        arraydata[arraydata.length-1].isLast = true;
        this.setState({ data: arraydata });
      }).catch(error => {

      });
    }
  }

  handlePress(id, type) {
    this.setState({ filtershow: false });
    this.updatevisible(id);
    if(global.filtro.includes("&id=")){
      const findid = global.filtro.indexOf("&id=");
      const repl = global.filtro.substring(findid,global.filtro.length);
      global.filtro = global.filtro.replace(repl,"&id=" + id);
      //Alert.alert(global.filtro);
    }
    else{
      global.filtro = global.filtro + "&id=" + id;
      //Alert.alert(global.filtro);
    }
    let cattype = type == 3 ? "&cat=7000" : "&cat=7100";
    if(global.filtro.includes("&cat=")){
      const findid = global.filtro.indexOf("&cat=");
      const repl = global.filtro.substring(findid,global.filtro.length);
      global.filtro = global.filtro.replace(repl, cattype);
      //Alert.alert(global.filtro);
    }
    else{
      global.filtro = global.filtro + cattype;
      //Alert.alert(global.filtro);
    }
    
    this.props.navigation.navigate(global.listSpecies, {});
  }

  updatevisible = (id) => {
    let reino, animal, planta;
    reino=animal=planta=[];
    let filterArray=(item)=>{
      item.selected = item.id == id;
      return item;
    }
    reino = global.ListReino.map(filterArray);
    animal = global.ListAnimales.map(filterArray);
    planta = global.ListPlantas.map(filterArray);
    
    global.ListReino = reino;
    global.ListAnimales = animal;
    global.ListPlantas = planta;
  };

  clear = () => {
    let restartSelectedItem=(item)=>{
      item.selected = false;
      return item;
    };
    var reino = global.ListReino.map(restartSelectedItem);
    var animal = global.ListAnimales.map(restartSelectedItem);
    var planta = global.ListPlantas.map(restartSelectedItem);

    global.ListReino = reino;
    global.ListAnimales = animal;
    global.ListPlantas = planta;
  };

  renderItem = ({ last, title, content, icon }) => {
    return(
      <View>
        <Text style={styles.items}>{title}</Text>
        <Text style={[styles.items, styles.itemsdetails]}>{content}</Text>
        {!last && <View style={styles.tabLine} />}
        <View style={[styles.image, last ? styles.imagelast : null ]}>
          <Image source={{ uri: icon }} style={styles.imageIcon} />
        </View>
      </View>
    )
  };

  componentDidMount() {
    console.log(" - - - componentDidMount");
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPressNav);
    if(global.LastlistSpecies != global.listSpecies){
      global.LastlistSpecies = global.listSpecies;
      this.clear();
      
    }
    this.setState({title: global.title, subtitle: global.subtitle});
  }

  UNSAFE_componentWillReceiveProps = () => {
    console.log(" - - - UNSAFE_componentWillReceiveProps  - - -- ");

    console.log(this.props.navigation.state.routeName);
    console.log(" - - - -- ");

    if(this.props.navigation.state.routeName != 'SpeciesByLocation'){
      this.getSpecieInfo(global.id_specie);
      if(global.LastlistSpecies != global.listSpecies){
        global.LastlistSpecies = global.listSpecies;
        this.clear();
      }
    } else {
      console.log(global.lastLocationData);
      console.log(global.title);
      
      if(global.lastLocationData != global.title){
        global.lastLocationData = global.title;
        console.log("Se borran filtros");
        this.clear();
     }
    }
    console.log(" - - - -- ");


    this.setState({title: global.title, subtitle: global.subtitle});
    
  };

  handleBackPressNav = () => {
    this.setState({
      dialog: false,
      filtershow: false,
      filterByLshow: false,
    });
  }
  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  clearSelectedCategories = () => {
    this._multiSelect_T_AMBIENTE._removeAllItems();
    this._multiSelect_T_FORMA_CRECIMIENTO._removeAllItems();
    this._multiSelect_T_USO._removeAllItems();
    this._multiSelect_T_EVAL_CONABIO._removeAllItems();
    this._multiSelect_T_CITES._removeAllItems();
    this._multiSelect_T_IUCN._removeAllItems();
    this._multiSelect_T_NOM_059._removeAllItems();
    this._multiSelect_T_DISTRIBUCION._removeAllItems();
    this.clear();
    this.updateFilters();
  };
  

  onHandlePressGroupChange = (id) => {
    console.log(" - - -");
    console.log(this.state.selected_T_Group);
    console.log(id);

    if(id == this.state.selected_T_Group) {
      this.clear();
      this.closeDialog();
    } else {
      this.updatevisible(id);
      this.setState({ selected_T_Group: id });
      setTimeout(
        () => {
          this.updateFilters();
        }, 100
      );
    } 
  }

  onSelectedT_DISTRIBUCIONChange = selected_T_DISTRIBUCION => {
    this.setState({ selected_T_DISTRIBUCION });
    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
  };
  onSelectedT_NOM_059Change = selected_T_NOM_059 => {
    console.log(selected_T_NOM_059)
    //this.updateFilters();
    this.setState({ selected_T_NOM_059 });
    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
  };
  onSelectedT_IUCNChange = selected_T_IUCN => {
    console.log(selected_T_IUCN)
    //this.updateFilters();
    this.setState({ selected_T_IUCN });
    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
  };
  onSelectedT_CITESChange = selected_T_CITES => {
    console.log(selected_T_CITES)
    //this.updateFilters();
    this.setState({ selected_T_CITES });
    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
  };
  onSelectedT_EVAL_CONABIOChange = selected_T_EVAL_CONABIO => {
    console.log(selected_T_EVAL_CONABIO)
    //this.updateFilters();
    this.setState({ selected_T_EVAL_CONABIO });
    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
  };
  onSelectedT_USOChange = selected_T_USO => {
    console.log(selected_T_USO)
    //this.updateFilters();
    this.setState({ selected_T_USO });
    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
  };
  onSelectedT_FORMA_CRECIMIENTOChange = selected_T_FORMA_CRECIMIENTO => {
    console.log(selected_T_FORMA_CRECIMIENTO)
    //this.updateFilters();
    this.setState({ selected_T_FORMA_CRECIMIENTO });
    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
  };
  onSelectedT_AMBIENTEChange = selected_T_AMBIENTE => {
    console.log(selected_T_AMBIENTE)
    //this.updateFilters();
    this.setState({ selected_T_AMBIENTE });
    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
  };

  updateFilters = () => {
    console.log("updateFilters")
   
    let allFilters = "";

    if((this.state.selected_T_Group) !== "" ) { 
      allFilters += '&especie_id=' + this.state.selected_T_Group;
    }

    if((this.state.selected_T_DISTRIBUCION.length) > 0) {
      for(let item in this.state.selected_T_DISTRIBUCION) {
        allFilters += "&dist=" + this.state.selected_T_DISTRIBUCION[item];
      }
    }
    // recorrer filtro:  selected_T_NOM_059,
    if((this.state.selected_T_NOM_059.length) > 0) {
      for(let item in this.state.selected_T_NOM_059) {
        allFilters += "&nom_ids=" + this.state.selected_T_NOM_059[item];
      }
    }
    // recorrer filtro:  selected_T_IUCN,
    if((this.state.selected_T_IUCN.length) > 0) {
      for(let item in this.state.selected_T_IUCN) {
        allFilters += "&iucn_ids=" + this.state.selected_T_IUCN[item];
      }
    }
    // recorrer filtro:  selected_T_CITES, 
    if((this.state.selected_T_CITES.length) > 0) {
      for(let item in this.state.selected_T_CITES) {
        allFilters += "&cites_ids=" + this.state.selected_T_CITES[item];
      }
    }
    // recorrer filtro:  selected_T_EVAL_CONABIO,
    if((this.state.selected_T_EVAL_CONABIO.length) > 0) {
      for(let item in this.state.selected_T_EVAL_CONABIO) {
        allFilters += "&ev_conabio_ids=" + this.state.selected_T_EVAL_CONABIO[item];
      }
    } 
    // recorrer filtro:  selected_T_USO,
    if((this.state.selected_T_USO.length) > 0) {
      for(let item in this.state.selected_T_USO) {
        allFilters += "&uso=" + this.state.selected_T_USO[item];
      }
    }
    // recorrer filtro:  selected_T_FORMA_CRECIMIENTO,
    if((this.state.selected_T_FORMA_CRECIMIENTO.length) > 0) {
      for(let item in this.state.selected_T_FORMA_CRECIMIENTO) {
        allFilters += "&forma=" + this.state.selected_T_FORMA_CRECIMIENTO[item];
      }
    }
    // recorrer filtro:  selected_T_AMBIENTE,
    if((this.state.selected_T_AMBIENTE.length) > 0) {
      for(let item in this.state.selected_T_AMBIENTE) {
        allFilters += "&ambiente=" + this.state.selected_T_AMBIENTE[item];
      }
    }

    console.log(allFilters);
   
    global.filtro = global.filtro + allFilters;

    const{navigation} = this.props;
    global.listSpecies = "SpeciesByLocation";
    global.filtro = allFilters;
    navigation.navigate(global.listSpecies, {
      data: {},
    });
  };

  closeDialog = () => {
    this.setState({ filterByLshow: false });
  };
 
  

  render() {
    const { transparent, white } = this.props;
    const title= this.state.title;
    const subtitle=this.state.subtitle;
    const { selectedItems } = this.state;
    const { 
      selected_T_DISTRIBUCION,
      selected_T_NOM_059,
      selected_T_IUCN,
      selected_T_CITES, 
      selected_T_EVAL_CONABIO, 
      selected_T_USO,
      selected_T_FORMA_CRECIMIENTO,
      selected_T_AMBIENTE,
    } = this.state;
 
    return (
      <View {...this.props} style={[styles.navBar, transparent ? styles.transparent : null, white ? styles.navBarWhite : null]}>
        <View style={styles.leftContainer}>{this.renderLeftButton()}</View>
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, title != null && title.length > 40 ? styles.title_small : null]}>{title}</Text>
            {subtitle != "" && <Text style={[ styles.subtitle]}>{subtitle}</Text> }
        </View>
        <View style={styles.rightContainer}>{this.renderRightButton()}</View>
          <Dialog
              onDismiss={() => {
                  this.setState({ dialog: false });
              }}
              containerStyle={ styles.navBarDialog }
              width={0.9}
              visible={this.state.dialog}
              rounded
              onTouchOutside={() => {
                  this.setState({ dialog: false });
              }}
              actionsBordered
            >
                <DialogContent style={styles.content}>
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                          this.renderItem({last: item.isLast, title: item.title, content: item.name, icon: item.icon})
                        )}
                    />
                </DialogContent>
          </Dialog>
          <Dialog
            onDismiss={() => {
              this.setState({ filterByLshow: false });
            }}
            containerStyle={ styles.navBarDialog }
            width={0.80}
            visible={this.state.filterByLshow}
            rounded
            onTouchOutside={() => {
              this.setState({ filterByLshow: false });
            }}
            actionsBordered 
          > 
            <DialogContent style={styles.content}>
              
              <ScrollView>

              <View style={styles.upButtons}>
                  <TouchableOpacity style={styles.dialogButton3} onPress={this.closeDialog}>
                      <Icon2 name="close-a" color='white' style={styles.dialogButtonIcon} />
                  </TouchableOpacity>
              </View>

              <Text style={styles.title_flat}>Reinos</Text>
              <FlatList
                data={global.ListReino}
                renderItem={({ item }) => (
                  <View style={item.selected ? styles.columnSelectHo1 : styles.columnHo1 }>
                    <TouchableOpacity onPress={() => {this.onHandlePressGroupChange(item.id)}}>
                      <Image style={styles.imageIconFilterHo} source={{ uri: item.icon }} />
                      <Text style={styles.view_text}>{item.name}</Text>
                    </TouchableOpacity>
                  </View> 
                )}
                horizontal={true}
                keyExtractor={(item, index) => index}
              />

              <Text style={styles.title_flat}>Grupos de animales</Text>
              <FlatList
                data={global.ListAnimales}
                renderItem={({ item }) => (
                  <View style={item.selected ? styles.columnSelectHo1 : styles.columnHo1 }>
                    <TouchableOpacity onPress={() => {this.onHandlePressGroupChange(item.id)}}>
                      <Image style={styles.imageIconFilterHo} source={{ uri: item.icon }} />
                      <Text style={styles.view_text}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                horizontal={true}
                keyExtractor={(item, index) => index}
              />

              <Text style={styles.title_flat}>Grupos de plantas</Text>
              <FlatList
                data={global.ListPlantas}
                renderItem={({ item }) => (
                  <View style={item.selected ? styles.columnSelectHo2 : styles.columnHo2 }>
                    <TouchableOpacity onPress={() => {this.onHandlePressGroupChange(item.id)}}>
                      <Image style={styles.imageIconFilter} source={{ uri: item.icon }} />
                      <Text style={styles.view_text}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                horizontal={true}
                keyExtractor={(item, index) => index}
              />
              <View style={styles.tabLine}/>

              <Text style={styles.dialogTitle}>Filtros adicionales</Text>


                  <Text style={styles.title_flat}>Tipo de distribución</Text>
                  <View style={styles.flat_multiSelect}>
                    <MultiSelect
                      items={T_DISTRIBUCION}
                      uniqueKey="id"
                      ref={(component) => { this._multiSelect_T_DISTRIBUCION = component }}
                      onSelectedItemsChange={this.onSelectedT_DISTRIBUCIONChange}
                      selectedItems={selected_T_DISTRIBUCION}
                      iconSearch="No"
                      //onToggleList={this.updateFilters}
                      selectText="- - Selecciona - -"
                      searchInputPlaceholderText="Buscar..."
                      onChangeInput={ (text)=> console.log(text)}
                      altFontFamily={Fonts.family.base}
                      tagRemoveIconColor={Colors.green}
                      tagBorderColor={Colors.green}
                      tagTextColor={Colors.blue}
                      selectedItemTextColor={Colors.blue}
                      selectedItemIconColor={Colors.green}
                      itemTextColor={Colors.gray}
                      displayKey="name"
                      
                      submitButtonColor={Colors.green}
                      submitButtonText="Listo"
                      fontFamily={Fonts.family.base}
                      itemFontFamily={Fonts.family.base}
                      itemFontSize={Fonts.size.h4}
                      fontSize={Fonts.size.small}
                  
                    />
                  </View>
                  <View style={styles.tabLine}/>
                  
                  
                  <Text style={styles.title_flat}>Norma Oficial Mexicana (NOM-059)</Text>
                  <View style={styles.flat_multiSelect}>
                    <MultiSelect
                      items={T_NOM_059}
                      uniqueKey="id"
                      ref={(component) => { this._multiSelect_T_NOM_059 = component }}
                      onSelectedItemsChange={this.onSelectedT_NOM_059Change}
                      selectedItems={selected_T_NOM_059}
                      iconSearch="No"
                      //onToggleList={this.updateFilters}
                      selectText="- - Selecciona - -"
                      searchInputPlaceholderText="Buscar..."
                      onChangeInput={ (text)=> console.log(text)}
                      altFontFamily={Fonts.family.base}
                      tagRemoveIconColor={Colors.green}
                      tagBorderColor={Colors.green}
                      tagTextColor={Colors.blue}
                      selectedItemTextColor={Colors.blue}
                      selectedItemIconColor={Colors.green}
                      itemTextColor={Colors.gray}
                      displayKey="name"
                      
                      submitButtonColor={Colors.green}
                      submitButtonText="Listo"
                      fontFamily={Fonts.family.base}
                      itemFontFamily={Fonts.family.base}
                      itemFontSize={Fonts.size.h4}
                      fontSize={Fonts.size.small}
                      
                    />
                  </View>
                  <View style={styles.tabLine}/>
                  
                  <Text style={styles.title_flat}>Unión Internacional para la Conservación de la Naturaleza (IUCN)</Text>
                  <View style={styles.flat_multiSelect}>
                    <MultiSelect
                      items={T_IUCN}
                      uniqueKey="id"
                      ref={(component) => { this._multiSelect_T_IUCN = component }}
                      onSelectedItemsChange={this.onSelectedT_IUCNChange}
                      selectedItems={selected_T_IUCN}
                      iconSearch="No"
                      //onToggleList={this.updateFilters}
                      selectText="- - Selecciona - -"
                      searchInputPlaceholderText="Buscar..."
                      onChangeInput={ (text)=> console.log(text)}
                      altFontFamily={Fonts.family.base}
                      tagRemoveIconColor={Colors.green}
                      tagBorderColor={Colors.green}
                      tagTextColor={Colors.blue}
                      selectedItemTextColor={Colors.blue}
                      selectedItemIconColor={Colors.green}
                      itemTextColor={Colors.gray}
                      displayKey="name"
                      
                      submitButtonColor={Colors.green}
                      submitButtonText="Listo"
                      fontFamily={Fonts.family.base}
                      itemFontFamily={Fonts.family.base}
                      itemFontSize={Fonts.size.h4}
                      fontSize={Fonts.size.small}
                      
                    />
                  </View>
                  <View style={styles.tabLine}/>
                  
                  <Text style={styles.title_flat}>Comercio Internacional (CITES)</Text>
                  <View style={styles.flat_multiSelect}>
                    <MultiSelect
                      items={T_CITES}
                      uniqueKey="id"
                      ref={(component) => { this._multiSelect_T_CITES = component }}
                      onSelectedItemsChange={this.onSelectedT_CITESChange}
                      selectedItems={selected_T_CITES}
                      iconSearch="No"
                      //onToggleList={this.updateFilters}
                      selectText="- - Selecciona - -"
                      searchInputPlaceholderText="Buscar..."
                      onChangeInput={ (text)=> console.log(text)}
                      altFontFamily={Fonts.family.base}
                      tagRemoveIconColor={Colors.green}
                      tagBorderColor={Colors.green}
                      tagTextColor={Colors.blue}
                      selectedItemTextColor={Colors.blue}
                      selectedItemIconColor={Colors.green}
                      itemTextColor={Colors.gray}
                      displayKey="name"
                      
                      submitButtonColor={Colors.green}
                      submitButtonText="Listo"
                      fontFamily={Fonts.family.base}
                      itemFontFamily={Fonts.family.base}
                      itemFontSize={Fonts.size.h4}
                      fontSize={Fonts.size.small}
                      
                    />
                  </View>
                  <View style={styles.tabLine}/>
                  
                  <Text style={styles.title_flat}>Evaluación CONABIO</Text>
                  <View style={styles.flat_multiSelect}>
                    <MultiSelect
                      items={T_EVAL_CONABIO} 
                      uniqueKey="id"
                      ref={(component) => { this._multiSelect_T_EVAL_CONABIO = component }}
                      onSelectedItemsChange={this.onSelectedT_EVAL_CONABIOChange}
                      selectedItems={selected_T_EVAL_CONABIO}
                      iconSearch="No"
                      //onToggleList={this.updateFilters}
                      selectText="- - Selecciona - -"
                      searchInputPlaceholderText="Buscar..."
                      onChangeInput={ (text)=> console.log(text)}
                      altFontFamily={Fonts.family.base}
                      tagRemoveIconColor={Colors.green}
                      tagBorderColor={Colors.green}
                      tagTextColor={Colors.blue}
                      selectedItemTextColor={Colors.blue}
                      selectedItemIconColor={Colors.green}
                      itemTextColor={Colors.gray}
                      displayKey="name"
                      
                      submitButtonColor={Colors.green}
                      submitButtonText="Listo"
                      fontFamily={Fonts.family.base}
                      itemFontFamily={Fonts.family.base}
                      itemFontSize={Fonts.size.h4}
                      fontSize={Fonts.size.small}
                      
                    />
                  </View>
                  <View style={styles.tabLine}/>
                  
                  <Text style={styles.title_flat}>USO</Text>
                  <View style={styles.flat_multiSelect}>
                    <MultiSelect
                      items={T_USO} 
                      uniqueKey="id"
                      ref={(component) => { this._multiSelect_T_USO = component }}
                      onSelectedItemsChange={this.onSelectedT_USOChange}
                      selectedItems={selected_T_USO}
                      iconSearch="No"
                      //onToggleList={this.updateFilters}
                      selectText="- - Selecciona - -"
                      searchInputPlaceholderText="Buscar..."
                      onChangeInput={ (text)=> console.log(text)}
                      altFontFamily={Fonts.family.base}
                      tagRemoveIconColor={Colors.green}
                      tagBorderColor={Colors.green}
                      tagTextColor={Colors.blue}
                      selectedItemTextColor={Colors.blue}
                      selectedItemIconColor={Colors.green}
                      itemTextColor={Colors.gray}
                      displayKey="name"
                      
                      submitButtonColor={Colors.green}
                      submitButtonText="Listo"
                      fontFamily={Fonts.family.base}
                      itemFontFamily={Fonts.family.base}
                      itemFontSize={Fonts.size.h4}
                      fontSize={Fonts.size.small}
                      
                    />
                  </View>
                  <View style={styles.tabLine}/>

                  <Text style={styles.title_flat}>Forma de crecimiento (plantas)</Text>
                  <View style={styles.flat_multiSelect}>
                    <MultiSelect
                      items={T_FORMA_CRECIMIENTO} 
                      uniqueKey="id"
                      ref={(component) => { this._multiSelect_T_FORMA_CRECIMIENTO = component }}
                      onSelectedItemsChange={this.onSelectedT_FORMA_CRECIMIENTOChange}
                      selectedItems={selected_T_FORMA_CRECIMIENTO}
                      iconSearch="No"
                      //onToggleList={this.updateFilters}
                      selectText="- - Selecciona - -"
                      searchInputPlaceholderText="Buscar..."
                      onChangeInput={ (text)=> console.log(text)}
                      altFontFamily={Fonts.family.base}
                      tagRemoveIconColor={Colors.green}
                      tagBorderColor={Colors.green}
                      tagTextColor={Colors.blue}
                      selectedItemTextColor={Colors.blue}
                      selectedItemIconColor={Colors.green}
                      itemTextColor={Colors.gray}
                      displayKey="name"
                      
                      submitButtonColor={Colors.green}
                      submitButtonText="Listo"
                      fontFamily={Fonts.family.base}
                      itemFontFamily={Fonts.family.base}
                      itemFontSize={Fonts.size.h4}
                      fontSize={Fonts.size.small}
                      
                    />
                  </View>
                  <View style={styles.tabLine}/>

                  <Text style={styles.title_flat}>Ambiente</Text>
                  <View style={styles.flat_multiSelect}>
                    <MultiSelect
                      items={T_AMBIENTE}
                      uniqueKey="id"
                      ref={(component) => { this._multiSelect_T_AMBIENTE = component }}
                      onSelectedItemsChange={this.onSelectedT_AMBIENTEChange}
                      selectedItems={selected_T_AMBIENTE}
                      iconSearch="No"
                      //onToggleList={this.updateFilters}
                      selectText="- - Selecciona - -"
                      searchInputPlaceholderText="Buscar..."
                      onChangeInput={ (text)=> console.log(text)}
                      altFontFamily={Fonts.family.base}
                      tagRemoveIconColor={Colors.green}
                      tagBorderColor={Colors.green}
                      tagTextColor={Colors.blue}
                      selectedItemTextColor={Colors.blue}
                      selectedItemIconColor={Colors.green}
                      itemTextColor={Colors.gray}
                      displayKey="name"
                      
                      submitButtonColor={Colors.green}
                      submitButtonText="Listo"
                      fontFamily={Fonts.family.base}
                      itemFontFamily={Fonts.family.base}
                      itemFontSize={Fonts.size.h4}
                      fontSize={Fonts.size.small}
                    />
                  </View>
                  <View style={styles.tabLine}/>

                  <View style={styles.bottomButtons}>
                    <TouchableOpacity style={styles.dialogButton} onPress={this.clearSelectedCategories}>
                        <Icon2 name="trash" color='white' style={styles.dialogButtonIcon} />
                        <Text style={styles.title}>Borrar Filtros</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.dialogButton2} onPress={this.closeDialog}>
                        <Icon2 name="check" color='white' style={styles.dialogButtonIcon} />
                        <Text style={styles.title}>Aplicar</Text>
                    </TouchableOpacity>
                  </View>

              </ScrollView>
            </DialogContent>
          </Dialog>

        <Dialog
          onDismiss={() => {
            this.setState({ filtershow: false });
          }}
          containerStyle={ styles.navBarDialog }
          width={0.9}
          visible={this.state.filtershow}
          rounded
          onTouchOutside={() => {
            this.setState({ filtershow: false });
          }}
          actionsBordered
        >
          <DialogContent style={styles.content}>
            <ScrollView>
              <Text style={styles.title_flat}>Grupos de animales</Text>
              <FlatList
                data={global.ListAnimales}
                renderItem={({ item }) => (
                  <View style={item.selected ? styles.columnSelect : styles.column }>
                    <TouchableOpacity onPress={() => {this.handlePress(item.id, 2)}}>
                      <Image style={styles.imageIconFilter} source={{ uri: item.icon }} />
                      <Text style={styles.view_text}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                numColumns={4}
                keyExtractor={(item, index) => index}
              />
              <View style={styles.tabLine} />
              <Text style={styles.title_flat}>Grupos de plantas</Text>
              <FlatList
                data={global.ListPlantas}
                renderItem={({ item }) => (
                  <View style={item.selected ? styles.columnSelect : styles.column }>
                    <TouchableOpacity onPress={() => {this.handlePress(item.id, 3)}}>
                      <Image style={styles.imageIconFilter} source={{ uri: item.icon }} />
                      <Text style={styles.view_text}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                numColumns={4}
                keyExtractor={(item, index) => index}
              />
              <View style={styles.tabLine}/>
            </ScrollView>
          </DialogContent>
        </Dialog>
                  
        </View>
      );
  }
}

//make this component available to the app
export default withNavigation(NavBar);