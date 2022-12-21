
import FormView  from '@/components/FormView.vue';
import ListView  from '@/components/ListView.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MapClusters from '@/components/Map-Clusters.vue';
import MapGeocodingService from '@/components/MapGeocodingService.vue';
import PlacesDemo from '@/components/PlacesDemo.vue';
import DemoMap from '@/components/DemoMap.vue';


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
      component: DemoMap,
    },
  ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });

  export default router