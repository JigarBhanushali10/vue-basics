<template>
  Map:
  <div id="map" ref="mapDiv" class="h-100 w-100">

  </div>
</template>
<script setup >

/* eslint-disable */
import { Loader, } from '@googlemaps/js-api-loader';
import { onBeforeMount, ref, reactive, computed, onMounted, createApp } from 'vue'
import { useGeolocation, locations } from './useGeolocation'
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const { coords } = useGeolocation()
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude
}))
console.log(currPos.value);

let cords = reactive(locations)
const mapRef = ref(null)
const mapDiv = ref()
const clusters = ref([])
let infoWindow = {}

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const id = ref(0)
// const markers = reactive([])

const loader = new Loader({
  apiKey: "AIzaSyDovPFfMoi51Y2wPOfgy770OBDkTA7aOkQ",

});




var clusterStyles = [
  {
    textColor: 'white',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa88gtYlcIGYRv5X5yEs7NbJ5JkJdDvzCmLf41BtSCgHqCodZV2fa4ZIjCjroPj27SQCE&usqp=CAU',
    height: 50,
    width: 50
  },
  {
    textColor: 'white',
    url: 'https://camo.githubusercontent.com/c1d0f94b63321e032916e45fc5d0826e417a675f800d36b9b636cd032a1d43db/68747470733a2f2f6d61726b65722e6e616e6f6b612e66722f6d61705f636c75737465722d4646303030302d3132302e737667',
    height: 50,
    width: 50
  },
  {
    textColor: 'white',
    url: 'https://files.helpdocs.io/y0fqv9nyr6/logo.png?t=1577995057515',
    height: 50,
    width: 50
  }
];


var mcOptions = {
  gridSize: 50,
  styles: clusterStyles,
  maxZoom: 15
};



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



onMounted(
  async () => {
    await loader.load()
    mapRef.value = new google.maps.Map(mapDiv.value, {
      center: {
        lat: 20.35828744987769,
        lng: 72.9562395167823
      },
      zoom: 8,
    });

    const markers = cords?.map((item, i) => {
      const label = labels[i % labels.length];

      infoWindow = new google.maps.InfoWindow({
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
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png"
      });


      marker.addListener("click", (mapsMouseEvent) => {
        mapRef.value.panTo(mapsMouseEvent.latLng.toJSON());
        mapRef.value.setZoom(12);
        infoWindow.setContent(label + '  ' +
          JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(mapRef, marker);
      });
      return marker
    })

    mapRef.value.addListener("click", (event) => {
      // console.log(event);
      addMarker(event.latLng);
    });

    clusters.value = new MarkerClusterer({ markers, map: mapRef.value, renderer });

  }
  ,

)



function addMarker(position) {
  console.log(position);

  setTimeout(() => {

    const marker = new google.maps.Marker({
      position,
      map: mapRef.value,
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png"
    });
    cords.push(marker);
    // console.log(cords);

    google.maps.event.addListener(marker, 'click', (event) => {
      // console.log(event.latLng.toJSON());
      infoWindow.setContent(
        JSON.stringify(event.latLng.toJSON(), null, 2)
      );
      infoWindow.open(mapRef, marker);
      mapRef.value.panTo(position);
      mapRef.value.setZoom(12);
    });


  }, 600);

}
</script>
