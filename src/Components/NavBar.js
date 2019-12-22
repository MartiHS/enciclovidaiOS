//import liraries
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, Alert, BackHandler, Linking } from 'react-native';
import { createIconSetFromFontello } from "react-native-vector-icons";
import { withNavigation } from "react-navigation";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import styles from "./Styles/NavBarStyle";
import config from "../Theme/Fonts/config";

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

const API = 'http://api.enciclovida.mx';

// create a component
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      filtershow: false,
      data: [],
      id_tmp: 0,
      title:"",
      subtitle:""
    };
  }

  displayDrawerMenu = () => {
    const {navigation} = this.props;
    navigation.openDrawer();
    this.setState({dialog: false ,filtershow: false});
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

  renderLeftButton = () => {
    const { menuLightButton} = this.props;
    const iconColor= menuLightButton? "#304E5B" : "#FFF";
    return(
      <TouchableOpacity style={styles.touchmenu} onPress={this.displayDrawerMenu}>
        <CustomIcon name="menu" size={25} color={iconColor} style={styles.faviconmenu} />
      </TouchableOpacity>
    ) 
    };

  renderRightButton = () => {
    const { infoButton, filterButton, imageButton } = this.props;
    if(infoButton){
      return(
        <TouchableOpacity onPress={this.showSpecieInfo} style={{backgroundColor:"#fff", borderRadius:15, padding:1}} >
          <CustomIcon name="new_info" size={30} color="#000" style={[styles.favIcon,]}></CustomIcon>
        </TouchableOpacity>
      )
    }
    else if(imageButton){
      return(
        <TouchableOpacity onPress={() => Linking.openURL('http://enciclovida.mx/')}>
          <CustomIcon name="enciclovida" size={30} color="#FFF" style={styles.favIcon} />
        </TouchableOpacity>
      )
    }
    else if(filterButton){
      return(
        <TouchableOpacity onPress={this.showFilterDialog} style={{backgroundColor:"#fff", borderRadius:15, padding:1}}>
          <CustomIcon name="new_filter" size={30} color="#000" style={styles.favIcon}></CustomIcon>
        </TouchableOpacity>
      )
    }
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
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPressNav);
    if(global.LastlistSpecies != global.listSpecies){
      global.LastlistSpecies = global.listSpecies;
      this.clear();
    }
    this.setState({title: global.title, subtitle: global.subtitle});
  }

  componentWillReceiveProps = () => {
    
    this.getSpecieInfo(global.id_specie);
    if(global.LastlistSpecies != global.listSpecies){
      global.LastlistSpecies = global.listSpecies;
      this.clear();
    }
    this.setState({title: global.title, subtitle: global.subtitle});
    
  };

  handleBackPressNav = () => {
    this.setState({
      dialog: false,
      filtershow: false,
    });
  }

  render() {
    const { transparent, white } = this.props;
    const title= this.state.title;
    const subtitle=this.state.subtitle;
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