//import liraries
import React, { Component } from 'react';
import {View, FlatList, Image, Alert, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import NavBar from '../Components/NavBar';
import styles from "../Components/Styles/ListSpeciesScreenStyles";
import Constants from '../Config/Constants';



var arraydata = [];
// create a component
class ListSpeciesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      total: 1,
      loadingMore: false,
      refreshing: false,
    };
  }
  
  fetchSpeciesByLocation = async (location) => { 
    this.setState({ spinner: true, refreshing: false, loadingMore: false });
    console.log("------------------");
    this.setState({ query: "text" })
    // Si existe una query para llamar:
    if(location != null){
        console.log(`https://api.enciclovida.mx/v2/especies/busqueda/region?tipo_region=${encodeURIComponent(location.tipo_region.toLowerCase())}&region_id=${encodeURIComponent(location.region_id)}`);
        fetch(`https://api.enciclovida.mx/v2/especies/busqueda/region?tipo_region=${encodeURIComponent(location.tipo_region.toLowerCase())}&region_id=${encodeURIComponent(location.region_id)}`)
        .then(res => res.json())
        .then((json) => {
            try {
              console.log("-----------------sss-");
                const result = json.map(item => {
                  return {
                    id: item.especie.IdNombre,
                    imagen: item.especie.foto_principal,
                    title: item.especie.nombre_comun_principal,
                    subtitle: item.especie.NombreCompleto
                  };
                });


                var entries = json.x_total_entries;
                var len = json.length;
                var totpage = 0;
                var limit = 7;
                if (len == limit) {
                  totpage = entries / len | 0;
                  var exact = json.x_total_entries % json.length;
                  if (exact != 0) {
                    totpage = totpage;
                  } else {
                    totpage = totpage + 1;
                  }
                }
                //Alert.alert("Total", json.x_total_entries.toString());
                this.setState({ data: result, spinner: false, page: 1, total: totpage, loadingMore: entries > limit ? true : false });
                console.log("------------------FIN");
              } catch (e) {
                this.setState({ spinner: false });
                console.log(e);
                Alert.alert("Error en los datos");
              }

        }).catch((error) => {
            console.log("------------------");
        });
    } else {
      console.log("------------------ NOOO");
        this.setState({ data: [] });
    }
  }


  getSpeciesInfo = async (filter) => {
    this.setState({ spinner: true, refreshing: false, loadingMore: false });

    if (filter != "") {
      //console.log("ListSpeciesScreen:", `${Constants.API_ENCICLOVIDA}/especies/busqueda/avanzada?nivel=%3D${filter}`);
      fetch(`${Constants.API_ENCICLOVIDA}/especies/busqueda/avanzada?nivel=%3D${filter}`)
        .then(res => res.json())
        .then((json) => {
          try {
            const result = json.taxa.map(item => {
              return {
                id: item.IdNombre,
                imagen: item.foto_principal,
                title: item.nombre_comun_principal,
                subtitle: item.NombreCompleto
              };
            });

            var entries = json.x_total_entries;
            var len = json.taxa.length;
            var totpage = 0;
            var limit = 50;
            if (len == limit) {
              totpage = entries / len | 0;
              var exact = json.x_total_entries % json.taxa.length;
              if (exact != 0) {
                totpage = totpage;
              } else {
                totpage = totpage + 1;
              }
            }
            //Alert.alert("Total", json.x_total_entries.toString());
            this.setState({ data: result, spinner: false, page: 1, total: totpage, loadingMore: entries > limit ? true : false });
          } catch (e) {
            this.setState({ spinner: false });
            Alert.alert("Error en los datos");
          }
        }).catch(error => {
          this.setState({ spinner: false });
        });
    } else {
      this.setState({ spinner: false });
    }
  }

  loadmore = async () => {
    this.setState({
      spinner: true
    });
    const filter = global.filtro;
    const page = this.state.page;
    //console.log("Se cargarán más...");
    if (filter != "") {
      fetch(`${Constants.API_ENCICLOVIDA}/especies/busqueda/avanzada?nivel=%3D${filter}&pagina=${page}`).then(res => res.json()).then((json) => {
        arraydata = [];
        const result = json.taxa.map(data => {
          return {
            id: data.IdNombre,
            imagen: data.foto_principal,
            title: data.nombre_comun_principal,
            subtitle: data.NombreCompleto
          };
        });
        Array.prototype.push.apply(arraydata, this.state.data);
        Array.prototype.push.apply(arraydata, result);
        this.setState({
          data: arraydata,
          spinner: false
        });
      }).catch(error => {
        this.setState({
          spinner: false
        });
      });
    } else {
      this.setState({
        spinner: false
      });
    }
  }

  renderFooter() {
    if (this.state.loadingMore) {
      return (
        <View style={styles.footer} >
          <TouchableOpacity activeOpacity={0.9} style={styles.btnfooter} >
            <Text style={styles.textfooter} > Cargar Pagina {this.state.page} de {this.state.total} </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.footer} />
      );
    }
  }

  _listEmptyComponent = () => {
    return (
      <View style={styles.empty_text} >
        <Text > No hay resultados </Text>
      </View>
    )
  }

  viewDetails = (id, nombre_comun, nombre_cientifico) => {
    global.id_specie = id;
    global.title = nombre_comun;
    global.subtitle = nombre_cientifico;
    global.classificationList = [];
    this.props.navigation.navigate("About", {});
  };

  handlePress = (item) => {
    //console.log("handlePress:", item);
    this.viewDetails(item.id, item.title, item.subtitle)
  }

  _handleLoadMore = () => {
    if (this.state.page <= this.state.total && !this.state.spinner) {
      this.setState(
        (prevState, nextProps) => ({
          page: this.state.page + 1,
          loadingMore: this.state.page < this.state.total ? true : false
        }),
        () => {
          this.loadmore();
        }
      );
    }
  };

  _handleRefresh = () => {

    console.log("\n\n - - _handleRefresh - - \n\n");


    this.setState({
      page: 1,
      refreshing: true
    },
      () => {
        this.setState({
          data: []
        });
        

        let params = this.props.navigation.state;
    
        console.log(params.routeName); 
    
        if(params.routeName == "SpeciesByLocation"){
          console.log(" - - SpeciesByLocation"); 
          let locationData = params.params.data.location;
    
          global.title = locationData.nom_reg;  
          global.subtitle = locationData.tipo_region;
    
          this.fetchSpeciesByLocation(locationData);
          
        } else { // Si no, hacer búsqueda normal
          this.getSpeciesInfo(global.filtro);
        }

      }
    );
  };

  UNSAFE_componentWillReceiveProps = () => {
    console.log("Cargar datosddd 1");
    console.log("\n\n - - UNSAFE_componentWillReceiveProps desde ListSpeciesScreen- - \n\n");
    this._handleRefresh();
  };

  componentDidMount = () => {
    this.setState({
      data: []
    });

    console.log("Cargar datosddd 2 "); 
    
   


    // -- Inicio de la vista, leer el origen si viene desde la ubicación: realizar busquedas por ubicación
    let params = this.props.navigation.state;
    
    console.log(params.routeName); 

    if(params.routeName == "SpeciesByLocation"){
      console.log(" - - SpeciesByLocation"); 
      let locationData = params.params.data.location;

      global.title = locationData.nom_reg;  
      global.subtitle = locationData.tipo_region;

      this.fetchSpeciesByLocation(locationData);
      
    } else { // Si no, hacer búsqueda normal
      this.getSpeciesInfo(global.filtro);
    }
    
  };

  render() {
    let params = this.props.navigation.state;
    let filterButton, filterButtonByL;

    if(params.routeName == "SpeciesByLocation"){
      filterButtonByL = true;
      filterButton= false;
    } else { // Si no, hacer búsqueda normal
      filterButtonByL = false;
      filterButton= true;
    }


    return (
      <View style={[styles.MainContainer]} >
        <NavBar menuBlackButton={true} filterButton={filterButton} filterButtonByL={filterButtonByL} />
        <View style={styles.container}>
          <Spinner visible={this.state.spinner} textContent={'Cargando...'} textStyle={{ color: '#FFF' }} />
          <FlatList
            style = {styles.flatList} 
            data={this.state.data}
            extraData={this.state}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={this._listEmptyComponent}
            ListFooterComponent={this.renderFooter.bind(this)}
            renderItem={({ item, index }) => (

              <View style={styles.listItem}>
                <TouchableOpacity style={styles.touchableItem} onPress={() => { this.handlePress(item) }} >
                  <Image source={{ uri: item.imagen ? item.imagen : 'ic_imagen_not_found_small' }} style={styles.imageItem} />
                  <View style={styles.textRow}>
                    <Text style={styles.titleRow}>{item.title}</Text>
                    <Text>{item.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            numColumns={1}
            onEndReached = {this._handleLoadMore}
            onEndReachedThreshold = {0.1}
            initialNumToRender = {50}
            onRefresh = {this._handleRefresh}
            refreshing = {this.state.refreshing}
          />

        </View>
      </View>
    );
  }
}

//make this component available to the app
export default withNavigation(ListSpeciesScreen);