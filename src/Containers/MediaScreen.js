import React, { Component } from 'react';
import { ImageBackground, View, FlatList, Image, Text, TouchableOpacity, BackHandler, Button, TouchableHighlight, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageView from 'react-native-image-view';

import NavBar from '../Components/NavBar';
import TabBar from '../Components/TabBar';
import styles from '../Components/Styles/MediaScreenStyles';

import SoundPlayer from 'react-native-sound-player'

import { ViewPager, TabbedPager } from 'react-native-viewpager-carousel'

import { WebView } from 'react-native-webview';

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
      listImages: [],
      showimage: false,
      image_tmp: '',
      spinner: true,
      
      modalAudioVisible: false,
      audioOnModal: '',
      audioOnModalDesc: '',

      modalVisible: false,
      videoOnModal: '',
      videoOnModalDesc: '',
      mediaOptions: [{"title": "-"}, {"title": "-"},{"title": "-"}]
  };
    
    this.fetchData = this.fetchData.bind(this);
  }

  setMediaIdSpecie = (id_specie) => {
    global.media_id_specie = id_specie;
  }

  async fetchData(specie_id, media_specie_id) {
    // Si la especie en cuestión es diferente a la búsqueda anterior
    if (specie_id !== media_specie_id) {
      let result = {};
      this.setState({ spinner: true, mediaOptions: [] });
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
            
            result = Helper.getDataImages(global.taxonPhotos, global.taxonVideos, global.taxonAudios);
            
        }
        
        this.setMediaIdSpecie(specie_id);
        let imagesCatalog = Helper.createJSONImagesFor_image_view(result[0].content);
        this.setState({ mediaOptions: result, spinner: false, listImages: imagesCatalog});
        
      } else {
        this.setState({ spinner: false });
      }
    } else {
      // DEV: la especie es la misma
      console.log("Misma especie");
      this.setState({ spinner: true, mediaOptions: []});
      let result = Helper.getDataImages(global.taxonPhotos, global.taxonVideos, global.taxonAudios);
      let imagesCatalog = Helper.createJSONImagesFor_image_view(result[0].content);
      this.setState({ mediaOptions: result, spinner: false, listImages: imagesCatalog});
    }
  }

  _listEmptyComponent = () => {
    return (
      <View style={{flex: 1,
        height: 500,
        justifyContent: 'center', 
        alignItems: 'center'}} >
        <Text > No hay resultados </Text>
      </View>
    )
  }

  UNSAFE_componentWillReceiveProps() {
    //Alert.alert("idProps", this.state.load.toString());
    this.fetchData(global.id_specie, global.media_id_specie);
  }


  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.fetchData(global.id_specie, global.media_id_specie);
    console.log(global.id_specie);
    console.log(global.media_id_specie);
    //this.setState({ spinner: false });

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

  playASound(sound) {

    console.log("Se intentarà con: " + sound)
    try {
        // play the file tone.mp3
        //SoundPlayer.playSoundFile(sound, 'mp3')
        // or play from url
        SoundPlayer.playUrl(sound)
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
  }


  _renderTab = ({data}) => {
    return (  
      <></>
    )
  }

  _renderPage = ({data}) => {
    console.log("CONTENIDO A ITERAR")

    let contentType = data.title;
    console.log(contentType)
    console.log(data)
    let mediaContent;
    if(contentType === "Fotos"){
      mediaContent = ( 
        <FlatList
          style={[styles.flatList, {backgroundColor: 'white', marginTop: -2}]}
          data={data.content}
          extraData={this.state}
          ListEmptyComponent={this._listEmptyComponent}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <TouchableOpacity
                    style={{  }}
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
      )
    }

    if(contentType === "Videos"){
      mediaContent = ( 
        <FlatList
          style={[styles.flatList, {backgroundColor: 'white'}]}
          data={data.content}
          extraData={this.state}
          ListEmptyComponent={this._listEmptyComponent}
            renderItem={({ item, index }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                  <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalVisible: true, videoOnModal: item.content, videoOnModalDesc: item.text});
                      }}
                  >
                      <Image
                        source={{ uri: item.thumb ? item.thumb : 'ic_imagen_not_found_small' }}
                        style={item.thumb ? styles.videoThumbnail : styles.imageempty}
                      />
                  </TouchableOpacity>
              </View>
            )}
          numColumns={3}
        />
      )
    }

    if(contentType === "Audios"){
      mediaContent = ( 
        <FlatList
          style={[styles.flatList, {backgroundColor: 'white', height: 100}]}
          data={data.content}
          extraData={this.state}
          ListEmptyComponent={this._listEmptyComponent}
            renderItem={({ item, index }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                  <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalAudioVisible: true, audioOnModal: item.content, audioOnModalDesc: item.text});
                        //console.log("\n\n\n item : " + JSON.stringify(index));
                        this.playASound(item.content);
                      }}
                  >
                      <Image
                        source={{ uri: item.thumb ? item.thumb : 'ic_imagen_not_found_small' }}
                        style={item.thumb ? styles.audioThumbnail : styles.imageempty}
                      />
                  </TouchableOpacity>
              </View>
            )}
          numColumns={2}
        />
      )
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', paddingTop: 10 }}>
          <Icon2 name="angle-left" color={Colors.blue} style={{width:'10%', alignItems: 'center', justifyContent: 'center', fontSize: Fonts.size.h2, padding:10}} />         
          <Text style={{width:'80%', textAlign:'center', fontFamily: Fonts.family.base_bold, fontSize: Fonts.size.h2,  color:Colors.blue, padding: 10}}>{data.title}</Text>
          <Icon2 name="angle-right" color={Colors.blue} style={{width:'10%', alignItems: 'center', justifyContent: 'center', fontSize: Fonts.size.h2, padding: 10, padding: 10}} />   
        </View>
        {mediaContent}
      </View>
    )
  }

  _showLoading(){
    return(
      <Spinner
        visible={true}
        textContent="Cargando..."
        textStyle={{ color: 'black' }}
      />
    )
  }

  _renderTitleChange= (data) => {
    console.log("cambiaaaa")
    console.log(data)
    
    
  }


  render() {
    const {mediaOptions, modalVisible, videoOnModal, videoOnModalDesc, modalAudioVisible, audioOnModal, audioOnModalDesc} = this.state;
    
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
          <Modal 
            animationInTiming={400} 
            coverScreen={true}
            isVisible={modalVisible} 
            hasBackdrop={true}
            backdropColor={'black'}
            backdropOpacity={0.7}
            //deviceHeight={300}
            // Caundo presionamos fuera
            onBackdropPress={() => {
                this.setState({modalVisible: !modalVisible});
            }}
            style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10  }}
          >
            <View style={{ flex: 1 }}>
              <View style={{flexDirection:'row'}}>
                <View  style={{ width: '70%'}}>
                <Text style={{fontFamily: Fonts.family.base_bold, fontSize: Fonts.size.h1,  color:Colors.blue, padding: 10}}>Video</Text>
                </View>
                <View  style={{ width: '30%', alignContent:'flex-end', alignItems:'flex-end'}}>
                  <TouchableOpacity style={{ }} onPress={() => { this.setState({modalVisible: !modalVisible}) }} >
                    <Icon2 name="close-a" color={Colors.blue} style={{fontSize: Fonts.size.h2, padding: 10, paddingTop: 15}} />
                  </TouchableOpacity>
                </View> 
              </View>
              
              <View style = {{flex: 1}}>  
                <WebView source={{ uri: videoOnModal }} />
              </View>

              <View  style={{ width: '100%'}}>
                <Text style={{fontFamily: Fonts.family.base, fontSize: Fonts.size.small,  color:Colors.blue, padding: 10}}>{videoOnModalDesc}</Text>
              </View>
                
            </View>
          </Modal>


          <Modal 
            animationInTiming={400} 
            coverScreen={false}
            isVisible={modalAudioVisible} 
            hasBackdrop={true}
            //deviceHeight={10000}
            animationIn={'zoomInUp'}
            backdropColor={'black'}
            backdropOpacity={0.7}
            //deviceHeight={10}
            // Caundo presionamos fuera
            onBackdropPress={() => {
                this.setState({modalAudioVisible: !modalAudioVisible});
                try {
                    SoundPlayer.stop();
                } catch (e) {
                    console.log(`cannot play the sound file`, e)
                }
            }}
            style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomEndRadius: 10, borderBottomLeftRadius: 10  }}
          >
            <View style={{ flex: 1 }}>
              <View style={{flexDirection:'row', height: '7.5%'}}>
                <View  style={{ width: '70%'}}>
                <Text style={{fontFamily: Fonts.family.base_bold, fontSize: Fonts.size.h1,  color:Colors.blue, padding: 10}}>Audio</Text>
                </View>
                <View  style={{ width: '30%', alignContent:'flex-end', alignItems:'flex-end'}}>
                  <TouchableOpacity style={{ }} onPress={
                    () => {
                        this.setState({modalAudioVisible: !modalAudioVisible});
                        try {
                            SoundPlayer.stop();
                        } catch (e) {
                            console.log(`cannot play the sound file`, e)
                        }
                    }
                  } >
                    <Icon2 name="close-a" color={Colors.blue} style={{fontSize: Fonts.size.h2, padding: 10, paddingTop: 15}} />
                  </TouchableOpacity>
                </View> 
              </View>
              
              <ImageBackground source={{uri: global.defaultPhoto}} imageStyle= {{opacity:0.3}} resizeMode='cover' style={{backgroundColor: 'rgb(55,55,55)', width: '100%'}} >
              

              <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', height: '85%'}}>

                <TouchableHighlight
                  style = {{
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.18,
                    height: Dimensions.get('window').width * 0.18,
                    backgroundColor:Colors.green,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginTop: 5
                  }}
                  underlayColor = '#ccc'
                  onPress = { () => {
                    try {
                        SoundPlayer.stop();
                    } catch (e) {
                        console.log(`cannot play the sound file`, e)
                    }
                  } }
                >
                  <Icon2 name="stop" color={Colors.white} style={{fontSize: Fonts.size.h2}} />
                </TouchableHighlight>

                <TouchableHighlight
                  style = {{
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.2,
                    height: Dimensions.get('window').width * 0.2,
                    backgroundColor:Colors.green,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10
                  }}
                  underlayColor = '#ccc'
                  onPress = { () => {
                    try {
                        SoundPlayer.resume();
                    } catch (e) {
                        console.log(`cannot play the sound file`, e)
                    }
                  } }
                >
                  <Icon2 name="play" color={Colors.white} style={{fontSize: Fonts.size.h2}} />
                </TouchableHighlight>

                <TouchableHighlight
                  style = {{
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.18,
                    height: Dimensions.get('window').width * 0.18,
                    backgroundColor:Colors.green,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginTop: 5
                  }}
                  underlayColor = '#ccc'
                  onPress = { () => {
                    try {
                        SoundPlayer.pause();
                    } catch (e) {
                        console.log(`cannot play the sound file`, e)
                    }
                  } }
                >
                  <Icon2 name="pause" color={Colors.white} style={{fontSize: Fonts.size.h2}} />
                </TouchableHighlight>

              </View>
              </ImageBackground>
              
              <View style={{ width: '100%', height: '7.5%'}}>
                <Text style={{fontFamily: Fonts.family.base, fontSize: Fonts.size.small,  color:Colors.blue, padding: 10}}>{audioOnModalDesc}</Text>
              </View>
                
            </View>
          </Modal>

          <TabbedPager
            data={mediaOptions}
            renderPage={this._renderPage}
            renderTab={this._renderTab}
            onPageChange={this._renderTitleChange}
            lazyrender={true}
            lazyrenderThreshold={0}
            renderAsCarousel={true}
            scrollEnabled={true}
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



      <FlatList
            style={styles.flatList}
            data={this.state.data[0]['content']}
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
        deviceHeight={300}
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
          
          
           
        </View>
      </Modal>
    </View>
             



          
*/