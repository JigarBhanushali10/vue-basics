<template>

    <div class="h-100 w-100">

        Map:
        <input type="text" class="search-input ">
        <div id="map" ref="mapDiv" class="h-100 w-100  ">

        </div>

    </div>
</template>
<script setup >

/* eslint-disable */
import { Loader, } from '@googlemaps/js-api-loader';
import { onBeforeMount, ref, reactive, computed, onMounted, createApp } from 'vue'
import { useGeolocation, locations } from './useGeolocation'
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { styles } from "./asd";











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
let geocoder = {}

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const id = ref(0)
// const markers = reactive([])

const loader = new Loader({
    apiKey: "AIzaSyDovPFfMoi51Y2wPOfgy770OBDkTA7aOkQ",

});




onMounted(
    async () => {
        await loader.load()
        mapRef.value = new google.maps.Map(mapDiv.value, {
            center: {
                lat: 20.35828744987769,
                lng: 72.9562395167823
            },
            zoom: 8,
            styles:styles.silver
        });

        infoWindow = new google.maps.InfoWindow({
            content: "",
            disableAutoPan: false
        });

        geocoder = new google.maps.Geocoder();
        //   const markers = cords?.map((item, i) => {
        //     const label = labels[i % labels.length];

        //     infoWindow = new google.maps.InfoWindow({
        //       content: "",
        //       disableAutoPan: false
        //     });
        //     const marker = new google.maps.Marker({
        //       position: {
        //         lat: item.location.lat,
        //         lng: item.location.lng
        //       },
        //       map: mapRef.value,
        //       label,
        //       icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png"
        //     });


        //     marker.addListener("click", (mapsMouseEvent) => {
        //       mapRef.value.panTo(mapsMouseEvent.latLng.toJSON());
        //       mapRef.value.setZoom(12);
        //       infoWindow.setContent(label + '  ' +
        //         JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        //       );
        //       infoWindow.open(mapRef, marker);
        //     });
        //     return marker
        //   })

        mapRef.value.addListener("click", (event) => {
            // console.log(event);
            addMarker(event.latLng);
            geocode({ location: event.latLng });

        });

        //   const cluster = new MarkerClusterer({ markers, map: mapRef.value, });

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



function geocode(request) {
    // clear();
    // geocoder
    //     .geocode(request)
    //     .then((result) => {
    //         const { results } = result;

    //         //   mapRef.value.setCenter(results[0].geometry.location);
    //         //   marker.setPosition(results[0].geometry.location);
    //         //   marker.setMap(map);
    //         //   responseDiv.style.display = "block";
    //         //   response.innerText = JSON.stringify(result, null, 2);
    //         console.log(result);
    //         // return results;
    //     })
    //     .catch((e) => {
    //         alert("Geocode was not successful for the following reason: " + e);
    //     });


    // const  j =fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key=AIzaSyDovPFfMoi51Y2wPOfgy770OBDkTA7aOkQ').then(res=>{ console.log(res)
    // res.then(res.json())}
    // )

    // console.log(j);
}
</script>

