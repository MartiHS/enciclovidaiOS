//import liraries
import React from 'react';
import { Share, View, Text, TouchableOpacity, FlatList, Image, ScrollView, Alert, BackHandler, Linking, StatusBar } from 'react-native';
import { withNavigation } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/SimpleLineIcons';


import Dialog, { DialogContent } from 'react-native-popup-dialog';
import styles from "./Styles/NavBarStyle";
import stylesAUCOM from "../Components/Styles/HomeScreenStyles";
import stylesByL from "../Components/Styles/FindByLocationStyles";


import MultiSelect from 'react-native-multiple-select';
import { Colors, Fonts } from '../Theme';
import Autocomplete from 'react-native-autocomplete-input';
import Constants from '../Config/Constants';
import DialogInput from 'react-native-dialog-input';

import Listas from '../Config/Listas';

import { CustomAppIcon } from '../Theme/Fonts/Custom.App.Icon';

var arraydata = [];

const API = 'https://api.enciclovida.mx';

// create a component
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      filtershow: false,
      filterBYLshow: false,
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
      filtersTypeState: "Avanzada",
      dialogPDFContent: [false],
      findSpecificSp: [false, "", "", ""]
    };
    
  }

  onShare = async () => {
    if(global.sharedUrl == "NOT_FOUND"  || global.sharedUrl == '' || global.sharedUrl == undefined)
      Alert("Debe seleccionar al menos un filtro");
    else{
      try {
        const result = await Share.share({
          message: global.sharedUrl
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  displayDrawerMenu = () => {
    const {navigation} = this.props;
    navigation.openDrawer();
    this.setState({dialog: false});
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

  showFilterBYLDialog = () => {
    if(this.state.filterBYLshow)
      this.setState({filterBYLshow: false});
    else
      this.setState({filterBYLshow: true});
  };


  renderLeftButton = () => { 
    const { menuLightButton} = this.props;
    const iconColor= menuLightButton? "#304E5B" : "#FFF";
    return(
      <TouchableOpacity style={styles.touchmenu} onPress={this.displayDrawerMenu}>
        <Icon name="menu" size={25} color={iconColor} style={styles.faviconmenu} />
      </TouchableOpacity>
    ) 
    };

  renderRightButton = () => {
    let params = this.props.navigation.state;
    const { infoButton, filterButton, imageButton } = this.props;
    const { menuLightButton} = this.props;
    const iconColor= menuLightButton? "#304E5B" : "#FFF";
    if(infoButton){
      return(
        <TouchableOpacity onPress={this.showSpecieInfo} >
          <Icon4 name="options-vertical" size={25} color={iconColor} style={[styles.favIcon]} />
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
      if(params.routeName == "SpeciesByLocation") {
        return(
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{paddingRight: 10, paddingLeft: 5}} onPress={this.showFilterBYLDialog} >
              <CustomAppIcon name="region" style={styles.favIcon2}></CustomAppIcon>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={this.showFilterDialog} >
              <CustomAppIcon name="avanzada" style={styles.favIcon2}></CustomAppIcon>
            </TouchableOpacity>
          </View>
        );
      } else {
        return(
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{}} onPress={this.showFilterDialog} >
              <CustomAppIcon name="avanzada" style={styles.favIcon2}></CustomAppIcon>
            </TouchableOpacity>
          </View>
        );
      }
    }
  };

  // Limpia los filtros locales
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
      var found = Listas.InfoArray.find(function(element) {
        return element.id == item[propNameToEvaluate];
      });
      if(found)
        return {
          id: found.id, 
          isLast: false, 
          name: found.name, 
          icon: found.icon, 
          iconFont: found.iconFont, 
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
      let query = `${API}/v2/especies/${id_especie}`;
      console.log(query);

      fetch(query).then(res => { // Recuperar el # de especies
        this.setState({sharedSpec: res.headers.get('shared-url')});
        global.sharedUrl = res.headers.get('shared-url');
        return res;
      }).then(res => res.json()).then(json => {

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

        console.log("Se actualiza: ");
        console.log(json.e_foto_principal);
        global.defaultPhoto2 = json.e_foto_principal;
        this.setState({ data: arraydata });
      }).catch(error => {
        console.log("ERROR");
        console.log(error);
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

  handlePressONSpec(item) {
    console.log("\n\n**Nueva seleccion\n\n");
    console.log(item);
    let currentSelected = [];
    currentSelected[0] = true;
    currentSelected[1] = item.foto ? item.foto : 'ic_imagen_not_found';
    currentSelected[2] = item.nombre_comun;
    currentSelected[3] = item.nombre_cientifico;
    currentSelected[4] = item.id;
    
    this.setState({ 
      query: "",
      data : [],
      findSpecificSp: currentSelected,
    });

    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
    
  }

  updatevisible = (id) => {
    let reino, animal, planta;
    reino=animal=planta=[];
    let filterArray=(item)=>{
      item.selected = item.id == id;
      return item;
    }

    animal = global.ListAnimales.map(filterArray);
    planta = global.ListPlantas.map(filterArray);
    
    global.ListAnimales = animal;
    global.ListPlantas = planta;
  };

  clear = () => {
    let restartSelectedItem=(item)=>{
      item.selected = false;
      return item;
    };

    var animal = global.ListAnimales.map(restartSelectedItem);
    var planta = global.ListPlantas.map(restartSelectedItem);

    global.ListAnimales = animal;
    global.ListPlantas = planta;
  };

  renderItem = ({ last, title, content, icon, iconFont }) => {
    console.log(title);
    console.log(content);
    console.log(icon);
    return(
      <View>
        <Text style={styles.items}>{title}</Text>
        <Text style={[styles.items, styles.itemsdetails]}>{content}</Text>
        {!last && <View style={styles.tabLine} />}
        <View style={[styles.image, last ? styles.imagelast : null ]}>
          <CustomAppIcon name={iconFont} style={[styles.iconImage, { color: Colors[iconFont] }]}></CustomAppIcon>  
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
    });
  }
  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  clearSelectedCategories = () => {

    if(this.state.filtersTypeState == "Avanzada" ){
      this._multiSelect_T_AMBIENTE._removeAllItems();
      this._multiSelect_T_FORMA_CRECIMIENTO._removeAllItems();
      this._multiSelect_T_USO._removeAllItems();
      this._multiSelect_T_EVAL_CONABIO._removeAllItems();
      this._multiSelect_T_CITES._removeAllItems();
      this._multiSelect_T_IUCN._removeAllItems();
      this._multiSelect_T_NOM_059._removeAllItems();
      this._multiSelect_T_DISTRIBUCION._removeAllItems();
      this.clear();
      this.setState({ selected_T_Group: "" });
      
    } else {
      this.setState({ findSpecificSp: [false] });  
    }

    setTimeout(
      () => {
        this.updateFilters();
      }, 100
    );
  };
  

  onHandlePressGroupChange = (id) => {
    console.log(" - - -");
    console.log(this.state.selected_T_Group);
    console.log(id);

    // Cuando se presiona el mismo grupo, se borra la selección
    if(id == this.state.selected_T_Group) {

      this.updatevisible("");
      this.setState({ selected_T_Group: "" });
      setTimeout(
        () => {
          this.updateFilters();
        }, 100
      );
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

  fetchData = async (text) => {
    this.setState({ query: text })
    // Si existe una query para llamar:
    if(text != null && text.length > 1){
        fetch(`${Constants.API_ENCICLOVIDA}/autocompleta/especies/${encodeURIComponent(text)}`)
        .then(res => res.json())
        .then((json) => {
            arraydata = [];
            if(!json.error){
                Constants.RESULT_CATEGORIES.forEach( category => {
                    Array.prototype.push.apply(
                        arraydata, 
                        json.results[category].filter(item=> item.data.publico)
                    )
                });
            }
            this.setState({ data: arraydata.slice() });
        }).catch((error) => {

        });
    } else {
        this.setState({ data : [] });
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

  findIconInListEsp(id){
    console.log("BUSCAR FILTROS  . . .. . . . . . . . .. . . . . .. " + id)
    for (const i in list) {
      let value = list[i];
      if(value['id'] == id){
        return(value)
      }
    }
    return {};
  }

  findIconInList(list, id){
    console.log("BUSCAR FILTROS  . . .. . . . . . . . .. . . . . .. " + id)
    for (const i in list) {
      let value = list[i];
      if(value['id'] == id){
        return(value)
      }
    }
    return {};
  }
  
  updateFilters = () => {
    console.log("updateFilters")
   
    let allFilters = "";
    let allIcons = [];

    if((this.state.selected_T_Group) !== "" ) { 
      allFilters += '&especie_id=' + this.state.selected_T_Group;
      if(this.state.selected_T_Group < 9) {
        allIcons.push(this.findIconInList(Listas.DataFilterReinos, this.state.selected_T_Group));
      } else if (this.state.selected_T_Group < 99999) {
        allIcons.push(this.findIconInList(Listas.DataFilterAnimales, this.state.selected_T_Group));
      } else if(this.state.selected_T_Group < 999999) {
        allIcons.push(this.findIconInList(Listas.DataFilterPlantas, this.state.selected_T_Group));
      }
    }

    if(this.state.findSpecificSp[0]) {
      allFilters += '&especie_id=' + this.state.findSpecificSp[4];
      
      allIcons.push({id:this.state.findSpecificSp[4], name: this.state.findSpecificSp[2], icon: "-"},);
    }

    //&especie_id=34460

    if((this.state.selected_T_DISTRIBUCION.length) > 0) {
      for(let item in this.state.selected_T_DISTRIBUCION) {
        allFilters += "&dist=" + this.state.selected_T_DISTRIBUCION[item];
        allIcons.push(this.findIconInList(Listas.T_DISTRIBUCION, this.state.selected_T_DISTRIBUCION[item]));
      }
    }
    // recorrer filtro:  selected_T_NOM_059,
    if((this.state.selected_T_NOM_059.length) > 0) {
      for(let item in this.state.selected_T_NOM_059) {
        allFilters += "&nom_ids=" + this.state.selected_T_NOM_059[item];
        allIcons.push(this.findIconInList(Listas.T_NOM_059, this.state.selected_T_NOM_059[item]));
      }
    }
    // recorrer filtro:  selected_T_IUCN,
    if((this.state.selected_T_IUCN.length) > 0) {
      for(let item in this.state.selected_T_IUCN) {
        allFilters += "&iucn_ids=" + this.state.selected_T_IUCN[item];
        allIcons.push(this.findIconInList(Listas.T_IUCN, this.state.selected_T_IUCN[item]));
      }
    }
    // recorrer filtro:  selected_T_CITES, 
    if((this.state.selected_T_CITES.length) > 0) {
      for(let item in this.state.selected_T_CITES) {
        allFilters += "&cites_ids=" + this.state.selected_T_CITES[item];
        allIcons.push(this.findIconInList(Listas.T_CITES, this.state.selected_T_CITES[item]));
      }
    } 
    // recorrer filtro:  selected_T_EVAL_CONABIO,
    if((this.state.selected_T_EVAL_CONABIO.length) > 0) {
      for(let item in this.state.selected_T_EVAL_CONABIO) {
        allFilters += "&ev_conabio_ids=" + this.state.selected_T_EVAL_CONABIO[item];
        allIcons.push(this.findIconInList(Listas.T_EVAL_CONABIO, this.state.selected_T_EVAL_CONABIO[item]));
      }
    } 
    // recorrer filtro:  selected_T_USO,
    if((this.state.selected_T_USO.length) > 0) {
      for(let item in this.state.selected_T_USO) {
        allFilters += "&uso=" + this.state.selected_T_USO[item];
        allIcons.push(this.findIconInList(Listas.T_USO, this.state.selected_T_USO[item]));
      }
    }
    // recorrer filtro:  selected_T_FORMA_CRECIMIENTO,
    if((this.state.selected_T_FORMA_CRECIMIENTO.length) > 0) {
      for(let item in this.state.selected_T_FORMA_CRECIMIENTO) {
        allFilters += "&forma=" + this.state.selected_T_FORMA_CRECIMIENTO[item];
        allIcons.push(this.findIconInList(Listas.T_FORMA_CRECIMIENTO, this.state.selected_T_FORMA_CRECIMIENTO[item]));
      }
    }
    // recorrer filtro:  selected_T_AMBIENTE,
    if((this.state.selected_T_AMBIENTE.length) > 0) {
      for(let item in this.state.selected_T_AMBIENTE) {
        allFilters += "&ambiente=" + this.state.selected_T_AMBIENTE[item];
        allIcons.push(this.findIconInList(Listas.T_AMBIENTE, this.state.selected_T_AMBIENTE[item]));
      }
    }

    console.log(allFilters);
    console.log(allIcons);
    
    global.filtro = global.filtro + allFilters;

    const{navigation} = this.props;
    let params = this.props.navigation.state;


    global.listSpecies = params.routeName;
    global.filtro = allFilters;
    global.filtroIcons = allIcons;
    navigation.navigate(global.listSpecies, {
      data: {},
    });
  };

  closeDialog = () => {
    this.setState({ filtershow: false });
  };

  closeDialogByL = () => {
    this.setState({ filterBYLshow: false });
  };
  
  changeFiltersType = (filterType) => {
    // Asigno el nuevo tipo de filtro
    this.setState({ filtersTypeState: filterType });
    // Limpio los filtros existentes
    setTimeout(
      () => {
        console.log(this.state.filtersTypeState);
        this.clearSelectedCategories();
      }, 100
    );
  };


  getFilterByLSPEC = () => {

    const { query } = this.state;
    const { data } = this.state;
    const { findSpecificSp } = this.state;
    return(
      <View>
        <View style={stylesAUCOM.viewIn}>
          <View style={{height:46, width: '90%'}}>
              <Icon name="search" style={stylesAUCOM.customSearchIcon} />
              <Autocomplete
                  style={stylesAUCOM.autocomplete}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputContainerStyle={stylesAUCOM.inputContainerStyle}
                  containerStyle={stylesAUCOM.autocompleteContainerIn}
                  listStyle={stylesAUCOM.listStyle}
                  data={data}
                  defaultValue={query}
                  onChangeText={text => this.fetchData(text)}
                  placeholder="Ingresa la especie"
                  keyExtractor={(item, index) => item.id.toString() }
                  renderItem={({ item }) => (
                      <TouchableOpacity 
                          onPress={() => {
                              this.handlePressONSpec(item.data);
                              this.setState({ query: "" })
                          }}>
                          <View style={stylesAUCOM.contentItem}>
                              <Image source={{ uri: item.data.foto ? item.data.foto : 'ic_imagen_not_found' }} style={stylesAUCOM.itemimage} />
                              <View style={stylesAUCOM.text_view}>
                                  <Text style={stylesAUCOM.itemText}>{item.data.nombre_comun}</Text>
                                  <Text style={stylesAUCOM.itemTextSecond}>({item.data.nombre_cientifico})</Text>
                              </View>
                          </View>
                      </TouchableOpacity>
                  )}
              />
          </View> 
          <View style={{/* borderColor: 'blue', borderWidth: 1, borderBottomEndRadius:10, borderTopEndRadius: 10, */ color: 'gray', height: 45, width: '15%'}}>
              <TouchableOpacity onPress={() => { this.setState({ query: "", data : [] })}} >
                  <Icon name="close" style={stylesAUCOM.customClearIcon} />
              </TouchableOpacity>
          </View>
        </View>
        <View style={stylesAUCOM.especieSeleccionada}>
          {
            this.state.findSpecificSp[1] ? 
            <View>
              <Text style={[styles.title_flat, {textAlign: 'left'}]}>Filtro de especie:</Text>
              <View style={stylesAUCOM.contentItem}>
                <Image source={{ uri: this.state.findSpecificSp[1]}} style={stylesAUCOM.itemimage} />
                <View style={stylesAUCOM.text_view}>
                  <Text style={stylesAUCOM.itemText}>{findSpecificSp[2]}</Text>
                  <Text style={stylesAUCOM.itemTextSecond}>({findSpecificSp[3]})</Text>
                </View>
              </View>
            </View>
            :
            <View></View>
          }
          
        </View>
      </View>
    );
  };

  getFilterByLocation = () => {

    const { query } = this.state;
    const { data } = this.state;
    
    
    return(
      <View>
        <View style={stylesAUCOM.viewIn}>
          <View style={{height:46, width: '90%'}}>
            <View style={[{height: 55, width:"100%"}]}>
              <Autocomplete
                  style={stylesByL.findBLAutocomplete}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputContainerStyle={stylesByL.inputContainerStyle}
                  containerStyle={stylesByL.autocompleteContainer}
                  listStyle={stylesByL.listStyle}
                  data={data}
                  defaultValue={query}
                  hideResults={false}
                  ref={(component) => { this._autocompleteByL = component }}
                  onChangeText={text => this.fetchDataLocations(text)}
                  placeholder="Ingresa una ubicación"
                  keyExtractor={(item, index) => item.id.toString() }
                  renderItem={({ item }) => (
                      <TouchableOpacity 
                          onPress={() => {
                              this.handlePressLocations(item);
                              this.setState({ query: "", filterBYLshow: false })
                          }}>
                          <View style={[stylesByL.contentItem]}>
                              <View style={stylesByL.text_view}>
                                  <Text style={stylesByL.itemText}>{item.data.nombre_region}</Text>
                                  <Text style={stylesByL.itemTextSecond}>({item.data.geojson.properties.tipo_region})</Text>
                              </View>
                          </View>
                      </TouchableOpacity>
                  )}
              />                  
          </View> 
          </View> 
          <View style={{/* borderColor: 'blue', borderWidth: 1, borderBottomEndRadius:10, borderTopEndRadius: 10, */ color: 'gray', height: 45, width: '15%'}}>
              <TouchableOpacity onPress={() => { this.setState({ query: "", data : [] })}} >
                  <Icon name="close" style={stylesAUCOM.customClearIcon} />
              </TouchableOpacity>
          </View>
        </View>
        <View style={stylesAUCOM.especieSeleccionada}>
          {
            this.state.findSpecificSp[1] ? 
            <View>
              <Text style={[styles.title_flat, {textAlign: 'left'}]}>Filtro de especie:</Text>
              <View style={stylesAUCOM.contentItem}>
                <Image source={{ uri: this.state.findSpecificSp[1]}} style={stylesAUCOM.itemimage} />
                <View style={stylesAUCOM.text_view}>
                  <Text style={stylesAUCOM.itemText}>{findSpecificSp[2]}</Text>
                  <Text style={stylesAUCOM.itemTextSecond}>({findSpecificSp[3]})</Text>
                </View>
              </View>
            </View>
            :
            <View></View>
          }
          
        </View>
      </View>
    );
  };

  fetchDataLocations = async (text) => {
    this.setState({ query: text })
    // Si existe una query para llamar:
    if(text != null && text.length > 1){
       console.log(`https://api.enciclovida.mx/v2/autocompleta/regiones?q=${encodeURIComponent(text)}&reg=estado&reg=municipio&reg=anp`);
        fetch(`https://api.enciclovida.mx/v2/autocompleta/regiones?q=${encodeURIComponent(text)}&reg=estado&reg=municipio&reg=anp`)
        .then(res => res.json())
        .then((json) => {
            arraydata = [];
            if(!json.error){
                Constants.RESULT_LOCATIONS.forEach( locationCategory => {
                    console.log(locationCategory);
                    Array.prototype.push.apply(
                        arraydata, json[locationCategory].filter(item => item.data)
                    )
                    console.log(json[locationCategory]);

                });
            }
            this.setState({ data: arraydata.slice() });
        }).catch((error) => {

        });
    } else {
        this.setState({ data : [] });
    }
}

  // Función encargada de la acción al presionar una ubicación
  handlePressLocations(item) {
       
    console.log("\n\n>> handlePress");
    this.setState({ query: "" })
    this.setState({ data : [] });
    
    let dataLocation = {
        region_id: item.data.region_id,
        nom_reg: item.data.nombre_region,
        tipo_region: item.data.geojson.properties.tipo_region,
    };

    const{ navigation } = this.props;
    global.listSpecies = "SpeciesByLocation";
    global.locationData = dataLocation;
    global.title = global.locationData.nom_reg + " - " + global.locationData.tipo_region;
    global.subtitle = "";

    navigation.navigate(global.listSpecies, {
        data: { 
            origen: 'ByLocation',
        },
    });

    navigation.closeDrawer();
}

  getFilterAdVANCED = () => {
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

    return(
      <View style={{paddingTop: 15}}>    
  
        <Text style={styles.title_flat}>Grupos de animales</Text>
        <FlatList
          data={global.ListAnimales}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {this.onHandlePressGroupChange(item.id)}} style={item.selected ? styles.columnSelectHo1 : styles.columnHo1 }>
              <CustomAppIcon name={item.icon} style={[styles.IconFilterHo, { color: Colors[item.icon] }]}></CustomAppIcon>
              <Text style={styles.view_text}>{item.name}</Text>
            </TouchableOpacity>
          )}
          horizontal={true}
          keyExtractor={(item, index) => index}
        />
        <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.dialogButtonInfo} >
                <Icon name="swipe" color='white' style={[styles.dialogButtonIcon, {fontSize: 18}]} />
            </TouchableOpacity>
        </View>

        <Text style={styles.title_flat}>Grupos de hongos y plantas</Text>
        <FlatList
          data={global.ListPlantas}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {this.onHandlePressGroupChange(item.id)}} style={[item.selected ? styles.columnSelectHo2 : styles.columnHo2] }>
              <CustomAppIcon name={item.icon} style={[styles.IconFilterHo, { color: Colors[item.icon] }]}></CustomAppIcon>
              <Text style={styles.view_text}>{item.name}</Text>
            </TouchableOpacity>
          )}
          horizontal={true}
          keyExtractor={(item, index) => index}
        />
        <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.dialogButtonInfo} >
                <Icon name="swipe" color='white' style={[styles.dialogButtonIcon, {fontSize: 18}]} />
            </TouchableOpacity>
        </View>
        <View style={styles.tabLine}/>

      <Text style={styles.dialogTitle}>Filtros adicionales</Text>
      <Text style={styles.title_flat}>Tipo de distribución</Text>
      <View style={styles.flat_multiSelect}>
        <MultiSelect
          items={Listas.T_DISTRIBUCION}
          uniqueKey="id"
          ref={(component) => { this._multiSelect_T_DISTRIBUCION = component }}
          onSelectedItemsChange={this.onSelectedT_DISTRIBUCIONChange}
          selectedItems={selected_T_DISTRIBUCION}
          iconSearch="No"
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
          fontFamily={Fonts.family.base_bold}
          itemFontFamily={Fonts.family.base_bold}
          itemFontSize={Fonts.size.h4}
          fontSize={Fonts.size.small}
        />
      </View>
      <View style={styles.tabLine}/>
      
      <Text style={styles.title_flat}>Especies en riesgo en México (NOM 059)</Text>
      <View style={styles.flat_multiSelect}>
        <MultiSelect
          items={Listas.T_NOM_059}
          uniqueKey="id"
          ref={(component) => { this._multiSelect_T_NOM_059 = component }}
          onSelectedItemsChange={this.onSelectedT_NOM_059Change}
          selectedItems={selected_T_NOM_059}
          iconSearch="No"
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
          fontFamily={Fonts.family.base_bold}
          itemFontFamily={Fonts.family.base_bold}
          itemFontSize={Fonts.size.h4}
          fontSize={Fonts.size.small}
        />
      </View>
      <View style={styles.tabLine}/>
      
      <Text style={styles.title_flat}>Especies en riesgo a nivel mundial (IUCN)</Text>
      <View style={styles.flat_multiSelect}>
        <MultiSelect
          items={Listas.T_IUCN}
          uniqueKey="id"
          ref={(component) => { this._multiSelect_T_IUCN = component }}
          onSelectedItemsChange={this.onSelectedT_IUCNChange}
          selectedItems={selected_T_IUCN}
          iconSearch="No"
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
          fontFamily={Fonts.family.base_bold}
          itemFontFamily={Fonts.family.base_bold}
          itemFontSize={Fonts.size.h4}
          fontSize={Fonts.size.small}
        />
      </View>
      <View style={styles.tabLine}/>
      
      <Text style={styles.title_flat}>Comercio Internacional (CITES)</Text>
      <View style={styles.flat_multiSelect}>
        <MultiSelect
          items={Listas.T_CITES}
          uniqueKey="id"
          ref={(component) => { this._multiSelect_T_CITES = component }}
          onSelectedItemsChange={this.onSelectedT_CITESChange}
          selectedItems={selected_T_CITES}
          iconSearch="No"
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
          fontFamily={Fonts.family.base_bold}
          itemFontFamily={Fonts.family.base_bold}
          itemFontSize={Fonts.size.h4}
          fontSize={Fonts.size.small}
          
        />
      </View>
      <View style={styles.tabLine}/>
      
      <Text style={styles.title_flat}>Evaluación CONABIO</Text>
      <View style={styles.flat_multiSelect}>
        <MultiSelect
          items={Listas.T_EVAL_CONABIO} 
          uniqueKey="id"
          ref={(component) => { this._multiSelect_T_EVAL_CONABIO = component }}
          onSelectedItemsChange={this.onSelectedT_EVAL_CONABIOChange}
          selectedItems={selected_T_EVAL_CONABIO}
          iconSearch="No"
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
          fontFamily={Fonts.family.base_bold}
          itemFontFamily={Fonts.family.base_bold}
          itemFontSize={Fonts.size.h4}
          fontSize={Fonts.size.small}
        />
      </View>
      <View style={styles.tabLine}/>
      
      <Text style={styles.title_flat}>Uso y agrobiodiversidad</Text>
      <View style={styles.flat_multiSelect}>
        <MultiSelect
          items={Listas.T_USO} 
          uniqueKey="id"
          ref={(component) => { this._multiSelect_T_USO = component }}
          onSelectedItemsChange={this.onSelectedT_USOChange}
          selectedItems={selected_T_USO}
          iconSearch="No"
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
          fontFamily={Fonts.family.base_bold}
          itemFontFamily={Fonts.family.base_bold}
          itemFontSize={Fonts.size.h4}
          fontSize={Fonts.size.small}
        />
      </View>
      <View style={styles.tabLine}/>

      <Text style={styles.title_flat}>Forma de crecimiento (plantas)</Text>
      <View style={styles.flat_multiSelect}>
        <MultiSelect
          items={Listas.T_FORMA_CRECIMIENTO} 
          uniqueKey="id"
          ref={(component) => { this._multiSelect_T_FORMA_CRECIMIENTO = component }}
          onSelectedItemsChange={this.onSelectedT_FORMA_CRECIMIENTOChange}
          selectedItems={selected_T_FORMA_CRECIMIENTO}
          iconSearch="No"
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
          fontFamily={Fonts.family.base_bold}
          itemFontFamily={Fonts.family.base_bold}
          itemFontSize={Fonts.size.h4}
          fontSize={Fonts.size.small}
        />
      </View>
      <View style={styles.tabLine}/>

      <Text style={styles.title_flat}>Ambiente</Text>
      <View style={styles.flat_multiSelect}>
        <MultiSelect
          items={Listas.T_AMBIENTE}
          uniqueKey="id"
          ref={(component) => { this._multiSelect_T_AMBIENTE = component }}
          onSelectedItemsChange={this.onSelectedT_AMBIENTEChange}
          selectedItems={selected_T_AMBIENTE}
          iconSearch="No"
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
          fontFamily={Fonts.family.base_bold}
          itemFontFamily={Fonts.family.base_bold}
          itemFontSize={Fonts.size.h4}
          fontSize={Fonts.size.small}
        />
      </View>
      
    </View>)
  }
  

  sendPFDTOUser = (tipoReq) => {

    console.log("sendPFDTOUser");
    
    let contentDialog = [false];
    
    // Pos ahora siempre entrará aquí
    if(tipoReq == "Guia") {

      // 1. Verificar que sea un Municipio / ANP
      if((global.title).includes("Municipio") || (global.title).includes("ANP")) {
        // 2. Tener al menos un grupo seleccionado 
        if((this.state.selected_T_Group) !== "" ) { 

          contentDialog[0] = true;
          contentDialog[1] = "Descarga la guía en PDF";
          //contentDialog[2] = "Hay que seleccionar al menos un filtro";
          contentDialog[2] = "Toma en cuenta que entre más especies sean podría tardar más en generarlo, se te enviará un correo cuando se genere el PDF.";
 
        } else {
          contentDialog[0] = false;
          contentDialog[2] = "Se requiere seleccionar al menos un filtro";
        }
      } else {
        contentDialog[0] = false;
        contentDialog[2] = "No válido para Estado";
      }
    } 

    // Verificar si cumple con los requisitos, si si, mostrar el acceso a ingresar correo:
    if(contentDialog[0]) {
      this.setState({ dialogPDFContent: contentDialog });
    } else {
      Alert.alert(contentDialog[2]);
    }
  };

  closeDialogPDF = (action) => {
    const contentDialog = [action];
    this.setState({ dialogPDFContent: contentDialog });
  };

  sendInputTOPDF = async (email) => {
    // Ocultamos el dialogo
    this.setState({ dialogPDFContent: [false] });
    const ccEmail = email.replace(" ", "");
    // Verificamos que el correo sea correcto:

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    if(!validateEmail(ccEmail)) {
      
      Alert.alert("Asegurate de ingresar un correo válido");

    } else {

      const location = global.locationData;

      console.log("Location data");
      console.log(location);
      console.log("Filtros:");
      console.log(global.filtro);
      
      const URLFINAL = `https://api.enciclovida.mx/v2/especies/busqueda/region?tipo_region=${encodeURIComponent(location.tipo_region.toLowerCase())}&region_id=${encodeURIComponent(location.region_id)}${global.filtro}&guia=true&correo=${encodeURIComponent(ccEmail)}&pagina=1&por_pagina=50`
      
      console.log(URLFINAL);
  
      fetch(URLFINAL).then(res => res.json()).then((json) => {
  
        try {
          const res = json;
          console.log("RESPUESTA:");
          console.log(res);
          if(res.estatus == true) {
            Alert.alert("¡La petición se envió correctamente!.");
          } else {
            Alert.alert(res.msg);
          }
        } catch(e) {
  
        }

      }).catch(error => {
  
      });
    }
  }

  render() {
    const { transparent, white } = this.props;
    const title= this.state.title;
    const subtitle=this.state.subtitle;
    const filtersTypeState=this.state.filtersTypeState
    const dialogPDFContent = this.state.dialogPDFContent
    return (
      <View {...this.props} style={[styles.navBar, transparent ? styles.transparent : null, white ? styles.navBarWhite : null]}>
        <View style={[styles.leftContainer]}>{this.renderLeftButton()}</View>
        <View style={[styles.titleWrapper]}>
          <Text style={[styles.title, title != null && title.length > 40 ? styles.title_small : null]}>{title}</Text>
            {subtitle != "" && <Text style={[ styles.subtitle]}>{subtitle}</Text> }
        </View>
        <View style={[{paddingRight: 15}]}>{this.renderRightButton()}</View>
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
                          this.renderItem({last: item.isLast, title: item.title, content: item.name, icon: item.icon, iconFont: item.iconFont})
                        )}
                    />
                    <Text/>
                    <TouchableOpacity style={[styles.dialogButton2, {width: '100%'}]} onPress={this.onShare}>
                      <Icon3 name="share" color='white' style={[styles.dialogButtonIcon, {fontSize: 15}]} />
                      <Text style={styles.title}>Compartir especie</Text>
                    </TouchableOpacity>
                </DialogContent>
          </Dialog>
          <Dialog
            onDismiss={() => {
              this.setState({ filtershow: false });
            }}
            containerStyle={ styles.navBarDialog }
            width={0.80}
            visible={this.state.filtershow}
            rounded
            onTouchOutside={() => {
              this.setState({ filtershow: false });
            }}
            actionsBordered 
          > 
            <DialogContent style={styles.content}>
              
              <ScrollView>

              <View style={styles.upButtons}>
                  <View>
                    <TouchableOpacity style={styles.dialogButton3} onPress={this.closeDialog}>
                        <Icon2 name="close-a" color='white' style={styles.dialogButtonIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: "row", width: "100%", paddingLeft: 10, justifyContent: 'flex-start',}}>
                    <TouchableOpacity style={[styles.dialogLeft, {backgroundColor:Colors.green}]}  onPress={()=>{this.changeFiltersType('Avanzada')}}>
                      <Icon2 name="search" color='white' style={styles.dialogButtonIcon} />
                      <Text style={[styles.title_flat, {color: 'white'}]}>Avanzada</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dialogRight, {backgroundColor:Colors.blue}]} onPress={()=>{this.changeFiltersType('XEspecie')}}>
                      <CustomAppIcon name="animalia" color='white' style={styles.dialogButtonIcon} />
                      <Text style={[styles.title_flat, {color: 'white'}]}>Por especie</Text>
                    </TouchableOpacity>
                  </View>
              </View>

              <View style={styles.tabSpace}/>

              {
                filtersTypeState == "Avanzada" ? this.getFilterAdVANCED() : this.getFilterByLSPEC()
              } 

              <View style={styles.tabLine}/>

              <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.dialogButton2} onPress={this.closeDialog}>
                    <Icon2 name="check" color='white' style={styles.dialogButtonIcon} />
                    <Text style={styles.title}>Aplicar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dialogButton} onPress={this.clearSelectedCategories}>
                    <Icon2 name="trash" color='white' style={styles.dialogButtonIcon} />
                    <Text style={styles.title}>Borrar Filtros</Text>
                </TouchableOpacity>
              </View>
              </ScrollView>
            </DialogContent>
        </Dialog>


        <Dialog
            onDismiss={() => {
              this.setState({ filterBYLshow: false });
            }}
            containerStyle={ styles.navBarDialog }
            width={0.80}
            visible={this.state.filterBYLshow}
            rounded
            onTouchOutside={() => {
              this.setState({ filterBYLshow: false });
            }}
            actionsBordered 
          > 
            <DialogContent style={styles.content}>
              
              <ScrollView>

              <View style={styles.upButtons}>
                  <View>
                    <TouchableOpacity style={styles.dialogButton3} onPress={this.closeDialogByL}>
                        <Icon2 name="close-a" color='white' style={styles.dialogButtonIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: "row", width: "100%", paddingLeft: 10, justifyContent: 'flex-start',}}>
                    <TouchableOpacity style={[styles.dialogRounded, {backgroundColor:Colors.blue}]} onPress={()=>{this.changeFiltersType('XEspecie')}}>
                      <CustomAppIcon name="region" color='white' style={styles.dialogButtonIcon} />
                      <Text style={[styles.title_flat, {color: 'white'}]}>Buscar por region</Text>
                    </TouchableOpacity>
                  </View>
              </View>

              <View style={styles.tabSpace}/>

              {
                 this.getFilterByLocation()
              } 

              <View style={styles.tabLine}/>
              </ScrollView>
            </DialogContent>
        </Dialog>
        
        <DialogInput isDialogVisible={dialogPDFContent[0]}
          title={dialogPDFContent[1]}
          message={dialogPDFContent[2]}
          dialogStyle={{backgroundColor: Colors.white}}
          hintInput ={"Ingresa tu correo electrónico"}
          submitInput={ (inputText) => {this.sendInputTOPDF(inputText)} }
          closeDialog={ () => {this.closeDialogPDF(false)}}
          submitText="Enviar!"
          cancelText="Cerrar"
        >
        </DialogInput>
          
        </View>
      );
  }
}

//make this component available to the app
export default withNavigation(NavBar);



