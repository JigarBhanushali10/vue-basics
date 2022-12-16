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
let infoWindow = {}

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const id = ref(0)
// const markers = reactive([])

const loader = new Loader({
  apiKey: "AIzaSyDovPFfMoi51Y2wPOfgy770OBDkTA7aOkQ",

});


onMounted(
  () => {
   let geocoder = new google.maps.Geocoder()
    console.log(geocoder)
  }
)

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

    const cluster = new MarkerClusterer({ markers, map: mapRef.value, });

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
