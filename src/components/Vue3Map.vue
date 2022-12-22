<!-- <template>
    <GoogleMap api-key="AIzaSyDovPFfMoi51Y2wPOfgy770OBDkTA7aOkQ"  :disableDefaultUI="true" style="width: 100%; height: 500px" :center="center"  
        :zoom="10">
        <Marker :options="{ position: center }" >
            <InfoWindow>
                <div id="contet">
                    <div id="siteNotice"></div>
                    <h1 id="firstHeading" class="firstHeading">Uluru</h1>
                    <div id="bodyContent">
                        <p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large
                            sandstone rock formation in the southern part of the
                            Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi)
                            south west of the nearest large town, Alice Springs; 450&#160;km
                            (280&#160;mi) by road. Kata Tjuta and Uluru are the two major
                            features of the Uluru - Kata Tjuta National Park. Uluru is
                            sacred to the Pitjantjatjara and Yankunytjatjara, the
                            Aboriginal people of the area. It has many springs, waterholes,
                            rock caves and ancient paintings. Uluru is listed as a World
                            Heritage Site.</p>
                            <p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
                                https://en.wikipedia.org/w/index.php?title=Uluru</a>
                                (last visited June 22, 2009).</p>
                            </div>
            </div>
        </InfoWindow>
    </Marker>
    <CustomControl position="RIGHT_BOTTOM">
      <button class="custom-btn" @click="sayHi">👋</button>
    </CustomControl>
    </GoogleMap>
</template>

<script setup lang="ts">
/* eslint-disable */
import { GoogleMap, Marker, InfoWindow,CustomControl } from 'vue3-google-map'

const mapOptions={
    disableDefaultUI:true,
}
const sayHi = () => alert('Hi!')
const center = {
    lat: 20.35828744987769,
    lng: 72.9562395167823
}
</script>

<style scoped>

</style> -->



<template>
    <div class="position-relative">

        <GoogleMap ref="mapRef" api-key="AIzaSyDovPFfMoi51Y2wPOfgy770OBDkTA7aOkQ" class="map" :center="center" :zoom="2"
            :disableDefaultUI=true @click="jigar"/>
        <div class="jigar w-25 h-25 position-absolute bg-white end-0  shadow">
            hisdlvbndklsnv
        </div>
    </div>
    <label for="lng">Longitude</label>
    <input v-model.number="lng" id="lng" type="number" min="-180" max="180" step="10" />
</template>
  
<script>
/* eslint-disable */

import { defineComponent, ref, computed, watch } from 'vue'
import { GoogleMap } from 'vue3-google-map'

export default defineComponent({
    components: { GoogleMap },
    setup() {
        const mapRef = ref(null)
        const center = { lat: 0, lng: 0 }

        const _lng = ref(0)
        const lng = computed({
            get: () => _lng.value,
            set: v => {
                if (!Number.isFinite(v)) {
                    _lng.value = 0
                } else if (v > 180) {
                    _lng.value = 180
                } else if (v < -180) {
                    _lng.value = -180
                } else {
                    _lng.value = v
                }
            },
        })

        watch(lng, () => {
            if (mapRef.value?.ready) {
                mapRef.value.map.panTo({ lat: 0, lng: lng.value })
                // mapRef.value.disableDefaultUI=true
            }
        })
        
        
        const jigar=()=>{
            // console.log('hi');
            mapRef.value.map.addListener("click", (event) => {
                // console.log(event);
                addMarker(event.latLng);
            });

        }
        const addMarker = ({position}) => {
            // const marker = new google.maps.Marker({
            //     position,
            //     map: mapRef.value,
            //     icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png"
            // });
            
        }
        return { mapRef, center, lng,jigar }
    },
})
</script>
  
<style scoped>
.map {
    position: relative;
    width: 100%;
    height: 500px;
}

/* .map::after {
    position: absolute;
    content: 'alscbn';
    width: 1px;
    height: 100%;
    top: 0;
    left: 50%;
    background: white;
  } */

input[type='number'] {
    width: 200px;
    margin-top: 20px;
    margin-left: 10px;
}



.jigar {
    bottom: 0;
    z-index: 999;
}
</style>