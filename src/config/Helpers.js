import Constants from './Constants';

export default class Helper {
  
  // FUNCION PARA ARMAR EL JSON DE LA GALERÍA
  static createJSONImagesFor_image_view(JSONImages) {
    try {
      var listImages = [];
      for(var i = 0; i< JSONImages.length; i++) {    
          var image = {
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



  // Obtener imágenes de Naturalista
  static fetchAllMedia(id_especie) {

    let linkToCall = `${Constants.API_ENCICLOVIDA}v2/especies/${id_especie}/media`;

    return fetch(linkToCall).then(res => res.json()).then((json) => {
      console.log("Se realizó una llamada a: " + linkToCall);
        let allMedia = {
          fotos: [],
          videos: [],
          audio: []
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
  static getDataImages(images) {
    result = images.map(data => {
      
      return {
        //id: data.photo.id,
        thumb: data.thumb_url,
        imagen: data.large_url,
        text: data.atribucion,
      };
    
    });

    return result;
  }

}