



function getColor(data)  {
    return data == 1 ? 'rgba(255,0,0,1)' :
           data == 2 ? 'rgba(0,0,240,0.6)' :  
           data == 3 ? 'rgba(255,0,0,1)' :
           data == 4 ? 'rgba(0,0,240,0.6)' :
           data == 5 ? 'rgba(255,0,0,1)' :
           data == 6 ? 'rgba(0,0,240,0.6)' :
           data == 7 ? 'rgba(255,0,0,1)' :
           data == 8 ? 'rgba(0,0,240,0.6)' :
           data == 9 ? 'rgba(255,0,0,1)' :
           data == 10 ? 'rgba(0,0,240,0.6)' :
           data == 11 ? 'rgba(255,0,0,1)' :
           data == 12 ? 'rgba(0,0,240,0.6)' :
           data == 13 ? 'rgba(255,0,0,1)' :
           data == 14 ? 'rgba(0,0,240,0.6)' :
           data == 15 ? 'rgba(255,0,0,1)' :
           data == 16 ? 'rgba(0,0,240,0.6)' :
           data == 17 ? 'rgba(255,0,0,1)' :
           data == 18 ? 'rgba(0,0,240,0.6)' :
           data == 19 ? 'rgba(255,0,0,1)' :
           data == 20 ? 'rgba(0,0,240,0.6)' :
           data == 21 ? 'rgba(255,0,0,1)' :
           data == 22 ? 'rgba(0,0,240,0.6)' :
           data == 23 ? 'rgba(255,0,0,1)' :
           data == 24 ? 'rgba(0,0,240,0.6)' :
           data == 25 ? 'rgba(255,0,0,1)' :
           data == 26 ? 'rgba(0,0,240,0.6)' :  '#FEB24C';
}


function getDash(data)  {
    return data == 1 ? '1' :
           data == 2 ? '3' :  
           data == 3 ? '1' :
           data == 4 ? '3' :
           data == 5 ? '1' :
           data == 6 ? '3' :
           data == 7 ? '1' :
           data == 8 ? '3' :
           data == 9 ? '1' :
           data == 10 ? '3' :
           data == 11 ? '1' :
           data == 12 ? '3' :
           data == 13 ? '1' :
           data == 14 ? '3' :
           data == 15 ? '1' :
           data == 16 ? '3' :
           data == 17 ? '1' :
           data == 18 ? '3' :
           data == 19 ? '1' :
           data == 20 ? '3' :
           data == 21 ? '1' :
           data == 22 ? '3' :
           data == 23 ? '1' :
           data == 24 ? '3' :
           data == 25 ? '1' :
           data == 26 ? '3' :  '2';
}



function style(feature) {
    return {
        weight: 3,
        opacity: 1,
        color: getColor(feature.properties.id),
        dashArray: getDash(feature.properties.id),
       
    };
}


var geojsonMarkerOptions = {
    radius: 7,
    fillColor: "#000000",
    color: "#ffffff",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};



var map = L.map('map').setView([-31.6166, -60.7117], 13);

map.options.minZoom = 12;
map.options.maxZoom = 17;


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




var lineasColectivosLayer = L.geoJson(colectivos,{
    style: style,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h4 class='text-center'>" + feature.properties.nombre + "</h4><p class='text-center'>" +  feature.properties.descripcio + "</p><p class='text-center'>" + (feature.properties.length/1000).toFixed(2) +
         " kms</p>") ;
     }
}).addTo(map);


var extremosLayer = L.geoJson(extremos,{
    onEachFeature: function(feature, layer) {
        var parada;
        if( feature.properties.inicio === 1){
            parada = "SALIDA"
        }else{
            parada = "FINAL"
        }
        layer.bindPopup("<h4 class='text-center'>" + feature.properties.linea + "</h4><p class='text-center'>" + parada + "</p>") ;
     },
     pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);



const featureSelected = (e) => {

    lineasColectivosLayer.remove();
    extremosLayer.remove();
   
   if( e == '0') {   
        lineasColectivosLayer = L.geoJson(colectivos,{
            style: style,
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<h4 class='text-center'>" + feature.properties.nombre + "</h4><p class='text-center'>" +  feature.properties.descripcio + "</p><p class='text-center'>" + (feature.properties.length/1000).toFixed(2) +
                " kms</p>") ;
            }
        }).addTo(map);

        extremosLayer = L.geoJson(extremos,{
            onEachFeature: function(feature, layer) {
                var parada;
                if( feature.properties.inicio === 1){
                    parada = "SALIDA"
                }else{
                    parada = "FINAL"
                }
                layer.bindPopup("<h4 class='text-center'>" + feature.properties.linea + "</h4><p class='text-center'>" + parada + "</p>") ;
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(map);

   } else {   
        lineasColectivosLayer = L.geoJson(colectivos,{
            style: style,
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<h4 class='text-center'>" + feature.properties.nombre + "</h4><p class='text-center'>" +  feature.properties.descripcio + "</p><p class='text-center'>" + (feature.properties.length/1000).toFixed(2) + 
                " kms</p>") ;
            },
            filter: function(feature) {
                if (feature.properties.nombre == e) {
                    map.flyTo([feature.properties.MEAN_Y, feature.properties.MEAN_X], 13);
                    return true;
                }
            },
        }).addTo(map);

        extremosLayer = L.geoJson(extremos,{
            filter: function(feature) {
                if (feature.properties.linea == e) return true;
            },
            onEachFeature: function(feature, layer) {
                var parada;
                if( feature.properties.inicio === 1){
                    parada = "SALIDA"
                }else{
                    parada = "FINAL"
                }
                layer.bindPopup("<h4 class='text-center'>" + feature.properties.linea + "</h4><p class='text-center'>" + parada + "</p>") ;
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(map);
   }
   







}