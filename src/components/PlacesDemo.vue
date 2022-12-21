<template>
  Map:
  <div class="d-flex justify-content-center">

    <input id="pac-input" class="form-control w-50" type="text" placeholder="Search Box" ref="placesSearchInput"
      v-model="placesSearch" />
    <button class="btn btn-primary" @click="getPlaceValue">Submit</button>
  </div>
  <div id="map" ref="mapDiv" class="h-100 w-100">
  </div>
</template>

<!-- <script lang="ts">
/* eslint-disable */ 
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const placesSearch = ref('')
    const getPlaceValue = () => {

      console.log(placesSearch.value);
    }
    onMounted(()=>{
      console.log('onmoutedworks')
    })
    return { placesSearch ,getPlaceValue,onMounted }
  },
  
})
</script> -->

<style scoped>

</style>
<script setup>
/* eslint-disable */

import { Loader } from '@googlemaps/js-api-loader';
import { onMounted, ref } from 'vue';


const mapRef = ref(null)
const mapDiv = ref()

const placesSearch = ref('')
const placesSearchInput = ref('')

const loader = new Loader({
  apiKey: "AIzaSyDovPFfMoi51Y2wPOfgy770OBDkTA7aOkQ",
});


const getPlaceValue = () => {

  console.log(placesSearch.value);
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
      mapId: '8aab81d9f99aa63',

    }
    )


    const searchBox = new google.maps.places.SearchBox(placesSearchInput.value);
    mapRef.value.controls[google.maps.ControlPosition.TOP_LEFT].push(placesSearchInput.value);

    mapRef.value.addListener("bounds_changed", () => {
      searchBox.setBounds(mapRef.value.getBounds());
    });

    let markers = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

  }

)






</script>

<style scoped>

</style>