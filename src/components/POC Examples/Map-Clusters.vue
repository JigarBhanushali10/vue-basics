<template>
  
  Map:
  <div class="position-relative h-100 w-100">
    <!-- button to refresh maps -->
    <button class="btn btn-secondary" @click="refreshMap">refresh</button>
    <!-- maps div -->
    <div id="map" ref="mapDiv" class="h-100 w-100">
    </div>
    
    <!-- custom info div -->
    <div
    class="bg-white w-25 h-25 position-absolute  bottom-0 end-0 p-3 m-3 text-break d-flex flex-column shadow rounded-3"
    v-if="toggleInfoWindo">
    
    <!-- button to close custom info div -->
      <span class="align-self-end cursor-pointer" @click="closeInfoWindows">X</span>
      <div class="flex-grow-1 w-100">
        {{ infoWindoContent }}

      </div>
    </div>
  </div>
</template>
<script setup >

/* eslint-disable */
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { onMounted, reactive, ref } from 'vue';
import { locations } from './useGeolocation';



let cords = reactive(locations)
// map reference
const mapRef = ref(null)
// toggleInfoWindo for open close infoDiv and window
const toggleInfoWindo = ref(false)
// infoWindoContent for close infoDiv content
const infoWindoContent = ref('')
// mapDiv for HTMLDIV element
const mapDiv = ref()
// clusters for marker cluster
const clusters = ref([])
// infoWindow for google object
let infoWindowObject = {}
// geocoderObject for google object
let geocoderObject = {}

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

onMounted(
  () => {
    setTimeout(() => {
      renderMap()
    }, 0)
  }

)
// loader function if do not load script in index.html
// import { Loader } from "@googlemaps/js-api-loader";
// const loader = new Loader({
  //   apiKey: "AIzaSyDovPFfMoi51Y2wPOfgy770OBDkTA7aOkQ",

// });






/**
 * @name renderer
 * @description function for custom cluster
 * @returns custom marker clusters 
 */

const renderer = {
  render({ count, position }, clusters) {
    // console.log(clusters);

    const color =
      count > Math.max(10, clusters.clusters.markers.mean)
        ? "#673ab7cc"
        : "#03a9f4c2";

    // create svg url with fill color
    const svg = window.btoa(`
      <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
          <circle cx="120" cy="120" opacity=".6" r="70" />
          <circle cx="120" cy="120" opacity=".3" r="90" />
          <circle cx="120" cy="120" opacity=".2" r="110" />
          <circle cx="120" cy="120" opacity=".1" r="130" />
        </svg>`);



    return new google.maps.Marker({
      label: { text: String(count), color: "white", fontSize: "10px" },
      position: position,
      icon: {
        url: `data:image/svg+xml;base64,${svg}`,
        // url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa88gtYlcIGYRv5X5yEs7NbJ5JkJdDvzCmLf41BtSCgHqCodZV2fa4ZIjCjroPj27SQCE&usqp=CAU`,
        scaledSize: new google.maps.Size(45, 45),
      },
      // adjust zIndex to be above other markers
      zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
    });
  }
}
/**
 * @name closeInfoWindows
 * @description closes infowindow
 */
const closeInfoWindows = () => {
  toggleInfoWindo.value = false
  infoWindowObject.close()
}


const refreshMap = () => {
  console.log('ref');
  renderMap()
}


/**
 * @name renderMap
 * @description funtion to render map
 */
 function renderMap() {
  // await loader.load()
  mapRef.value = new google.maps.Map(mapDiv.value, {
    center: {
      lat: 20.35828744987769,
      lng: 72.9562395167823
    },
    zoom: 8,
    disableDefaultUI: true
  });


  const markers = cords?.map((item, i) => {
    const label = labels[i % labels.length];

    infoWindowObject = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: false
    });
    const marker = new google.maps.Marker({
      position: {
        lat: item.location.lat,
        lng: item.location.lng
      },
      map: mapRef.value,
      label,
      // custom marker image
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png"
    });

// adding listeners to object
marker.addListener("click", (mapsMouseEvent) => {
  mapRef.value.panTo(mapsMouseEvent.latLng.toJSON());
  mapRef.value.setZoom(12);
  infoWindowObject.open(mapRef, marker);
  geocode({ location: mapsMouseEvent.latLng });
  
  toggleInfoWindo.value = true
  infoWindoContent.value = label + '  ' + JSON.stringify(mapsMouseEvent.latLng.toJSON())
});
return marker
})
// adding listeners to infowindow
infoWindowObject.addListener('closeclick', () => {
  closeInfoWindows()
});
// adding listeners to map
mapRef.value.addListener("click", (event) => {
    closeInfoWindows()
  });

//clustering individual markers
clusters.value = new MarkerClusterer({ markers, map: mapRef.value, renderer });
//initializing geocodeObject
  geocoderObject = new google.maps.Geocoder();

}

/**
 * @name geocode
 * @description geocodes lat lng and gets formated address and sets content to info window
 * @param {*} request 
 */
function geocode(request) {

  console.log(request.location);
  geocoderObject
    .geocode(request)
    .then((result) => {
      const { results } = result;

      mapRef.value.setCenter(results[0].geometry.location);
      infoWindowObject.setContent(results[0].formatted_address + '  ' +
        JSON.stringify(request.location, null, 2)
      );
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });

}

/**
 * @name addMarker 
 * @description adds marker to map and api call
 * @param {*} position 
 */
function addMarker(position) {
  console.log(position);

  setTimeout(() => {

    const marker = new google.maps.Marker({
      position,
      map: mapRef.value,
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png"
    });
    cords.push(marker);

    // can do api call here to add marker
    

    google.maps.event.addListener(marker, 'click', (event) => {
      // console.log(event.latLng.toJSON());
      infoWindowObject.setContent(
        JSON.stringify(event.latLng.toJSON(), null, 2)
      );
      infoWindowObject.open(mapRef, marker);
      mapRef.value.panTo(position);
      mapRef.value.setZoom(12);
    });


  }, 600);

}
</script>
<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
