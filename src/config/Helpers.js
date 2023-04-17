import Constants from './Constants';
import Listas from './Listas';

export default class Helper {
  
  // FUNCION PARA ARMAR EL JSON DE LA GALERÍA
  static createJSONImagesFor_image_view(JSONImages) {
    try {
      var listImages = [];
      for(var i = 0; i< JSONImages.length; i++) {    
          var image = {
            source: {
              uri: JSONImages[i]['content']
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



  // Obtener imágenes de Naturalista
  static fetchAllMedia(id_especie) {

    let linkToCall = `${Constants.API_ENCICLOVIDA}v2/especies/${id_especie}/media`;

    return fetch(linkToCall).then(res => res.json()).then((json) => {
      console.log("Se realizó una llamada a: " + linkToCall);
        let allMedia = {
          fotos: [],
          videos: [],
          audios: []
        }

        if( json.fotos ) {
          allMedia.fotos = json.fotos;
        }
        if( json.videos ) {
          allMedia.videos = json.videos;
        }
        if( json.audios ) {
          allMedia.audios = json.audios;
        }

        
        return allMedia;
    
    }).catch(error => {
      // En el caso de que el servicio fotos-naturalista no devuelva fotos, regresar un arreglo vacío
      return [];
    })
  }

  // Obtener imágeens desde Banco De Imágenes
  static fetchDataFromBDI(id_especie) {
      var linkToCall = `${Constants.API_ENCICLOVIDA_ESPECIES}${id_especie}/${Constants.BDI_ENDPOINT}`;
      return fetch(linkToCall).then(res => res.json()).then((json) => {
        console.log("Se realizó una llamada a: " + linkToCall);
        if(json.estatus) {
          return json.fotos;
        } else {
          return [];
        }
      }).catch(error => {
        // En el caso de que el servicio BDI no devuelva fotos, regresar un arreglo vacío
        return [];
      })
  }

  // Función para regresar una imágen aleatoria en la presentación del "About"
  static getRandomImage(images) {
      var randomImage = 0;
      if(images.length > 0) {
        var maxValue  = images.length;
        randomImage = Math.floor(Math.random() * maxValue);
        return images[randomImage].large_url;
      } else {
        return "";
      }
  }

  // Obtener el Data de images para usar en FlatList
  static getDataImages(images, videos, audios) {

    let allMedia = []
    let media = {}

    try {
      if (images.length >= 0){
        media = { title: 'Fotos', content: images.map(data => {
          return {
            thumb: data.thumb_url,
            content: data.large_url,
            text: data.atribucion
          };
        })};
        allMedia.push(media)
      }
       
    } catch(e) { }


    try {
      
      if (videos.length >= 0){
        media = { title: 'Videos', content: videos.map(data => {
          return {
            thumb: data.thumb_url,
            content: data.video_url,
            text: data.atribucion
          };
        })};
  
        allMedia.push(media)
      }
 
    } catch(e) { }

    try {

      if (audios.length >= 0){
        media = { title: 'Audios', content: audios.map(data => {
          
          let losAudios = "";
          
         
          if( data.audio ) {
            losAudios = data.audio
           }

          if( data.audio_url ) {
            losAudios = data.audio_url
          }

          return {
            thumb: data.thumb_url,
            content: losAudios,
            text: data.atribucion
          };
        })};
  
        allMedia.push(media)
      }

    } catch(e) { 
      console.log(e)
    }

    return allMedia;
  }

   // Función para resetear filtros
  static resteFilters() {
    console.log("Se van a resetear los filtros");
    global.filtro = "";
    global.filtroIcons =  {};

    global.gFiltro = "";
    global.gFiltroIcons =  {};
    
    global.title = ""
    global.listSpecies = ""
    global.subtitle = "";
    global.locationData;

    global.ListAnimales = Listas.DataFilterAnimales;
    global.ListPlantas = Listas.DataFilterPlantas;
    global.id_specie = 0;


    global.taxonPhotos = [];
    global.taxonVideos = [];
    global.taxonAudios = [];
    global.defaultPhoto = "";
    global.defaultPhoto2 = "";


    global.sharedUrl = "";
  }

   // Función para aplicar filtros
   static applyGFilters(speciesClass) {
    console.log("Se aplicarán filtros GLOBALES");

    global.gFiltro = Listas.listsParams[speciesClass].filter;
    global.gFiltroIcons = Listas.listsParams[speciesClass].icon;
    global.title = Listas.listsParams[speciesClass].title;
    global.listSpecies = speciesClass;


    global.ListAnimales = Listas.DataFilterAnimales;
    global.ListPlantas = Listas.DataFilterPlantas;
    global.id_specie = 0;


    global.subtitle = "";

  }




}



