<template>
    <div class="h-100 w-100">
        <div class="d-flex my-3">
            <input type="text" ref="searchPlacesInput" id='searchPlacesInputById' class="form-control w-50">
            <button class="btn btn-primary ms-3"
                @click="() => addMarkerOnSearchInput(lat = 20.5593949452457, lng = 73.03526464414065)">search</button>
        </div>
        <!-- button to refresh maps -->
        <button class="btn btn-secondary" @click="refreshMap">Refresh</button>
        <div id="mapDiv" class="h-50 w-100" ref="mapDiv"></div>
    </div>
</template>

<script>
/* eslint-disable */

import { ref } from 'vue';




export default {
    name: 'Places',

    created() {
        console.log('created');

    },
    mounted() {
        console.log('mounted');
        setTimeout(() => {

            this.loadMap()
        }, 0);

    },
    setup() {
        console.log('setup');
        // mapDiv for HTMLDIV element

        const mapDiv = ref(null)
        // map reference

        const mapRef = ref(null)
        // search input for HTMLDIV element

        const searchPlacesInput = ref(null)
        // marker
        let marker

        // autocomplete variable for google object
        let autocomplete;

        // map default center

        let center = {
            lat: 20.5593949452457,
            lng: 73.03526464414065
        };

        // const loader = new Loader({
        //     apiKey: GOOGLE_MAPS_API_KEY,
        //     libraries: ['places']
        // });


        /**
        * @name loadMap
        * @description funtion to render map
        * 
        */

        const loadMap = () => {
            mapRef.value = new google.maps.Map(mapDiv.value, {
                //centrado en posicion actual
                center: center,
                zoom: 10,
                fullscreenControl: false,
                streetViewControl: false,
                resetBoundsOnResize: true
                // gestureHandling: "cooperative",

            })

            mapRef.value.addListener("click", (event) => {
                // console.log(event);
                // console.log(event.latLng.toJSON())
                const { lat, lng } = event.latLng.toJSON()
                addMarkerOnSearchInput(lat, lng)
            });


            // console.log(autocomplete);


            autocomplete = new google.maps.places.Autocomplete(searchPlacesInput.value)

            //called when options selected from searchbox 
            autocomplete.addListener('place_changed', () => {
                let place = autocomplete.getPlace()
                console.log(place);
                addMarkerOnSearchInput(place.geometry.location.lat(), place.geometry.location.lng())
            })
        }

        const refreshMap = () => {
            loadMap()
        }
        /**
         * @name addMarkerOnSearchInput
         * @param {*} lat 
         * @param {*} lng 
         * @description addsmarker when address selected from search input and centers map
         */
        const addMarkerOnSearchInput = (lat, lng) => {
            if (marker && marker.setMap) {
                marker.setMap(null);
            }
            mapRef.value.panTo({ lat, lng });
            // mapRef.value.setZoom(10);
            marker = new google.maps.Marker({
                position: { lat, lng },
                map: mapRef.value,
            });
        }
        return {

            mapDiv,
            mapRef, autocomplete, searchPlacesInput,
            loadMap,
            addMarkerOnSearchInput,
            refreshMap
        }

    }

}

</script>

<style scoped>

</style>