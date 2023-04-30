import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView, BackHandler, Dimensions, findNodeHandle, ImageBackground } from 'react-native';
import { withNavigation } from "react-navigation";

import Spinner from 'react-native-loading-spinner-overlay';

import AutoHeightWebView from 'react-native-autoheight-webview'

import NavBar from '../Components/NavBar';
import TabBar from "../Components/TabBar";

import styles from "../Components/Styles/AboutScreenStyles"; 

import Constants from '../Config/Constants';
import Helper from '../Config/Helpers';

import { ViewPager } from 'react-native-viewpager-carousel'
import { Colors, Fonts } from '../Theme';

import Icon2 from 'react-native-vector-icons/Fontisto';

import ParallaxScrollView from 'react-native-parallax-scroll-view';


// Esta pantalla será la primera que se ejecute al seleccionar una especie: lo ideal es que, como ya manda a llamar la galería de la especie, la almacene para que 
// Media no tenga que volver a hacer la llamada al servicio

/* ABOUTSCREEN: Pantalla en la que se muestra Una foto junto con información de la especie */
class AboutScreen extends Component {
  constructor(props) {
    console.log("\n\n\nLlamada a AboutScreen desde constructor \n---------------------------------\n");
    super(props)
    this.state = {
      imagen: "",
      contenido_render_array: [],
      spinner: false
    };

    //this.scrollViewRef = React.createRef();
    this.viewPager = React.createRef();
    this.scrollViewRef = React.createRef();

    this.aboutOptions = [
      { key: 'page_1', title: 'Resumen', value: 'sin_fuente', content: '', loaded: false },
      { key: 'page_2', title: 'CONABIO (descripción)', value: 'conabio', content: '', loaded: false },
      { key: 'page_3', title: 'Wikipedia en español', value: 'wikipedia_es', content: '', loaded: false },
      { key: 'page_4', title: 'Descripción de IUCN', value: 'iucn', content: '', loaded: false },
      { key: 'page_5', title: 'Wikipedia en inglés', value: 'wikipedia_en', content: '', loaded: false },
    ];

    this.fetchData = this.fetchData.bind(this);
    this.UNSAFE_componentWillReceiveProps = this.UNSAFE_componentWillReceiveProps.bind(this);

    this._nodes = new Map();
  }

  restartAboutOptions() {
    this.aboutOptions = [
      { key: 'page_1', title: 'Resumen', value: 'sin_fuente', content: '', loaded: false },
      { key: 'page_2', title: 'CONABIO (descripción)', value: 'conabio', content: '', loaded: false },
      { key: 'page_3', title: 'Wikipedia en español', value: 'wikipedia_es', content: '', loaded: false },
      { key: 'page_4', title: 'Descripción de IUCN', value: 'iucn', content: '', loaded: false },
      { key: 'page_5', title: 'Wikipedia en inglés', value: 'wikipedia_en', content: '', loaded: false },
    ];
  }

  getList(content, start, finish, type) {
    var original = content, exist;
    do {
      exist = original.indexOf(start) > -1 ? true : false;
      if (exist) {
        var result = original.substring(original.indexOf(start) + start.length, original.indexOf(finish));
        var stringreplace = start + result + finish;
        if (type == 1)
          original = original.replace(stringreplace, "@~1" + result + "@");
        if (type == 2)
          original = original.replace(stringreplace, "@~2" + result + "@");
        if (type == 3)
          original = original.replace(stringreplace, "@~3" + result + "@");
      }
    } while (exist);
    return original;
  }
  
  getHTMLSpecieResume(id_specie, fuente='') {

    let fuenteFin = fuente != 'sin_fuente' ? ('?fuente=' + fuente) : ('?' + fuente + '=true');

    console.log("SE BUSCARÂ CON: ");
    console.log(fuenteFin);

    // Iteramos la lista de fuentes a consultar
    for (let option in this.aboutOptions) {
      // SI encontramos la que se requiere:
      if (this.aboutOptions[option].value == fuente){
        // Si el contenido aun no está cargado, cargarlo

        if(this.aboutOptions[option].loaded == false) {
          var urlToGetSpecieInfo = `${Constants.API_ENCICLOVIDA}v2/especies/${id_specie}${Constants.SPECIE_INFO_HTMLV2}${fuenteFin}`;
          console.log(urlToGetSpecieInfo);
          
          fetch(urlToGetSpecieInfo).then((response) => {
            return response.text();
          }).then((html) => {
            try { } catch (e) {
              Alert.alert("Error en los datos");
            } finally {
              // Obtener el resumen de la especie y pegarlo en el contenedor correspondiente
              this.aboutOptions[option].content = html;
              this.aboutOptions[option].loaded = true;
              this.setState({ spinner: false });
            }
          }).catch(error => {
            this.setState({ spinner: false });
          });
        } else {
          // El contenido ya fue cargado .. 
          this.setState({spinner: false });
        }
      }
    }
  }

