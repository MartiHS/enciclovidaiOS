import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageView from 'react-native-image-view';

import NavBar from '../Components/NavBar';
import TabBar from '../Components/TabBar';
import styles from '../Components/Styles/MediaScreenStyles';

const API = 'http://enciclovida.mx';

/* MediaScreen: Pantalla en la que se muestra la galería de imágenes sobre X especie */
class MediaScreen extends Component {
  // CONSTRUCTOR DE EL COMPONENTE
  constructor(props) {
    //console.log("\n\n\nLlamada a MediaScreen desde constructor \n---------------------------------\n" + JSON.stringify(props));
    super(props);
    this.state = {
      data: [],
      listImages: [],
      showimage: false,
      image_tmp: '',
      spinner: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  // FUNCION PARA ARMAR EL JSON DE LA GALERÍA
  getImages(JSONImages) {
    try {

      var listImages = [];

      for(var i = 0; i< JSONImages.length; i++) {    
          var image = {
            id: JSONImages[i]['id'],
            source: {
              uri: JSONImages[i]['imagen']
            },
            title: JSONImages[i]['text']
          }
          listImages.push(image);
      }

      return listImages;

    } catch (error) {
      return [];
    }
  }

  setMediaIdSpecie = (id_specie) => {
    global.media_id_specie = id_specie;
  }

  async fetchData(specie_id, media_specie_id) { 
    if (specie_id !== media_specie_id) {
      let result = [];
      this.setState({ spinner: true, data: [] });
      if (specie_id !== 0) {
        try {
          const response = await fetch(`${API}/especies/${specie_id}/fotos-naturalista.json`);
          console.log("\n**Se realizaá la llamada al sifuiente servicio: ");
          console.log(`${API}/especies/${specie_id}/fotos-naturalista.json`);
          const json = await response.json();
          console.log("\n**La respuesta fué: ");
          console.log(json);
          if (json.estatus) {
            result = json.fotos.map(data => {
              return {
                id: data.photo.id,
                imagen: data.photo.medium_url,
                text: data.photo.attribution,
              };
            });
            this.setMediaIdSpecie(specie_id);
          }

        } catch (error) {

          console.error(error);
        }
        finally {
          this.setState({ data: result, spinner: false, listImages: this.getImages(result)});
        }
      } else {
        this.setState({ spinner: false });
      }
    }
  }

  UNSAFE_componentWillReceiveProps() {
    //Alert.alert("idProps", this.state.load.toString());
    this.fetchData(global.id_specie, global.media_id_specie);
  }


  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.fetchData(global.id_specie, global.media_id_specie);

  }

  handleBackPress = () => {
    if (this.state.showimage)
      this.setState({ showimage: false });
  }
  /*
    componentWillMount (){
        this.setState({ data : [] });
        //Alert.alert("idMount", this.state.load.toString());
        this.fetchData(global.id_specie);
    }
    */

  handlePress(image, index) {
    this.setState({
      showimage: true,
      image_tmp: image || 'ic_imagen_not_found_small',
      currentIndex: index
    });
  }

  renderFooter({title}) {
    return (
      <View style={styles.view_text_image}>
      <Text style={styles.view_text}>{title}</Text>
    </View>
    );
  }

  render() {
    return (
      <View style={[styles.mainScreen]}>
        <NavBar menuBlackButton={true} infoButton={true} />
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent="Cargando..."
            textStyle={{ color: 'black' }}
          />

          <ImageView
            glideAlways
            images={this.state.listImages}
            imageIndex={this.state.currentIndex}
            animationType="slide"
            //animationType="fade"
            isVisible={this.state.showimage}
            renderFooter={this.renderFooter}
            onClose={() => this.setState({ showimage: false })} 
            onImageChange={index => {
                console.log(index);
            }}
          />
                    
          <FlatList
            style={styles.flatList}
            data={this.state.data}
            extraData={this.state}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (

              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                  <TouchableOpacity
                      onPress={() => {
                        console.log("\n\n\n item : " + JSON.stringify(index));
                        this.handlePress(item.imagen, index);
                      }}
                  >
                      <Image
                        source={{ uri: item.imagen ? item.imagen : 'ic_imagen_not_found_small' }}
                        style={item.imagen ? styles.imageThumbnail : styles.imageempty}
                      />
                  </TouchableOpacity>
              </View>
            )}
            numColumns={3}
          />
        </View>
        <TabBar shownav selected="Media" />
      </View>
    );
  }
}

// make this component available to the app
export default withNavigation(MediaScreen);