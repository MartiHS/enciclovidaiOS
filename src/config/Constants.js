const constants = {
    API_ENCICLOVIDA: 'https://api.enciclovida.mx/',
    API_ENCICLOVIDA_ESPECIES: 'https://enciclovida.mx/especies/',
    NATURALISTA_ENDPOINT: 'fotos-naturalista.json',
    BDI_ENDPOINT: 'fotos-bdi.json',
    SPECIE_INFO_ENDPOINT: 'https://api.enciclovida.mx/especie/descripcion/',
    SPECIE_INFO_HTML: '/descripcion-app',
    RESULT_CATEGORIES:[
        'especie', 'subespecie', 
        'variedad', 'subvariedad', 
        'forma', 'subforma', 
        'reino', 'subreino',
        'division', 'subdivision',
        'superphylum', 'phylum', 'subphylum',
        'superclase', 'clase','subclase', 'infraclase',
        'grado',
        'superorden', 'orden', 'suborden', 'infraorden',
        'superfamilia', 'familia',  'subfamilia',
        'supertribu', 'tribu', 'subtribu',
        'genero', 'subgenero', 
        'seccion', 'subseccion',
        'serie', 'subserie',
    ],
    RESULT_LOCATIONS:[
        'municipio',
        'estado',
        'anp',
        
    ],

    DEFAULT_REGION: {
        latitude: 24.286809,
        longitude: -102.817436,
        //latitude: 17.556474,
        //longitude: -96.808699,
        latitudeDelta: 18.612920,
        longitudeDelta: 36.986230,
    }
}
 
export default constants;