  /* Para evitar la recarga de datos de la misma especie ya consultada */
  setAboutIdSpecie = (id_specie) => {
    global.about_id_specie = id_specie;
  }

  // Función para llamar a servicios de enciclovida: Llamar sólo cuando la especie en curso cambia.
  async fetchData(id_specie, about_id_specie) {
    if (id_specie != about_id_specie) {
      this.restartAboutOptions();

      console.log("this.scrollViewRef");
      console.log(this.scrollViewRef.current.state);
      console.log(this.scrollViewRef.current.scrollY);
      //scrollTo(this.scrollViewRef, 0, scroll.value * (100 + 2 * 10), true)
      //this.scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
      
      this.setState({ imagen: "", contenido_render_array: [], spinner: true });
      if (id_specie !== 0) {
        console.log("FETCH - LLAMADA A FOTOS Y RESUMEN");
        var defaultPhoto = "";
        // Obtener las fotos: desde el servicio NaturaLista
        const response = await Helper.fetchAllMedia(id_specie);
        const fotos = await response.fotos;
        const videos = await response.videos;
        const audios = await response.audios;

        defaultPhoto = Helper.getRandomImage(fotos);
        defaultPhoto2 = global.defaultPhoto2;

        global.taxonPhotos = fotos;
        global.taxonVideos = videos;
        global.taxonAudios = audios;
        global.defaultPhoto = defaultPhoto;
        
        if (defaultPhoto2 == "")
          defaultPhoto2 = defaultPhoto

        this.setState({ imagen: defaultPhoto2 });
        //this.scrollToElement(0);
        console.log(global.defaultPhoto2);

        await this.getHTMLSpecieResume(id_specie, 'sin_fuente');

      } else {
        this.setState({ spinner: false, pins: [] });
      }
      this.setAboutIdSpecie(id_specie);
    }
  }

  // se invoca antes de que un componente montado reciba nuevos props
  UNSAFE_componentWillReceiveProps(props) {
    console.log("\n\n - - UNSAFE_componentWillReceiveProps desde AboutScreen- - \n\n");
    //console.log(props.params);
    //this.myScroll.scrollTo({ x: 0, y: position, animated: true });
    //about_id_specie
    //media_id_specie
    //this.viewPager._setPageNumber(0);
    //this.viewPager._setPageIndex(1);
    //console.log(this.viewPager);
    //this.flatListRef.current.scrollTo({ animated: false, x: 0, y: 0 });
   // this.scrollViewRef?.current?.scrollTo({x: 0, y: 0, animated: true});
    //Alert.alert("idProps", this.state.load.toString());
    this.fetchData(global.id_specie, global.about_id_specie);
  }
  
  // Se invoca inmediatamente después de que un componente se monte (se inserte en el árbol)
  componentDidMount() {
    console.log("\n\n - - componentDidMount - - \n\n");
    console.log("id_specie: " + global.id_specie + "  -  about_id_specie: " + global.about_id_specie);
    
    this.fetchData(global.id_specie, global.about_id_specie);
    
    //this.scrollViewRef?.current?.scrollTo({x: 0, y: 0, animated: true});

    const data = ['First Element', 'Second Element' ];
    data.filter((el, idx) => {
      if(el===this.props.id){
        this.scrollToElement(idx);
      }
    })
    
  }

  scrollToElement =(indexOf)=>{
    const node = this._nodes.get(indexOf);
    const position = findNodeHandle(node);
    this.myScroll.scrollTo({ x: 0, y: position, animated: true });
  }

  
  // Se invoca inmediatamente antes de desmontar y destruir un componente
  componentWillUnmount() {

  }

  renderText = (title, i) => {
    return (
      <Text style={styles.text} key={i}>{title}</Text>
    )
  };
  renderTextBold = (title, i) => {
    return (
      <Text style={styles.textBold} key={i}>{title}</Text>
    )
  };
  renderTextItalic = (title, i) => {
    return (
      <Text style={styles.textItalic} key={i}>{title}</Text>
    )
  };
  renderTextBoldItalic = (title, i) => {
    return (
      <Text style={styles.textBoldItalic} key={i}>{title}</Text>
    )
  };

  _renderTab = ({data}) => {
    return (  
      <View style={[ {backgroundColor: 'tramsparent'}]}>
        <Text style={{fontFamily: Fonts.family.base_bold, fontSize: Fonts.size.h2,  color:Colors.blue, padding: 10}}>{data.title}</Text>
      </View>
    )
  }

