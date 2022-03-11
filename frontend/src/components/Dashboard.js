import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY3J1Z2dnaWVybyIsImEiOiJja3pteWFjMTAxZ2k3MndueHZnbmhuaDN2In0.N9uLqiw04di8ghl1-KUkdw";

const defLNG = -120.6252; // default lat/long is set to SLO
const defLAT = 35.2628;
const defZoom = 9;

const morroRockLNG = -120.864096;
const morroRockLAT = 35.373504;
const pismoLNG = -120.643497;
const pismoLAT = 35.138778;
var pointForecastURL = "";

// possible schema for storing beach locations
// displays on the map based on lat/long
// should store in database and display based on filters such as which are in view
const beachList = {
  type: "BeachCollection",
  beaches: [
    {
      type: "Beach",
      properties: {
        message: "Its Morro Rock dude",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [morroRockLNG, morroRockLAT],
      },
      img: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_640,q_75,w_640/v1/clients/morrobayca/temp_6b55308e-95b9-4995-9749-d7342425ff73.jpg"
    },
    {
      type: "Beach",
      properties: {
        message: "its pismo beach bro",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [pismoLNG, pismoLAT],
      },
      img: "https://keyt.b-cdn.net/2020/09/118794055_1429416193923564_3229598932206464322_n-1.jpg",
    },
  ],
};

function Dashboard() {
  const [userDetails, setUserDetails] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("user_details");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

//   let user = userDetails.data.users_list[0];
//   console.log(user);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(defLNG);
  const [lat, setLat] = useState(defLAT);
  const [zoom, setZoom] = useState(defZoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // add search bar
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    // track user location
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    // Add markers to the map.
    for (const marker of beachList.beaches) {
      // Create a DOM element for each marker.
      const mark = document.createElement("div");
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];

      const path = `<Link to=href=${marker.properties.path}></Link>`;

      mark.className = "marker";
      mark.style.backgroundImage = `url(${marker.img})`;
      mark.style.width = `${width}px`;
      mark.style.height = `${height}px`;
      mark.style.backgroundSize = "100%";

      mark.addEventListener("click", () => {
         fetchWeatherData(marker.geometry.coordinates[1], marker.geometry.coordinates[0]);
      });
      // Add markers to the map.
      new mapboxgl.Marker(mark).setLngLat(marker.geometry.coordinates).addTo(map.current);
    }
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });


    map.current.on("load", () => {
      fetch("https://api.rainviewer.com/public/weather-maps.json")
        .then((res) => res.json())
        .then((apiData) => {
          apiData.radar.past.forEach((frame) => {

            map.current.addLayer({
              id: `rainviewer_${frame.path}`,
              type: "raster",
              source: {
                type: "raster",
                tiles: [
                  apiData.host + frame.path + '/256/{z}/{x}/{y}/2/1_1.png'
                ],
                tileSize: 256
              },
              layout: { visibility: "none" },
              minzoom: 0,
              maxzoom: 12,
            });
          });

          let i = 0;
          const interval = setInterval(() => {
            if (i > apiData.radar.past.length - 1) {
              clearInterval(interval);
              return;
            } else {
              apiData.radar.past.forEach((frame, index) => {
                map.current.setLayoutProperty(
                  `rainviewer_${frame.path}`,
                  "visibility",
                  index === i || index === i - 1 ? "visible" : "none"
                );
              });
              if (i - 1 >= 0) {
                const frame = apiData.radar.past[i - 1];
                let opacity = 1;
                setTimeout(() => {
                  const i2 = setInterval(() => {
                    if (opacity <= 0) {
                      return clearInterval(i2);
                    }
                    map.current.setPaintProperty(
                      `rainviewer_${frame.path}`,
                      "raster-opacity",
                      opacity
                    );
                    opacity -= 0.1;
                  }, 50);
                }, 400);
              }
              i += 1;
            }
          }, 2000);
        })
        .catch(console.error);
    });
 
  });

  function fetchPointDailyForecast(URL) {
   var pointForecast;

   new Promise(function (resolve, reject) { 
   fetch(URL)
   .then(function (response) {
     if (response.status === 200) {
       return response.json();
     } else {
        console.log(URL);
        console.log("error fetching forecast data.");
       reject(response.status);
     }
   })
   .then(function (parsedResponse) {
     pointForecast = JSON.stringify(parsedResponse.properties.periods[0]);
     resolve(parsedResponse);

     console.log(pointForecast);
     window.alert(pointForecast);
   });
});
  }

  function fetchWeatherData(latitude, longitude) {
   new Promise(function (resolve, reject) {
     fetch(
       "https://api.weather.gov/points/" +
         latitude +
         "," +
         longitude)
       .then(function (response) {
         if (response.status === 200) {
           return response.json();
         } else {
            console.log(
               "https://api.weather.gov/points/" +
                 latitude +
                 "," +
                 longitude)
            console.log("error fetching weather data.")
           reject(response.status);
         }
       })
       .then(function (parsedResponse) {
         pointForecastURL = parsedResponse.properties.forecast;
         console.log(pointForecastURL);
         resolve(parsedResponse);
         fetchPointDailyForecast(pointForecastURL);
      })
   });

}

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Dashboard;