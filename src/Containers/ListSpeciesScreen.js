//import liraries
import React, {Component} from 'react';
import {
  View,
  FlatList,
  Image,
  Alert,
  Text,
  TouchableOpacity
} from 'react-native';
import {withNavigation,NavigationActions} from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import NavBar from '../Components/NavBar';

import styles from "../Components/Styles/ListSpeciesScreenStyles";

const API = 'http://api.enciclovida.mx';
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

  getSpeciesInfo = async (filter) => {
    this.setState({spinner: true, refreshing: false, loadingMore: false});

    if (filter != "") {
      console.log("ListSpeciesScreen:", `${API}/especies/busqueda/avanzada?nivel=%3D${filter}`);
      fetch(`${API}/especies/busqueda/avanzada?nivel=%3D${filter}`)
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
          this.setState({data: result, spinner: false, page: 1, total: totpage, loadingMore: entries > limit ? true : false });
        } catch (e) {
          this.setState({spinner: false});
          Alert.alert("Error en los datos");
        }
      }).catch(error => {
        this.setState({spinner: false});
      });
    } else {
      this.setState({spinner: false});
    }
  }

  loadmore = async () => {
    this.setState({
      spinner: true
    });
    const filter = global.filtro;
    const page = this.state.page;
    if (filter != "") {
      fetch(`${API}/especies/busqueda/avanzada?nivel=%3D${filter}&pagina=${page}`).then(res => res.json()).then((json) => {
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
        <View style = {styles.footer} >
          <TouchableOpacity activeOpacity = {0.9} style = {styles.btnfooter} >
            <Text style = {styles.textfooter} > Cargar Pagina {this.state.page} de {this.state.total} </Text> 
          </TouchableOpacity> 
          </View>
      );
    } else {
      return ( 
        <View style = {styles.footer}/>
      );
    }
  }

  _listEmptyComponent = () => {
    return ( 
      <View style = {styles.empty_text} >
        <Text > No hay resultados </Text> 
        </View>
    )
  }

  viewDetails = (id, nombre_comun, nombre_cientifico) => {
    //console.log(id);
    global.id_specie = id;
    global.title = nombre_comun;
    global.subtitle = nombre_cientifico;
    global.classificationList = [];
    this.props.navigation.navigate("About", {});
  };

  handlePress=(item)=> {
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
    this.setState({
        page: 1,
        refreshing: true
      },
      () => {
        this.setState({
          data: []
        });
        this.getSpeciesInfo(global.filtro);
      }
    );
  };

  componentWillReceiveProps = () => {
    this._handleRefresh();
  };

  componentDidMount = () => {
    this.setState({
      data: []
    });
    this.getSpeciesInfo(global.filtro);
  };

  render() {
    return ( 
      <View style = {[styles.mainScreen]} >
        <NavBar menuBlackButton = {true} filterButton = {true}/> 
        <View style = {styles.container} >
          <Spinner visible = {this.state.spinner} textContent = {'Cargando...'} textStyle = {{color: '#FFF'}} /> 
          <FlatList 
            style = {styles.flatList} 
            data = {this.state.data} 
            extraData = {this.state} 
            keyExtractor = {(item) => item.id.toString()} 
            ListEmptyComponent = {this._listEmptyComponent}
            ListFooterComponent = {this.renderFooter.bind(this)}
            renderItem = {({item, index}) => (
              <TouchableOpacity onPress = {() => {this.handlePress(item)}} >
                <View style = {styles.viewflat} >
                  <Image source = {{uri: item.imagen ? item.imagen : 'ic_imagen_not_found_small'}}
                    style = {item.imagen ? styles.image : styles.imageempty}/> 
                  <View style = {styles.view_text_image} >
                    <Text style = {styles.view_text_title} > {item.title} </Text> 
                    <Text style = {styles.view_text_subtitle} > {item.subtitle} </Text> 
                  </View> 
                </View> 
              </TouchableOpacity>
              )
            }
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