const Listas = {

    listsParams: {
        SpeciesRisk: {
            filter: "?nom_ids=14&nom_ids=15&nom_ids=16&nom_ids=17",
            title: "Especies en riesgo", 
            icon: [
                {name: "Probablemente extinta en el medio silvestre (E)", icon: "probablemente-extinta-en-el-medio-silvestre-e", order: 1, selected: false},
                {name: "En peligro de extinción (P)", icon: "en-peligro-de-extincion-p", order: 1, selected: false},
                {name: "Amenazada (A)", icon: "amenazada-a", order: 1, selected: false},
                {name: "Sujeta a protección especial (Pr)", icon: "sujeta-a-proteccion-especial-pr", order: 1, selected: false},
            ]
        },
        SpeciesExotic: {
            filter: "?dist=6",
            title: "Exóticas invasoras",
            icon: [
                {name: "Exótica-Invasora", icon: "exotica-invasora"}
            ]
        },
        SpeciesEndemic: {
            filter: "?dist=3",
            title: "Especies endémicas",
            icon: [{name: "Endémica", icon: "endemica"}]
        },
        SpeciesUses: {
            filter: "?uso=11-4-0-0-0-0-0&uso=11-16-0-0-0-0-0&uso=11-5-0-0-0-0-0&uso=11-40-1-0-0-0-0&uso=11-40-2-0-0-0-0&uso=11-8-0-0-0-0-0&uso=11-47-0-0-0-0-0&uso=11-9-0-0-0-0-0&uso=11-10-0-0-0-0-0&uso=11-11-0-0-0-0-0&uso=11-13-0-0-0-0-0&uso=11-15-0-0-0-0-0&uso=11-14-0-0-0-0-0",
            title: "Usos y agrobiodiversidad",
            icon: [
                {name: "Ambiental", icon: "-"},
                {name: "Artesanía", icon: "-"},
                {name: "Combustible", icon: "-"},
                {name: "Consumo animal", icon: "-"},
                {name: "Consumo humano", icon: "-"},
                {name: "Industrial", icon: "-"},
                {name: "Maderable", icon: "-"},
                {name: "Manejo de plagas", icon: "-"},
                {name: "Materiales", icon: "-"},
                {name: "Medicinal", icon: "-"},
                {name: "Melífera", icon: "-"},
                {name: "Ornamental", icon: "-"},
                {name: "Sociales/religiosos", icon: "-"},
            ]
        },
        SpeciesByLocation: {
            filter: "",
            title: "BY L",
            icon: ""
        }
    },

    DataFilterReinos: [
        {id: 1, name: "Animales", img_icon: "ic_re_animales", icon: 'animalia', order: 1, selected: false },
        {id: 4, name: "Hongos", img_icon: "ic_re_hongos", icon: 'fungi',  order: 2, selected: false },
        {id: 2, name: "Plantas", img_icon: "ic_re_plantas", icon: 'plantae',  order: 3, selected: false},
        {id: 3, name: "Bacterias", img_icon: "ic_re_bacterias", icon: 'prokaryotae',  order: 4, selected: false},
        {id: 5, name: "Protozoarios", img_icon: "ic_re_protozoarios", icon: 'protoctista',  order: 5, selected: false},
    ],
      
    DataFilterAnimales: [
        {id: 22653, name: "Mamíferos", img_icon: "ic_ga_mamiferos", icon: 'mammalia',  order: 1, selected: false },
        {id: 22655, name: "Aves", img_icon: "ic_ga_aves", icon: 'aves',  order: 2, selected: false},
        {id: 22647, name: "Reptiles", img_icon: "ic_ga_reptiles", icon: 'reptilia',  order: 3, selected: false},
        {id: 22654, name: "Anfibios", img_icon: "ic_ga_anfibios", icon: 'amphibia',  order: 4, selected: false},
        {id: 213482, name: "Peces con aletas radiadas", img_icon: "ic_ga_peces", icon: 'actinopterygii',  order: 5, selected: false},
        {id: 22987, name: "Lampreas", img_icon: "ic_ga_lamprea", icon: 'petomyzontidae',  order: 6, selected: false},
        {id: 22651, name: "Peces bruja	", img_icon: "ic_ga_peces_bruja", icon: 'myxini',  order: 7, selected: false},
        {id: 22650, name: "Tiburones y rayas", img_icon: "ic_ga_tiburones", icon: 'chondrichthyes',  order: 8, selected: false},
        {id: 66500, name: "Arañas, alacranes y parientes", img_icon: "ic_ga_alacranes", icon: 'arachnida',  order: 9, selected: false},
        {id: 16912, name: "Insectos", img_icon: "ic_ga_insectos", icon: 'insecta',  order: 10, selected: false},
        {id: 40672, name: "Caracoles, almejas y pulpos", img_icon: "mollusca", icon: 'mollusca',  order: 11, selected: false},
        {id: 56646, name: "Camarones, cangrejos y parientes", img_icon: "ic_ga_camarones", icon: 'crustacea',  order: 12, selected: false},
        {id: 40658, name: "Gusanos anillados", img_icon: "ic_ga_gusanos", icon: 'annelida',  order: 13, selected: false},
        {id: 66499, name: "Milpiés, cienpiés y parientes", img_icon: "ic_ga_milpies", icon: 'myriapoda',  order: 14, selected: false},
        {id: 129550, name: "Estrellas y erizos de mar", img_icon: "ic_ga_estrellas", icon: 'echinodermata',  order: 15, selected: false  },
        {id: 40659, name: "Corales, medusas y parientes", img_icon: "ic_ga_corales", icon: 'cnidaria',  order: 16, selected: false},
        {id: 40657, name: "Esponjas y parientes", img_icon: "ic_ga_esponjas", icon: 'porifera',  order: 17, selected: false},
    ],
      
    DataFilterPlantas: [
        {id: 4, name: "Hongos", img_icon: "ic_re_hongos", icon: 'fungi',  order: 2, selected: false },
        {id: 135306,name: "Magnolias, margaritas y parientes",img_icon: "ic_gp_magnolias",icon: 'magnoliidae',  order: 7,selected: false},
        {id: 135324,name: "Pastos, palmeras y parientes",img_icon: "ic_gp_pastos",icon: 'lilianae',  order: 6,selected: false},
        {id: 135314,name: "Cícadas",img_icon: 'ic_gp_cycadidae', icon: "cycadidae", order: 5,selected: false},
        {id: 135316,name: "Coníferas y parientes",img_icon: "ic_gp_coniferas",icon: 'pinidae',  order: 4,selected: false},
        {id: 135313, name: "Helechos y parientes", img_icon: "ic_gp_helechos", icon: 'polypodiidae',  order: 3,selected: false},
        {id: 135299, name: "Antoceros", img_icon: "ic_gp_antoceros", icon: 'anthocerotophyta',  order: 2, selected: false },
        {id: 135296,name: "Musgos, hepáticas y parientes", img_icon: "ic_gp_musgos", icon: 'bryophyta',  order: 1, selected: false},
    ],

    // Tipo de distribución:
    T_DISTRIBUCION: [
        {id:"3", name: "Endémica", icon: "endemica", order: 1, selected: false},
        {id:"7", name: "Nativa", icon: "nativa", order: 1, selected: false},
        {id:"10", name: "Exótica", icon: "exotica", order: 1, selected: false},
        {id:"6", name: "Exótica-Invasora", icon: "exotica-invasora", order: 1, selected: false},
    ],
    
    // Norma Oficial Mexicana (NOM-059):
    T_NOM_059: [
        {id:16, name: "Probablemente extinta en el medio silvestre (E)", icon: "probablemente-extinta-en-el-medio-silvestre-e", order: 1, selected: false},
        {id:14, name: "En peligro de extinción (P)", icon: "en-peligro-de-extincion-p", order: 1, selected: false},
        {id:15, name: "Amenazada (A)", icon: "amenazada-a", order: 1, selected: false},
        {id:17, name: "Sujeta a protección especial (Pr)", icon: "sujeta-a-proteccion-especial-pr", order: 1, selected: false},
    ],
    
    // Unión Internacional para la Conservación de la Naturaleza (IUCN):
    T_IUCN: [
        {id:25, name: "Extinto (EX)", icon: "extinto-ex", order: 1, selected: false},
        {id:26, name: "Extinto en estado silvestre (EW)", icon: "extinto-en-estado-silvestre-ew", order: 1, selected: false},
        {id:27, name: "En peligro crítico (CR)", icon: "en-peligro-critico-cr", order: 1, selected: false},
        {id:28, name: "En peligro (EN)", icon: "en-peligro-en", order: 1, selected: false},
        {id:29, name: "Vulnerable (VU)", icon: "vulnerable-vu", order: 1, selected: false},
    ],
    
    // Comercio Internacional (CITES):
    T_CITES: [
        {id:22, name: "Apéndice I", icon: "apendice-i", order: 1, selected: false},
        {id:23, name: "Apéndice II", icon: "apendice-ii", order: 1, selected: false},
        {id:24, name: "Apéndice III", icon: "apendice-iii", order: 1, selected: false},
    ],
    
    // Evaluación CONABIO:
    T_EVAL_CONABIO: [
        {id:1102, name: "En peligro de extinción (P)", icon: "en-peligro-de-extincion-p-evaluacion-conabio", order: 1, selected: false},
        {id:1103, name: "Amenazada (A)", icon: "amenazada-a-evaluacion-conabio", order: 1, selected: false},
        {id:1104, name: "Sujetas a protección especial (Pr)", icon: "sujetas-a-proteccion-especial-pr-evaluacion-conabio", order: 1, selected: false},
    ], 
    
    // USO
    T_USO: [
        {id:"11-4-0-0-0-0-0", name: "Ambiental", icon: "-", order: 1, selected: false},
        {id:"11-16-0-0-0-0-0", name: "Artesanía", icon: "-", order: 1, selected: false},
        {id:"11-5-0-0-0-0-0", name: "Combustible", icon: "-", order: 1, selected: false},
        {id:"11-40-1-0-0-0-0", name: "Consumo animal", icon: "-", order: 1, selected: false},
        {id:"11-40-2-0-0-0-0", name: "Consumo humano", icon: "-", order: 1, selected: false},
        {id:"11-8-0-0-0-0-0", name: "Industrial", icon: "-", order: 1, selected: false},
        {id:"11-47-0-0-0-0-0", name: "Maderable", icon: "-", order: 1, selected: false},
        {id:"11-9-0-0-0-0-0", name: "Manejo de plagas", icon: "-", order: 1, selected: false},
        {id:"11-10-0-0-0-0-0", name: "Materiales", icon: "-", order: 1, selected: false},
        {id:"11-11-0-0-0-0-0", name: "Medicinal", icon: "-", order: 1, selected: false},
        {id:"11-13-0-0-0-0-0", name: "Melífera", icon: "-", order: 1, selected: false},
        {id:"11-15-0-0-0-0-0", name: "Ornamental", icon: "-", order: 1, selected: false},
        {id:"11-14-0-0-0-0-0", name: "Sociales/religiosos", icon: "-", order: 1, selected: false},
    ], 
    
    
    // Forma de crecimiento (solo plantas)
    T_FORMA_CRECIMIENTO: [
        {id:"18-14-0-0-0-0-0", name: "Arborescente", icon: "-", order: 1, selected: false},
        {id:"18-2-0-0-0-0-0", name: "Arbusto", icon: "-", order: 1, selected: false},
        {id:"18-15-0-0-0-0-0", name: "Bejuco", icon: "-", order: 1, selected: false},
        {id:"18-6-0-0-0-0-0", name: "Columnar", icon: "-", order: 1, selected: false},
        {id:"18-9-0-0-0-0-0", name: "Epilítica", icon: "-", order: 1, selected: false},
        {id:"18-7-0-0-0-0-0", name: "Epífita", icon: "-", order: 1, selected: false},
        {id:"18-16-0-0-0-0-0", name: "Geófita", icon: "-", order: 1, selected: false},
        {id:"18-3-0-0-0-0-0", name: "Hierba", icon: "-", order: 1, selected: false},
        {id:"18-5-0-0-0-0-0", name: "Liana", icon: "-", order: 1, selected: false},
        {id:"18-18-0-0-0-0-0", name: "Palma", icon: "-", order: 1, selected: false},
        {id:"18-10-0-0-0-0-0", name: "Parásita", icon: "-", order: 1, selected: false},
        {id:"18-11-0-0-0-0-0", name: "Rastrera", icon: "-", order: 1, selected: false},
        {id:"18-8-0-0-0-0-0", name: "Rosetófila", icon: "-", order: 1, selected: false},
        {id:"18-12-0-0-0-0-0", name: "Suculenta", icon: "-", order: 1, selected: false},
        {id:"18-4-0-0-0-0-0", name: "Sufrútice", icon: "-", order: 1, selected: false},
        {id:"18-13-0-0-0-0-0", name: "Taloide", icon: "-", order: 1, selected: false},
        {id:"18-17-0-0-0-0-0", name: "Trepadora", icon: "-", order: 1, selected: false},
        {id:"18-1-0-0-0-0-0", name: "Árbol", icon: "-", order: 1, selected: false},
    ], 
    
    
    // Ambiente
    T_AMBIENTE: [
        {id:1024, name: "Marino", icon: "marino", order: 1, selected: false},
        {id:1025, name: "Dulceacuícola", icon: "dulceacuicola", order: 1, selected: false},
        {id:1026, name: "Terrestre", icon: "terrestre", order: 1, selected: false},
        {id:1027, name: "Salobre", icon: "salobre", order: 1, selected: false},
        {id:1207, name: "Salino", icon: "-", order: 1, selected: false},
        {id:1208, name: "Hiposalino", icon: "-", order: 1, selected: false},
        {id:1209, name: "Mesosalino", icon: "-", order: 1, selected: false},
        {id:1210, name: "Hipersalino", icon: "-", order: 1, selected: false}, 
    ],
    
    InfoArray: [
        {id: 10, name: "Exótica", iconFont: 'exotica', icon:"ic_10",title: "Tipo de distribución", order: 1 },
        {id: 7, name: "Nativa", iconFont: 'nativa', icon:"ic_7dd", title: "Tipo de distribución", order: 2 },
        {id: 6, name: "Exótica - Invasora", iconFont: 'exotica-invasora', icon:"ic_6", title: "Tipo de distribución", order: 3 },
        {id: 3, name: "Endémica", iconFont: 'endemica', icon:"ic_3", title: "Tipo de distribución", order: 4 },
        {id: 17, name: "Sujeta a protección especial (Pr)", iconFont: 'sujeta-a-proteccion-especial-pr', icon:"ic_17", title: "Categoría nacional de riesgo", order: 5 },
        {id: 15, name: "Amenazada (A)", iconFont: 'amenazada-a', icon:"ic_15", title: "Categoría nacional de riesgo", order: 6 },
        {id: 14, name: "En peligro de extinción (P)", iconFont: 'en-peligro-de-extincion-p', icon:"ic_14", title: "Categoría nacional de riesgo", order: 7 },
        {id: 16, name: "Probablemente extinta en el medio silvestre (E)", iconFont: 'probablemente-extinta-en-el-medio-silvestre-e', icon:"ic_16", title: "Categoría nacional de riesgo", order: 8 },
        {id: 29, name: "Vulnerable (VU)", iconFont: 'vulnerable-vu', icon:"ic_29", title: "Categoría internacional de riesgo", order: 9 },
        {id: 28, name: "En peligro (EN)", iconFont: 'en-peligro-en', icon:"ic_28", title: "Categoría internacional de riesgo", order: 10 },
        {id: 27, name: "En peligro crítico (CR)", iconFont: 'en-peligro-critico-cr', icon:"ic_27", title: "Categoría internacional de riesgo", order: 11 },
        {id: 26, name: "Extinto en estado silvestre (EW)", iconFont: 'extinto-en-estado-silvestre-ew', icon:"ic_26", title: "Categoría internacional de riesgo", order: 12 },
        {id: 25, name: "Extinto (EX)", iconFont: 'extinto-ex', icon:"ic_25", title: "Categoría internacional de riesgo", order: 13 },
        {id: 22, name: "Apéndice I", iconFont: 'apendice-i', icon:"ic_22", title: "Protegidas del comercio internacional", order: 14 },
        {id: 23, name: "Apéndice II", iconFont: 'apendice-ii', icon:"ic_23", title: "Protegidas del comercio internacional", order: 15 },
        {id: 24, name: "Apéndice III", iconFont: 'apendice-iii', icon:"ic_24", title: "Protegidas del comercio internacional", order: 16 },
        {id: 1033, name: "Prioritaria con grado alta", iconFont: 'alta', icon:"ic_1033", title: "Prioritarias para la conservación", order: 17 },
        {id: 1034, name: "Prioritaria con grado media", iconFont: 'media', icon:"ic_1034", title: "Prioritarias para la conservación", order: 18 },
        {id: 1035, name: "Prioritaria con grado menor", iconFont: 'menor', icon:"ic_1053", title: "Prioritarias para la conservación", order: 19 },
        {id: 1026, name: "Terrestre", iconFont: 'terrestre', icon:"ic_1026", title: "Ambiente", order: 20 },
        {id: 1025, name: "Dulceacuícola", iconFont: 'dulceacuicola', icon:"ic_1025", title: "Ambiente", order: 21 },
        {id: 1024, name: "Marino", iconFont: 'marino', icon:"ic_1024", title: "Ambiente", order: 23 },
        {id: 1027, name: "Salobre", iconFont: 'salobre', icon:"ic_1027", title: "Ambiente", order: 24 },
    ]
}


export default Listas;