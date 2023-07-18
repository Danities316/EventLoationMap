  // Declare global variables for the marker and vector source
  var marker;
  var vectorSource;



  var polyline = [
    "wcauHspjbBBC@G@G?GAGAECECAG?I@m@HE@",
    "cfauHcrjbBuPoEc\\_GiSiOhCg^bNea@pb@bK|b@hRx^|Ndj@bBzO~Sz]ff@`YhRpYqG",
    "y~ztHayibBKIIIa@]EAC@]x@ABGPMVGPABUl@M^Sj@Qv@MIOIGCECVwAFe@Di@DyA@]@k@?C",
    "{d{tHo|ibB}F~iAg\\`d@_]jV}b@eI",
    "_l~tHo~ebBl@?n@A`Ca@bAAt@l@bAl@Ct@R|KBjAFzAAhB@jA"
  ].join('');
  // var por = [
  //   [6.499891570649146, 3.1007006643398096],
  //   [6.483517741469258, 3.1755450198019277],
  //   [6.457591424877116, 3.2757952573933875],
  //   [6.513536021119139, 3.3307268944298047],
  //   [6.592666494064086, 3.380852013225535],
  //   [6.6185858067110015, 3.457069659613563],
  //   [6.63154495319358, 3.5085680693352033]
  // ]
  //generating polyline
  // var way = new ol.format.Polyline({
  //   factor: 1e6
  // }).writeGeometry(new ol.geom.LineString(por));
  // var pol = 'y`g|DgbvkKwdqCj~^sxbEjsq@ghjBqglBy{`BspyCszsC}rq@sqcB}hX'

  // Initialize and display the map
  function initMap() {


    var route = /** @type {ol.geom.LineString} */ (new ol.format.Polyline({
      factor: 1e6
    }).readGeometry(polyline, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }));
    // console.log(way)
    var routeCoords = route.getCoordinates();
    var routeLength = routeCoords.length;

    var routeFeature = new ol.Feature({
      type: 'route',
      geometry: route
    });
    var geoMarker = new ol.Feature({
      type: 'geoMarker',
      geometry: new ol.geom.Point(routeCoords[0])
    });
    var startMarker = new ol.Feature({
      type: 'icon',
      geometry: new ol.geom.Point(routeCoords[0])
    });
    var endMarker = new ol.Feature({
      type: 'icon',
      geometry: new ol.geom.Point(routeCoords[routeLength - 1])
    });
    //styling the routes, icon and the geoMakar
    var styles = {
      'route': new ol.style.Style({
        stroke: new ol.style.Stroke({
          width: 6,
          color: [237, 212, 0, 0.8]
        })
      }),
      'icon': new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          scale: 0.1,
          src: '/assets/images/skyscraper.png'
        })
      }),
      'geoMarker': new ol.style.Style({
        image: new ol.style.Circle({
          radius: 7,
          snapToPixel: false,
          fill: new ol.style.Fill({
            color: 'black'
          }),
          stroke: new ol.style.Stroke({
            color: 'white',
            width: 2
          })
        })
      })
    };


    var animating = false;
    var speed, now;
    var speedInput = document.getElementById('speed');
    var startButton = document.getElementById('start-animation');

    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [routeFeature, geoMarker, startMarker, endMarker]
      }),
      style: function (feature) {
        // hide geoMarker if animation is active
        if (animating && feature.get('type') === 'geoMarker') {
          return null;
        }
        return styles[feature.get('type')];
      }
    });

    var center = [9.0447, 7.3371];
    // creating the map
    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        vectorLayer
      ],
      view: new ol.View({
        center: center,
        zoom: 9,
        minZoom: 2,
        maxZoom: 19 //the zoom level as needed
      })
    });

    // Initialize the marker and vector source
    // marker = new ol.Feature({
    //   geometry: new ol.geom.Point(ol.proj.fromLonLat(center))
    // });

    // var markerStyle = new ol.style.Style({
    //   image: new ol.style.Icon({
    //     anchor: [0.5, 1],
    //     scale: 0.5,
    //     anchorXUnits: 'fraction',
    //     anchorYUnits: 'pixels',
    //     src: '/assets/images/icar.png'
    //   })
    // });

    // marker.setStyle(markerStyle);

    // vectorSource = new ol.source.Vector({
    //   features: [marker]
    // });

    // var vectorLayer = new ol.layer.Vector({
    //   source: vectorSource
    // });

    // map.addLayer(vectorLayer);

    // takes a co-ordinate from the longlats lists 
    // and sends it through web sockets to our back end.
    setInterval(() => {
      var item = {
        Coordinate: {
          Longitude: Math.random() * (180 - (-180)) + (-180),
          Latitude: Math.random() * (90 - (-90)) + (-90)
        }
      };
      // Structure of the input Item
      // {"Coordinate":{"Longitude":80.2244,"Latitude":12.97784}}    
      var featureToUpdate = geoMarker;
      var coord = ol.proj.fromLonLat([item.Coordinate.Longitude, item.Coordinate.Latitude]);
      featureToUpdate.getGeometry().setCoordinates(coord);

    }, 5000);

  }
  // Call the initMap function when the DOM content finishes loading
  document.addEventListener('DOMContentLoaded', function () {
    initMap();
  });


  // In the luggs case, the location of the assets would be published 
  // by a device that is the user is using. In my case, i would simulate the same 
  // by developing a page that takes a co-ordinate from the longlats lists 
  // and sends it through web sockets to our back end

  // https://openlayers.org/en/latest/examples/feature-move-animation.html