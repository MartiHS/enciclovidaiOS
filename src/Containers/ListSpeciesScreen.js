//import liraries
import React, { Component } from 'react';
import {View, FlatList, Image, Alert, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import NavBar from '../Components/NavBar';
import styles from "../Components/Styles/ListSpeciesScreenStyles";
import Constants from '../Config/Constants';
import {Colors, Fonts} from "../Theme/";

import { createIconSetFromFontello } from "react-native-vector-icons";
import config from "../Theme/Fonts/config";
const CustomIcon = createIconSetFromFontello(config);

var arraydata = [];
// create a component
class ListSpeciesScreen extends Component {

  constructor(props) {
    super(props);
    global.filtroIcons = "";
    global.filtro = "";
    this.state = {
      data: [],
      page: 1,
      total: 1,
      loadingMore: false,
      refreshing: false,
    };
  }


  getSpecieIcons = async (nameSpecie) => {
    
    return new Promise((resolve, reject) => { 
      
      const queryIcon = `https://api.enciclovida.mx/v2/autocompleta/especies?q=${encodeURIComponent(nameSpecie)}&cat_principales=false&cat=especie`;
      
      console.log("\n\n:::: > > GET ICONS < < ::::");
      console.log("\n\n:::: > > SE LLAMARÁ A QUERY: " + queryIcon);
      fetch(queryIcon).then(res => res.json()).then((json) => {
        console.log("Entro a RESPUESTA para hacer cosas");
        let lIcons = json.especie[0].data.cons_amb_dist
        let listaFinalIcons = [];

        for (let clave in lIcons){
          listaFinalIcons.push({"name": clave});
        }
        
        //console.log(listaFinalIcons);
        console.log(": : : : > > > >  FIN GET ICONS < < < < : : : :\n\n");
        resolve(listaFinalIcons);
        
      }).catch(error => {
        console.log(error)
        console.log(": : : : > > > >  FIN GET ICONS < < < < : : : :");
        resolve([]);
      });
    });
  };
  
  fetchSpeciesByLocation = async (location, filtro) => { 
    
    this.setState({ spinner: true, refreshing: false, loadingMore: false });
    console.log(":::: > > fetchSpeciesByLocation < < ::::");
    
    // SI existe una loclización activa:
    if(location != null){
        let query = `https://api.enciclovida.mx/v2/especies/busqueda/region?tipo_region=${encodeURIComponent(location.tipo_region.toLowerCase())}&region_id=${encodeURIComponent(location.region_id)}${filtro}&pagina=1&por_pagina=10`;
        console.log(query);
        fetch(query).then(res => { // Recuperar el # de especies
          this.setState({totalRes: res.headers.get('num_especies')});
          return res;
        }).then(res => res.json()).then(json => {

/*

          return fetch(`${url}/rockets/${rocketId}`);
        })
        .then(response => response.json())
        .catch(err => {
          console.error('Request failed', err)
        })
*/ 

          
            // Intentar el manejo de resultados: 
            try {
              
                console.log("\n\n\n: : : > > > Iterar la lista de resultados obtenidos < < < : : :");
                const result = json.map(item => {
                  
                  /*
                  this.getSpecieIcons(item.especie.nombre_comun_principal).then((res)=>{
                    console.log("Recibo la respuesta de la especie: " + item.especie.nombre_comun_principal);

                      console.log("LISTO:");
                      console.log(res);    
                                        
                    }).catch((error)=>{
                        console.log(`HUBO UN ERROR ${error}`);
                    });
                  */
                  return {
                    id: item.especie.IdNombre,
                    imagen: item.especie.foto_principal,
                    title: item.especie.nombre_comun_principal,
                    subtitle: item.especie.NombreCompleto,
                    //icons: res
                  };

                });
                
                var entries = this.state.totalRes;
                var len = json.length;
                console.log(len);
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

                console.log("------------------FIN");
                //Alert.alert("Total", json.x_total_entries.toString());
                this.setState({ data: result, spinner: false, page: 1, total: totpage, loadingMore: entries > limit ? true : false });

                console.log("------------------FIN");
              } catch (e) {
                this.setState({ spinner: false });
                console.log(e);
                Alert.alert("Error en los datos");
              }

        }).catch((error) => {
          console.log(error);
            console.log("------------------");
        });
    } else {
      console.log("------------------ NOOO");
        this.setState({ data: [] });
    }
  }

  getSpeciesInfo = async (filter) => {
    console.log("--------- getSpeciesInfo ---------");
    this.setState({ spinner: true, refreshing: false, loadingMore: false });

    if (filter != "") {
      console.log("ListSpeciesScreen:", `${Constants.API_ENCICLOVIDA}/especies/busqueda/avanzada?nivel=%3D${filter}`);
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
            console.log(entries);
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
            this.setState({ data: result, totalRes: 1000, spinner: false, page: 1, total: totpage, loadingMore: entries > limit ? true : false });
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



  createHIcon(name) {
    
    let fName = name[0].toUpperCase() + name.substring(1, 3).toLowerCase();

    return(
    <View style={styles.customHIcon}>
      <Text style={styles.customHIconText}>{fName}</Text>
    </View>);
  }
  
  getSpecieIconss = async (nameSpecie) => {

      this.setState({
        iconsLoaded: false,
      });
      
      fetch(`https://api.enciclovida.mx/v2/autocompleta/especies?q=${encodeURIComponent(nameSpecie)}&cat_principales=false&cat=especie`).then(res => res.json()).then((json) => {
       
        console.log("\n\n\n\n\n\n\n\n GET ICONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ss");
        
        let lIcons = json.especie[0].data.cons_amb_dist

        let listaFinalIcons = [];
        for (let clave in lIcons){
          listaFinalIcons.push({"name": clave});
        }
        console.log(listaFinalIcons);
        console.log(">>>>>>>>>>>>>>>>>");
        
      

        this.setState({
          iconsLoaded: true,
          listIcons: listaFinalIcons
        });

      }).catch(error => {
        console.log(error)
      });
  }

  loadmoreByL = async () => {
    this.setState({
      spinner: true
    });
    const filter = global.filtro;

    //let locationData = params.params.data.location;
    //global.title = locationData.nom_reg;  
    //global.subtitle = locationData.tipo_region;
    //this.fetchSpeciesByLocation(locationData);

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
    console.log("- - handlePress"); 
    //console.log("handlePress:", item);
    this.viewDetails(item.id, item.title, item.subtitle)
  }

  _handleLoadMore = () => {
    console.log("LOAD MORE");
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
    } else {
      console.log("NO HAY MAS"); 
    }
  };

  _handleRefresh = () => {
    console.log("_handleRefresh <<<<<<<<<<")
    this.setState({
      page: 1,
      refreshing: true
    },
      () => {
        this.setState({
          data: []
        });
        
        let params = this.props.navigation.state;
    
        console.log(params); 
        
        let origen = params.data;
        if(params.routeName == "SpeciesByLocation"){
          console.log("- - BY LOCATION"); 

          // Si existe la propiedad de ubicación. actualizar el título
          if(params.params.hasOwnProperty('data') && params.params.data.hasOwnProperty('location')){
            console.log("- - NEW LOCATION"); 
            let locationData = params.params.data.location;
            global.locationData = locationData;
            global.nom_reg = locationData.nom_reg;  
            global.tipo_region = locationData.tipo_region;
            // -- 
            global.title = global.nom_reg + " - " + locationData.tipo_region;
            //global.subtitle = global.tipo_region;
            global.subtitle = "";

            console.log("- - FILTERS: "); 
            console.log(global.filtro); 
            this.fetchSpeciesByLocation(locationData, global.filtro);

          } else {
            console.log("- - NEW FILTERS, SAME LOCATION"); 
            

            // Sobre la misma ubicación, se hace un filtro

            
            console.log(global.locationData); 
            console.log(global.filtro); 

            this.fetchSpeciesByLocation(global.locationData, global.filtro);
          }
          
        } else {
            console.log("- - NACIONAL"); 
            this.getSpeciesInfo(global.filtro);
        }
        
      }
    );
  };

  UNSAFE_componentWillReceiveProps = () => {
    console.log("- - UNSAFE_componentWillReceiveProps"); 
    this._handleRefresh();
    
  };

  componentDidMount = () => {
    console.log("- - componentDidMount"); 
    this.setState({
      data: []
    });

    // -- Inicio de la vista, leer el origen si viene desde la ubicación: realizar busquedas por ubicación
    let params = this.props.navigation.state;
    if(params.routeName == "SpeciesByLocation"){
      let locationData = params.params.data.location;
      global.title = locationData.nom_reg + " - " + locationData.tipo_region;
      //global.subtitle = locationData.tipo_region;
      global.subtitle = "";
      this.fetchSpeciesByLocation(locationData, "");
    } else { // Si no, hacer búsqueda normal
      console.log("- - NACIONAL"); 
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
          <View style={styles.headerResults}>
            <Text style={styles.textInHeaderResults}> {this.state.totalRes} Resultados</Text>
            <View style={styles.iconsInHeaderResults}>
              {
                global.filtroIcons.length > 0 ?  <Text style={{fontFamily: Fonts.family.base_italic, color: Colors.green, paddingRight: 10}}>Filtros:</Text> : <></>
              }
             
              <FlatList
                style = {styles.flatIconList} 
                data={global.filtroIcons}
                renderItem={({ item }) => (
                    item.icon == "-" ? this.createHIcon(item.name) : <CustomIcon style={[styles.filterHIcon, { color: Colors[item.icon]}]} name={item.icon}></CustomIcon>
                )}
                horizontal={true}
                keyExtractor={(item, index) => index}
              />
            </View>
          </View>
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
                    <Text  style={styles.subTitleRow}>{item.subtitle}</Text>
                    
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