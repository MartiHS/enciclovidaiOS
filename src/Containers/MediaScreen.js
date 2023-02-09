import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageView from 'react-native-image-view';

import NavBar from '../Components/NavBar';
import TabBar from '../Components/TabBar';
import styles from '../Components/Styles/MediaScreenStyles';

import Helper from '../Config/Helpers';

/* MediaScreen: Pantalla en la que se muestra la galería de imágenes sobre X especie */ 
class MediaScreen extends Component {
  // CONSTRUCTOR DE EL COMPONENTE
  constructor(props) {
    console.log("\n\n\nLlamada a MediaScreen desde constructor \n---------------------------------\n" );
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

  setMediaIdSpecie = (id_specie) => {
    global.media_id_specie = id_specie;
  }

  async fetchData(specie_id, media_specie_id) {
    if (specie_id !== media_specie_id) {
      let result = [];
      this.setState({ spinner: true, data: [] });
      if (specie_id !== 0) {

        
        // Si hay algo en taxonPhotos, quiere decir que se guardaron ya las fotos desde About (Que siempre debería ser así)
        if(global.taxonPhotos !== [] ) {
          console.log("No fué necesario llamar al servicio de nuevo!! :D");
          result = Helper.getDataImages(global.taxonPhotos);
        } else {
            // Si no se guardaron o se perdieron (Extrañamente debería pasar aquí)

            // Obtener la media
            let response = await Helper.fetchAllMedia(id_specie);
            let fotos = await response.fotos;
            let videos = await response.videos;
            let audios = await response.audios;

            global.taxonPhotos = fotos;
            global.taxonVideos = videos;
            global.taxonAudios = audios;
            
            result = Helper.getDataImages(fotos2, false);
            
        }
        
        this.setMediaIdSpecie(specie_id);
        this.setState({ data: result, spinner: false, listImages: Helper.createJSONImagesFor_image_view(result)});

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
                //console.log(index);
            }}
          />
                    
          <FlatList
            style={styles.flatList}
            data={this.state.data}
            extraData={this.state}
            
            renderItem={({ item, index }) => (

              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                  <TouchableOpacity
                      onPress={() => {
                        //console.log("\n\n\n item : " + JSON.stringify(index));
                        this.handlePress(item.imagen, index);
                      }}
                  >
                      <Image
                        source={{ uri: item.thumb ? item.thumb : 'ic_imagen_not_found_small' }}
                        style={item.thumb ? styles.imageThumbnail : styles.imageempty}
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

export default withNavigation(MediaScreen);

/*
    componentWillMount (){
        this.setState({ data : [] });
        //Alert.alert("idMount", this.state.load.toString());
        this.fetchData(global.id_specie);
    }
*/