// настройка карты leaflet
import {createPopup} from '/js/popup.js';
import { getData } from '/js/data.js';

// переменные для карты
const INIT_MAP_POSITION = {
  lat: 35.6895,
  lng: 139.692,
};

const INIT_MAP_ZOOM = 12;

const MAIN_PIN_URL = './img/main-pin.svg';
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANHOR = [26, 52];

const OTHER_PIN_URL = './img/pin.svg';
const OTHER_ICON_SIZE = [40, 40];
const OTHER_ICON_ANHOR = [20, 40];


// отрисовка главной метки

function createMap () {
 // return new Promise((resolve) => {
    // Создание карты
    L.map('map-canvas')
      .on('load', ({target: map}) => {
        // отрисовка карты OpenStreetMap
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
    ).addTo(map);


        const mainPinIcon = L.icon({
          iconUrl: MAIN_PIN_URL,
          iconSize: MAIN_ICON_SIZE,
          iconAnchor: MAIN_ICON_ANHOR,
        });

        const mainPinMarker = L.marker(
          INIT_MAP_POSITION,
          {
          draggable: true,
          icon: mainPinIcon,
          },
        );

        mainPinMarker.addTo(map);

        /*mainPinMarker.on('move', (evt) => {
        mainPinMarker.on('moveend', (evt) => {
          const point = evt.target.getLatLng();
          console.log(point); //??
        });

       // console.log(mainPinMarker);*/
        /************************************************************************/

        // отрисовка слоя меток
        const markerGroup = L.layerGroup().addTo(map);

        const pinIcon = L.icon({
          iconUrl: OTHER_PIN_URL,
          iconSize: OTHER_ICON_SIZE,
          iconAnchor: OTHER_ICON_ANHOR,
        });

        function createMarkers(points) {
          points.forEach((point) => {
            const {location: {lat, lng}} = point;
            const marker = L.marker(
              {
                lat,
                lng
              },
              {
                icon: pinIcon,
              },
            );

            marker
              .addTo(markerGroup)
              .bindPopup(createPopup(point));
          });
        }

        const points = getData();

        createMarkers(points);
        //console.log(markerGroup);
        /**************************************************************/


        function closePopup () {
          map.closePopup();
        }

        function clearMarkers () {
          markerGroup.clearLayers();
        }

        function resetPosition () {
          resetMainMarkerPosition();
          closePopup ();
          // сброс положения карты в исходное
          map.setView(INIT_MAP_POSITION, INIT_MAP_ZOOM);
        }



        let _mainPinMapMoveHandler;

        function setUpMainMarkerMove(handler) {
          _mainPinMapMoveHandler = handler;
        }

        function mainPinMapMoveHandler (...arg) {
          _mainPinMapMoveHandler (...arg);
        }


      })
      .setView(INIT_MAP_POSITION, INIT_MAP_ZOOM);

}

export {createMap};


