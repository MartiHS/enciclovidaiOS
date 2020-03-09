import Constants from '../Config/Constants';

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



  // Obtener imágenes de Naturalista
  static fetchDataFromNaturalista(id_especie) {
    var linkToCall = `${Constants.API_ENCICLOVIDA}${id_especie}/${Constants.NATURALISTA_ENDPOINT}`;
    return fetch(linkToCall).then(res => res.json()).then((json) => {
      console.log("Se realizó una llamada a: " + linkToCall);
      if(json.estatus) {
        //console.log(json.fotos)
        return json.fotos;
      } else {
        return [];
      }
    }).catch(error => {
      // En el caso de que el servicio fotos-naturalista no devuelva fotos, regresar un arreglo vacío
      return [];
    })
  }

  // Obtener imágeens desde Banco De Imágenes
  static fetchDataFromBDI(id_especie) {
      var linkToCall = `${Constants.API_ENCICLOVIDA}${id_especie}/${Constants.BDI_ENDPOINT}`;
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
  static getRandomImage(images, bdi) {
      var randomImage = 0;
      if(images.length > 0) {
        var maxValue  = images.length;
        randomImage = Math.floor(Math.random() * maxValue);
        if(bdi)
          return images[randomImage].medium_url;
        else
          return images[randomImage].photo.medium_url;
      } else {
        return "";
      }
  }

  static getDataImages(images, bdi) {
    result = images.map(data => {
      if(bdi) {
        return {
          id: 0,
          imagen: data.medium_url,
          text: data.attribution,
        };
      } else {
        return {
          id: data.photo.id,
          imagen: data.photo.medium_url,
          text: data.photo.attribution,
        };
      }
    });

    return result;
  }




  async fetchPhotos(id_specie, about_id_specie) {

    if (id_specie != about_id_specie) {
      this.setState({ imagen: "", contenido_render_array: [], spinner: true, data: []});
      if (id_specie !== 0) {

        try {

          // Obtener las fotos: desde el servicio NaturaLista
          var fotos = await this.fetchDataFromNaturalista(id_specie);
          // Si el servicio devolvió {}, llamar a BDI
          if(fotos.length > 0) {
            fotos = await this.fetchDataFromBDI(id_specie) 
          }


        } catch (error) {

          console.error(error);
        }
        finally {
          this.setState({ data: result, spinner: false, listImages: Helpers.createJSONImagesFor_image_view(result)});
        }

      } else {
        this.setState({ spinner: false, pins: []});
      }
      this.setAboutIdSpecie(id_specie);
    }
  }



  async fetchData(specie_id, media_specie_id) { 
    if (specie_id !== media_specie_id) {
      
      this.setState({ spinner: true, data: [] });

      let result = [];
      if (specie_id !== 0) {




        try {
          const response = await fetch(`${Constants.API_ENCICLOVIDA}${specie_id}/fotos-naturalista.json`);
          
          console.log("\n**Se realizaá la llamada al sifuiente servicio: ");
          console.log(`${Constants.API_ENCICLOVIDA}${specie_id}/fotos-naturalista.json`); 
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
          this.setState({ data: result, spinner: false, listImages: Helpers.createJSONImagesFor_image_view(result)});
        }
      } else {
        this.setState({ spinner: false });
      }
    }
  }



}