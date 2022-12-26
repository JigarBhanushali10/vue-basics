
import PlacesDemo from '@/components/POC Examples/PlacesDemo.vue';
import MapClusters from '@/components/POC Examples/Map-Clusters.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
    {
      path: "/",
      name: "clusters",
      component: MapClusters,
    },
    
    {
      path: "/clusters",
      name: "map-clusters",
      component: MapClusters,
    },
    // {
    //   path: "/vue3maps",
    //   name: "vue3maps",
    //   component: VueMaps,
    // },
    {
      path: "/latestPlaces",
      name: "latestPlaces",
      component: PlacesDemo,
    },
  ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });

  export default router