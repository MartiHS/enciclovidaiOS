import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, BackHandler, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageView from 'react-native-image-view';

import NavBar from '../Components/NavBar';
import TabBar from '../Components/TabBar';
import styles from '../Components/Styles/MediaScreenStyles';

import RNImageVideoGridViewer from "@leafletui/rn-image-video-grid-viewer";

import Modal from "react-native-modal";

import Icon2 from 'react-native-vector-icons/Fontisto';

import Helper from '../Config/Helpers';
import { Colors, Fonts } from '../Theme';

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
      modalVisible: true,
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
          result = Helper.getDataImages(global.taxonPhotos, global.taxonVideos, global.taxonAudios);
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
        this.setState({ data: result, spinner: false, listImages: Helper.createJSONImagesFor_image_view(result[0])});

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

  WrapperComponent() {
    return (
      <View>
        <Modal isVisible={true}>
          <View style={{ flex: 1}}>
            <Text style={{color: 'white' }}>I am the modal content!I am the modal content!I am the modal content!I am the modal content!I am the modal content!I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    );
  }

  renderFooter({title}) {
    return (
      <View style={styles.view_text_image}>
      <Text style={styles.view_text}>{title}</Text>
    </View>
    );
  }


  render() {
    
    const {modalVisible} = this.state;

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



          <View>
          <RNImageVideoGridViewer
          images={[
            { url: "https://images.unsplash.com/photo-1580465446361-8aae5321522b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", type: "image", videoThumbnail: null },
            { url: "", type: "video", videoThumbnail: "https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" },
            { url: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80", type: "image", videoThumbnail: null },
        ]}
          onPress={(item) => { 
            console.log(item, 'selected image properties', item.type, 'video/image'); 
            this.setState({modalVisible: !modalVisible});
          }}
          style={{}} 
          playIconHeight={50} 
          playIconWidth={50}
        />
      </View>





    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Button title="Show modal" onPress={() => {
            this.setState({modalVisible: !modalVisible});
        }} />

      <Modal 
        animationInTiming={400} 
        coverScreen={true}
        isVisible={modalVisible} 
        hasBackdrop={true}
        backdropColor={'black'}
        backdropOpacity={0.7}

        // Caundo presionamos fuera
        onBackdropPress={() => {
            this.setState({modalVisible: !modalVisible});
        }}
        style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10  }}
      >
        <View style={{ flex: 1 }}>
          <View style={{flexDirection:'row'}}>
            <View  style={{ width: '70%'}}>
              <Text style={{fontFamily: Fonts.family.base_bold, fontSize: Fonts.size.h1,  color:Colors.blue, padding: 10}}>Fotos</Text>
            </View>
            <View  style={{ width: '30%', alignContent:'flex-end', alignItems:'flex-end'}}>
              <TouchableOpacity style={{ }} onPress={() => { this.setState({modalVisible: !modalVisible}) }} >
                <Icon2 name="close-a" color={Colors.blue} style={{fontSize: Fonts.size.h2, padding: 10, paddingTop: 15}} />
              </TouchableOpacity>
            </View>

          </View>
          
          <FlatList
            style={styles.flatList}
            data={this.state.data[0]}
            extraData={this.state}
            
            renderItem={({ item, index }) => (

              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                  <TouchableOpacity
                      onPress={() => {
                        //console.log("\n\n\n item : " + JSON.stringify(index));
                        this.handlePress(item.content, index);
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
      </Modal>
    </View>
                    
          
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