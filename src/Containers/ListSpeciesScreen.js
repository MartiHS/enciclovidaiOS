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
    this.state = {
      data: [],
      page: 1,
      total: 1,
      loadingMore: false,
      refreshing: false,
    };
  }
  
  // Buscador por localización
  fetchSpeciesByLocation = async () => { 
    
    console.log(":::: > > fetchSpeciesByLocation < < ::::");

    this.setState({ spinner: true, refreshing: false, loadingMore: false });
    const location = global.locationData;
    const filtro = global.filtro == undefined ? "" : global.filtro;
    console.log(global.filtroIcons);
   
    // SI existe una localización activa:
    if(location != null){
        let query = `https://api.enciclovida.mx/v2/especies/busqueda/region?tipo_region=${encodeURIComponent(location.tipo_region.toLowerCase())}&region_id=${encodeURIComponent(location.region_id)}${filtro}&pagina=1&por_pagina=50`;
        console.log(query);
        fetch(query).then(res => { // Recuperar el # de especies
          this.setState({totalRes: res.headers.get('num_especies')});
          return res;
        }).then(res => res.json()).then(json => {

            // Intentar el manejo de resultados: 
            try {
              console.log("\n\n\n: : : > > > Iterar la lista de resultados obtenidos < < < : : :");
              const result = json.map(item => {
                return {
                  id: item.especie.IdNombre,
                  imagen: item.especie.foto_principal,
                  title: item.especie.nombre_comun_principal,
                  subtitle: item.especie.NombreCompleto,
                  icons: []
                };
              });

              function checkStatus(sresponse) {
                if (sresponse.ok) {
                  //console.log("S");
                  return Promise.resolve(sresponse);
                } else {
                  //console.log("N");
                  return Promise.reject(new Error(sresponse.statusText));
                }
              }
          
              function parseJSON(sresponse) {
                return sresponse.json();
              }

              Promise.all(result.map(item =>
                fetch(`https://api.enciclovida.mx/v2/autocompleta/especies?q=${encodeURIComponent(item.subtitle)}&cat_principales=true&cat=especie`)
                    .then(checkStatus)
                    .then(parseJSON)
                    .then(data => {
                      try {
                        let lIcons = data.especie[0].data.cons_amb_dist
                        let listFinalIcons = [];
                        for (let clave in lIcons){
                          listFinalIcons.push({"name": clave});
                        }
                        item.icons = listFinalIcons;
                      } catch (e){
                        console.log(e);
                      }
                      return item;
                }).catch(
                  error => console.log('There was a problem!', error)
                )
              ))
              .then(data => {
                    console.log("Continuo con mi desmadre");
                    //console.log(data);
                    //console.log("cargar paginado: ");
                    var entries = this.state.totalRes;
                    var len = json.length;
                    //console.log(len);
                    var totpage = 0;
                    var limit = 50;
                    if (len == limit) {
                      totpage = entries / len | 0;
                      var exact = entries % json.length;
                      if (exact != 0) {
                        totpage = totpage;
                      } else {
                        totpage = totpage + 1;
                      }
                    }
                    console.log("Total: ", entries);
                    console.log("Páginas: ", totpage);
                    console.log("limit: ", limit);
                    
                    console.log("------------------FIN");
                    this.setState({ data: result, spinner: false, page: 1, total: totpage, loadingMore: entries > limit ? true : false });
              })
   
            } catch (e) {
              this.setState({ spinner: false });
              console.log(e);
              Alert.alert("Error en los datos");
            }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ data: [] });
    }
  }
  
  // Buscador de especies a nivel nacional, ya con filtros declarados
  getSpeciesInfo = async () => {
    console.log("--------- getSpeciesInfo HABLANDO DE NIVEL NACIONAL ---------");
    this.setState({ spinner: true, refreshing: false, loadingMore: false });
    let filtro = global.gFiltro + global.filtro;
    if (filtro != "") {
      console.log("Se hará una nueva búsqueda con FILTROS General: ");
      console.log(global.gFiltro);
      console.log("Se hará una nueva búsqueda con FILTROS Secundarios: ");
      console.log(global.filtro);

      let query = `${Constants.API_ENCICLOVIDA}v2/especies/${filtro}&pagina=1&por_pagina=50`;

      console.log(query);
      fetch(query).then(res => { // Recuperar el # de especies
        this.setState({totalRes: res.headers.get('num_especies')});
        return res;
      }).then(res => res.json()).then(json => {

          // Intentar el manejo de resultados: 
          try {
            
            console.log("\n\n\n: : : > > > Iterar la lista de resultados obtenidos < < < : : :");
            const result = json.map(item => {
              return {
                id: item.IdNombre,
                imagen: item.foto_principal,
                title: item.nombre_comun_principal,
                subtitle: item.NombreCompleto,
                icons: []
              };
            });

            function checkStatus(sresponse) {
              if (sresponse.ok) {
                //console.log("S");
                return Promise.resolve(sresponse);
              } else {
                //console.log("N");
                return Promise.reject(new Error(sresponse.statusText));
              }
            }
        
            function parseJSON(sresponse) {
              return sresponse.json();
            }
            
            Promise.all(result.map(item =>
              fetch(`https://api.enciclovida.mx/v2/autocompleta/especies?q=${encodeURIComponent(item.subtitle)}&cat_principales=false&cat=especie`)
                  .then(checkStatus)
                  .then(parseJSON)
                  .then(data => {
                    try {
                      //console.log(data);
                      let lIcons = data.especie[0].data.cons_amb_dist
                      let listFinalIcons = [];
            
                      for (let clave in lIcons){
                        listFinalIcons.push({"name": clave});
                      }

                      //console.log("Continuo ");
                      item.icons = listFinalIcons;

                    } catch (e){
                      //console.log(e);
                    }

                    return item;
              }).catch(error => console.log('There was a problem!', error))
            ))
            .then(data => {
                  console.log("Continuo con mi desmadre");
                  //console.log(data);

                  console.log("cargar paginado: ");
                  var entries = this.state.totalRes;
                  var len = json.length;
                  console.log(len);
                  var totpage = 0;
                  var limit = 50;
                  if (len == limit) {
                    totpage = entries / len | 0;
                    var exact = entries % json.length;
                    if (exact != 0) {
                      totpage = totpage;
                    } else {
                      totpage = totpage + 1;
                    }
                  }
                  console.log("Total: ", entries);
                  console.log("Páginas: ", totpage);
                  console.log("limit: ", limit);
                  
                  console.log("------------------FIN");
                  this.setState({ data: result, spinner: false, page: 1, total: totpage, loadingMore: entries > limit ? true : false });
            })
 
          } catch (e) {
            this.setState({ spinner: false });
            console.log(e);
            Alert.alert("Error en los datos");
          }
      })
      .catch((error) => {
        console.log(error);
      });


    } else {
      this.setState({ spinner: false });
    }
  }

  // Cargar masespecies a nivel nacional
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

  // Cargar más especies por localización
  loadmoreByL = async () => {

    this.setState({
      spinner: true
    });

    const location = global.locationData;
    const filtro = global.filtro == undefined ? "" : global.filtro;
    const page = this.state.page;  
    let query = `https://api.enciclovida.mx/v2/especies/busqueda/region?tipo_region=${encodeURIComponent(location.tipo_region.toLowerCase())}&region_id=${encodeURIComponent(location.region_id)}${filtro}&pagina=${page}&por_pagina=50`;
       
      fetch(query).then(res => res.json()).then((json) => {
       
              console.log("\n\n\n: : : > > > Iterar la lista de resultados obtenidos < < < : : :");
              const result = json.map(item => {
                return {
                  id: item.especie.IdNombre,
                  imagen: item.especie.foto_principal,
                  title: item.especie.nombre_comun_principal,
                  subtitle: item.especie.NombreCompleto,
                  icons: []
                };
              });

              function checkStatus(sresponse) {
                if (sresponse.ok) {
                  console.log("S");
                    return Promise.resolve(sresponse);
                } else {
                  console.log("N");
                    return Promise.reject(new Error(sresponse.statusText));
                }
              }
          
              function parseJSON(sresponse) {
                return sresponse.json();
              }

              Promise.all(result.map(item =>
                fetch(`https://api.enciclovida.mx/v2/autocompleta/especies?q=${encodeURIComponent(item.subtitle)}&cat_principales=false&cat=especie`)
                    .then(checkStatus)
                    .then(parseJSON)
                    .then(data => {

                      try {
                        let lIcons = data.especie[0].data.cons_amb_dist
                        let listFinalIcons = [];
              
                        for (let clave in lIcons){
                          listFinalIcons.push({"name": clave});
                        }

                        //console.log("Continuo ");
                        item.icons = listFinalIcons;

                      } catch (e){
                        console.log(e);
                      }

                      return item;
                }).catch(error => console.log('There was a problem!', error))
              ))
              .then(data => {
                    console.log("Continuo con mi desmadre");
                    console.log(data);

                    arraydata = [];
                    Array.prototype.push.apply(arraydata, this.state.data);
                    Array.prototype.push.apply(arraydata, data);
                    
                    console.log("------------------FIN");
                    this.setState({ data: arraydata, spinner: false});
              })
        
        
        this.setState({
          data: arraydata,
          spinner: false
        });
      }).catch(error => {
        this.setState({
          spinner: false
        });
      });

  }


  renderFooter() {
    if (this.state.loadingMore) {
      return (
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.9} style={styles.btnfooter}>
            <Text style={styles.textfooter}> Cargar Pagina {this.state.page} de {this.state.total} </Text>
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
      <View style={styles.empty_text}>
        <Text> No hay resultados </Text>
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

    let params = this.props.navigation.state;
    if(params.routeName == "SpeciesByLocation"){
      console.log("LOAD MORE BYL");
      if (this.state.page <= this.state.total && !this.state.spinner) {
        this.setState(
          (prevState, nextProps) => ({
            page: this.state.page + 1,
            loadingMore: this.state.page < this.state.total ? true : false
          }),
          () => {
            this.loadmoreByL();
          }
        );
      } else {
        console.log("NO HAY MAS"); 
      }

    } else {

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
    }
    
  };

  _handleRefresh = () => {
    console.log(">> _handleRefresh ")
    this.setState( { page: 1, refreshing: true },
      () => {
        this.setState({
          data: []
        });
  
        let params = this.props.navigation.state;
        if(params.routeName == "SpeciesByLocation"){
          console.log("vengo de BY LOCATION"); 
          this.fetchSpeciesByLocation();

        } else { // Si no, hacer búsqueda normal
          console.log("Vengo de NACIONAL"); 
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

    console.log("\n\n>> componentDidMount"); 
    this.setState({data: []});

    // -- Inicio de la vista, leer el origen si viene desde la ubicación: realizar busquedas por ubicación
    let params = this.props.navigation.state;
    if(params.routeName == "SpeciesByLocation"){
      console.log("Vengo de ByLocation"); 
      this.fetchSpeciesByLocation();
    } else { // Si no, hacer búsqueda normal
      console.log("Vengo de NACIONAL"); 
      this.getSpeciesInfo();
    }
  };

  createHIcon(name) {
    
    let fName = name[0].toUpperCase() + name.substring(1, 3).toLowerCase();

    return(
      <TouchableOpacity onPress={() => { alert(name) }} style={styles.customHIcon} >
        <View >
          <Text style={styles.customHIconText}>{fName}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  getIconList(filtrosICONAplicados) {
    
    return(
      <FlatList
        style = {styles.flatIconList} 
        data={filtrosICONAplicados}
        renderItem={({ item }) => (
            item.icon == "-" ? this.createHIcon(item.name) : <CustomIcon onPress={() => { alert(item.name) }} style={[styles.filterHIcon, { color: Colors[item.icon]}]} name={item.icon}></CustomIcon>
        )}
        horizontal={true}
        keyExtractor={(item, index) => index}
      />
    );
  }

  render() {
    let params = this.props.navigation.state;
    let TOTFilters = [];
    TOTFilters = TOTFilters.concat(global.gFiltroIcons);
    TOTFilters = TOTFilters.concat(global.filtroIcons);
    const L1 = global.gFiltroIcons.length == undefined ? 0 : global.gFiltroIcons.length;
    const L2 = global.filtroIcons.length == undefined ? 0 : global.filtroIcons.length;
    let TOTFiltersNUM = L1 + L2;
    return (
      <View style={[styles.MainContainer]} >
        <NavBar menuBlackButton={true} filterButton={true} />
        <View style={styles.container}>
          <Spinner visible={this.state.spinner} textContent={'Cargando...'} textStyle={{ color: '#FFF' }} />
          <View style={styles.headerResults}>
            <Text style={styles.textInHeaderResults}> {this.state.totalRes} Especies</Text>
            <View style={styles.iconsInHeaderResults}>
              {
                TOTFiltersNUM > 0 ?  <Text style={{fontFamily: Fonts.family.base_bold, color: Colors.green, paddingRight: 10}}>Filtros:</Text> : <></>
              }
              {
                TOTFiltersNUM > 0 ? this.getIconList(TOTFilters) : <></>
              }
              
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
                    <FlatList
                      style = {styles.flatIconList} 
                      data={item.icons}
                      renderItem={({ item }) => (
                        <CustomIcon style={[styles.filterHIcon, { color: Colors[item.name]}]} name={item.name}></CustomIcon>
                      )}
                      horizontal={true}
                      keyExtractor={(item, index) => index}
                    />
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