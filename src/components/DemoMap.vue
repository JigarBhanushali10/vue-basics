<template>
  <div ref='mapDiv' id="map">

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { google } from '@googlemaps/js-api-loader';

const mapDiv = ref(null)


const initMap = () => {
  const myLatlng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(mapDiv.value, {
    zoom: 4,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
}

onMounted(() => initMap())


</script>

