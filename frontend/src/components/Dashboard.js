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
const avilaLNG = -120.7318418;
const avilaLAT = 35.1799752;
const spoonersLNG = -120.8907365;
const spoonersLAT = 35.2749753;
const dunesLNG = -120.6251714;
const dunesLAT = 35.0894203;

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
      img: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_640,q_75,w_640/v1/clients/morrobayca/temp_6b55308e-95b9-4995-9749-d7342425ff73.jpg",
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
    {
      type: "Beach",
      properties: {
        message: "Avila beach here",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [avilaLNG, avilaLAT],
      },
      img: "https://image.arrivalguides.com/1500x600/11/ca019aca3f54a23395d704303a7dfb5c.jpg",
    },
    {
      type: "Beach",
      properties: {
        message: "Spooner's Cove",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [spoonersLNG, spoonersLAT],
      },
      img: "https://ewscripps.brightspotcdn.com/dims4/default/7673936/2147483647/strip/true/crop/1600x900+0+150/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F7f%2F7c%2F40dd643041f6b033c1f178914e0b%2Fresized-resized-20211107-125504.JPEG",
    },
    {
      type: "Beach",
      properties: {
        message: "pismo dunes",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [dunesLNG, dunesLAT],
      },
      img: "https://nomanbefore.com/wp-content/uploads/2021/04/Pismo_Beach_Sand_Dunes_v2--e1618457672619.jpg.webp",
    },
  ],
};

function Dashboard() {

  // const [userDetails, setUserDetails] = useState(() => {
  //   // getting stored value
  //   const saved = localStorage.getItem("user_details");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || "";
  // });



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
         //SET THIS TO TRUE TO ENABLE STORMGLASS REQUESTS (LIMIT OF 10 PER DAY, I THINK I'VE USED 4-5, SO 5-ISH REQUESTS LEFT TO USE ON DEMO)
         if (true) {
            fetchStormglassData(marker.geometry.coordinates[1],marker.geometry.coordinates[0]);
         }
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

    window.map = map;

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

function fetchStormglassData (lat, lng) {
   var params = 'waterTemperature,waveHeight,waveDirection,wavePeriod,swellHeight,swellDirection,swellPeriod'
   fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
      headers: {
        'Authorization': 'a5685598-a106-11ec-b2a7-0242ac130002-a5685606-a106-11ec-b2a7-0242ac130002'
      }
    }).then((response) => response.json()).then((jsonData) => {
      console.log(jsonData.hours[0]);
      window.alert(JSON.stringify(jsonData.hours[0]));
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