  _swipeLeft = () => {
    return (  
      <View style={{width:'20%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <Icon2 name="angle-left" color='#404040' style={{ fontSize: 23, padding:0}} />    
        <Icon2 name="angle-left" color='#898888' style={{ fontSize: 23, padding:0}} />      
        <Icon2 name="angle-left" color='#C4C4C4' style={{ fontSize: 23, padding:0}} />     
      </View>
    )
  }

  _swipeRight = () => {
    return (  
      <View style={{width:'20%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <Icon2 name="angle-right" color='#C4C4C4' style={{ fontSize: 23, padding:0}} />     
        <Icon2 name="angle-right" color='#898888' style={{ fontSize: 23, padding:0}} /> 
        <Icon2 name="angle-right" color='#404040' style={{ fontSize: 23, padding:0}} />         
      </View>
    )
  }

  _renderPage = ({data}) => {
    return (  
      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', paddingTop: 10}}>
          {this._swipeLeft()}
          <Text style={{width:'60%', textAlign:'center', fontFamily: Fonts.family.base_bold, fontSize: Fonts.size.h1,  color:Colors.blue, padding: 10}}>{data.title}</Text>
          {this._swipeRight()}
        </View>
        
        <AutoHeightWebView 
          style={{ 
            width: (Dimensions.get('window').width - 30) , 
            marginTop: 10, 
            marginBottom: 40,
          
          }}
          customScript={`
            document.body.style.background = 'transparent';
          `}
          customStyle={styles.customStyleView}
          //source={ { html: this.state.resumen_HTML} } 
          source={ { html: data.content} } 
          scalesPageToFit={false}
          viewportContent={'width=device-width, user-scalable=no'}
          showsVerticalScrollIndicator={true}
        />

     </View>
    )
  }

   _renderTitleChange= (index) => {

    this.setState({spinner: true });
    console.log(index)

    switch(index) {
      case 1:
        this.getHTMLSpecieResume(id_specie, 'sin_fuente');
        break;
      case 2:
        this.getHTMLSpecieResume(id_specie, 'conabio');
        break;
      case 3:
        this.getHTMLSpecieResume(id_specie, 'wikipedia_es');
        break;
      case 4:
        this.getHTMLSpecieResume(id_specie, 'iucn');
        break;
      case 5:
        this.getHTMLSpecieResume(id_specie, 'wikipedia_en');
        break;
      default:
        this.getHTMLSpecieResume(id_specie, 'sin_fuente');
        break;
    }
  }

  getImagen_not_found = () => {
    return(
      <ImageBackground 
        source={{uri: 'ic_imagen_not_found'}} 
        resizeMode='contain'
        style={[{flex: 1, flexDirection: "column" }, styles.notFoundImage]} 
        imageStyle={{opacity:0.3}} > 
      </ImageBackground>
    );
  }

  render() {
    
    const defaultimage = this.state.imagen == '' ? 'ic_imagen_not_found' : this.state.imagen;
    const data = ['First Element', 'Second Element'];
 
    return (
      <View style={[styles.mainScreen]}>
        <NavBar menuBlackButton={true} infoButton={true} />
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Cargando...'}
            textStyle={{ color: '#FFF' }}
          />

          <View style={{flex: 1}}>

            <ParallaxScrollView
              backgroundColor="trasparent"
              contentBackgroundColor="white"
              parallaxHeaderHeight={400}
              stickyHeaderHeight={5}
              backgroundScrollSpeed={1}
              fadeOutForeground={true}
              outputScaleValue={70}
              overScrollMode="never"
              ref={this.scrollViewRef}

              renderForeground={() => (
                <View ref={ref => this._nodes.set('First Element', 0)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                 
                 { 
                  defaultimage == 'ic_imagen_not_found' 
                    ? this.getImagen_not_found() 
                    : <ImageBackground 
                        source={{uri: defaultimage}} 
                        resizeMode='cover'
                        style={[{flex: 1, flexDirection: "column" }, styles.image]} 
                        imageStyle={{opacity:1}} > 
                      </ImageBackground>
                 }

                  <View style={{flexDirection:'row', marginTop: 0, backgroundColor: Colors.blue, width: '100%'}}>
                    <Text style={{ padding:0, fontFamily: Fonts.family.base_bold, fontSize:Fonts.size.h2, textAlign:'center', color:'white', backgroundColor: Colors.green, width: '100%'}}>{}</Text>
                  </View>
                 
                </View>
              )}>
              <View style={{ height: 'auto'}}>
                <ViewPager
                    data={this.aboutOptions} 
                    renderPage={this._renderPage}
                    onPageChange={this._renderTitleChange}
                    initialPage={{key: 'page_1'}}
                    ref={(viewPager) => {this.viewPager = viewPager}}
                />
              </View>
            </ParallaxScrollView>
          </View>

        </View>
        <TabBar shownav={true} selected="About" />
      </View>
    );
  }
}

//make this component available to the app
export default withNavigation(AboutScreen);

