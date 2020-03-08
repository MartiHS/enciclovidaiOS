export default class Helper {
  
  // FUNCION PARA ARMAR EL JSON DE LA GALERÍA
  static createJSONImagesFor_image_view(JSONImages) {
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
}