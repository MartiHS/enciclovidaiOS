import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { withNavigation } from 'react-navigation';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import ImageViewer from 'react-native-image-zoom-viewer';
import Spinner from 'react-native-loading-spinner-overlay';
import NavBar from '../Components/NavBar';
import TabBar from '../Components/TabBar';

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
          <Dialog
            onDismiss={() => {
              this.setState({ showimage: false });
            }}
            width={1}
            height={0.5}
            onTouchOutside={() => {
              this.setState({ showimage: false });
            }}
            visible={this.state.showimage}
            containerStyle={styles.navBarDialog}
            rounded
            actionsBordered
          >
            <DialogContent style={[{ flex: 1, paddingVertical: 20 }]}>
              <ImageViewer
                imageUrls={[{ url: this.state.image_tmp }]}
                enableImageZoom
                saveToLocalByLongPress={false}
                renderIndicator={(currentIndex, allSize) => <Text />}
                backgroundColor="#ffffff"
              />
            </DialogContent>
          </Dialog>

          <FlatList
            style={styles.flatList}
            data={this.state.data}
            extraData={this.state}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.viewflat}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.handlePress(item.imagen);
                  }}
                >
                  <Image
                    source={{ uri: item.imagen ? item.imagen : 'ic_imagen_not_found_small' }}
                    style={item.imagen ? styles.image : styles.imageempty}
                  />
                </TouchableWithoutFeedback>
                <View style={styles.view_text_image}>
                  <Text style={styles.view_text}>{item.text}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <TabBar shownav selected="Media" />
      </View>
    );
  }
}

// make this component available to the app
export default withNavigation(MediaScreen);
