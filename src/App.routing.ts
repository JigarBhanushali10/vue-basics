
import FormView  from '@/components/FormView.vue';
import ListView  from '@/components/ListView.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MapClusters from '@/components/Map-Clusters.vue';
import MapGeocodingService from '@/components/MapGeocodingService.vue';
import PlacesDemo from '@/components/PlacesDemo.vue';
import VueMaps from '@/components/Vue3Map.vue';
import DemoMap from '@/components/DemoMap.vue';
import Copia from '@/components/Copia.vue';


const routes: Array<RouteRecordRaw> = [
    {
      path: "/",
      name: "list",
      component: ListView,
    },
    {
      path: '/list',
      name: 'List',
      component: ListView,
      children: [
     
      ],
    },
    {
      path: "/form",
      name: "form",
      component: FormView,
    },
    {
      path: "/clusters",
      name: "map-clusters",
      component: MapClusters,
    },
    {
      path: "/geocoding",
      name: "map-geocoding",
      component: MapGeocodingService,
    },
    {
      path: "/vue3maps",
      name: "vue3maps",
      component: VueMaps,
    },
    {
      path: "/copia",
      name: "opia",
      component: Copia,
    },
  ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });

  export default router