import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
import { withNavigation } from 'react-navigation';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import ImageViewer from 'react-native-image-zoom-viewer';
import Spinner from 'react-native-loading-spinner-overlay';
import NavBar from '../Components/NavBar';
import TabBar from '../Components/TabBar';

import { Modal } from 'react-native';

import styles from '../Components/Styles/MediaScreenStyles';

const API = 'http://enciclovida.mx';

// create a component
class MediaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        data: [],
        showimage: false,
        image_tmp: '',
        spinner: false,
        };
        this.fetchData = this.fetchData.bind(this);
    }

    setMediaIdSpecie=(id_specie)=>{
        global.media_id_specie=id_specie;
    }

    async fetchData(specie_id, media_specie_id) {
        if(specie_id !== media_specie_id){
            let result=[];
            this.setState({ spinner: true, data : [] });
            if (specie_id !== 0) {
                try {
                    const response = await fetch(`${API}/especies/${specie_id}/fotos-naturalista.json`);
                    console.log(`${API}/especies/${specie_id}/fotos-naturalista.json`);
                    const json = await response.json();
                    console.log(json);
                    if(json.estatus){
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
                finally{
                    this.setState({ data: result, spinner: false });
                }
            } else {
                this.setState({ spinner: false });
            }
        }
    }
  
  componentWillReceiveProps() {
    //Alert.alert("idProps", this.state.load.toString());
    this.fetchData(global.id_specie, global.media_id_specie);
  }
  

  componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      this.fetchData(global.id_specie, global.media_id_specie);
      
  }

  handleBackPress =()=>{
    if(this.state.showimage)
        this.setState({showimage: false});
  }
/*
  componentWillMount (){
      this.setState({ data : [] });
      //Alert.alert("idMount", this.state.load.toString());
      this.fetchData(global.id_specie);
  }
  */

  handlePress(image) {
    this.setState({
      showimage: true,
      image_tmp: image || 'ic_imagen_not_found_small',
    });
  }

  render() {
    return (
      <View style={[styles.mainScreen]}>
        <NavBar menuBlackButton={true} infoButton={true}/>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent="Cargando..."
            textStyle={{ color: '#FFF' }}
          />
          

          <FlatList
            style={styles.flatList}
            data={this.state.data}
            extraData={this.state}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (

              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>


                <TouchableOpacity
                  onPress={() => {
                    this.handlePress(item.imagen);
                    <Modal visible={true} transparent={true}>
                      <ImageViewer imageUrls={item.imagen}/> 
                    </Modal>
                  }}
                >

                  
                  <Image 
                    source={{ uri: item.imagen ? item.imagen : 'ic_imagen_not_found_small' }}
                    style={item.imagen ? sstyles.imageThumbnail : styles.imageempty}
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


const sstyles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

// make this component available to the app
export default withNavigation(MediaScreen);
