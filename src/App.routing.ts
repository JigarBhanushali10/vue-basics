
import PlacesDemo from '@/components/POC Examples/PlacesDemo.vue';
import TipCalculator from '@/components/TipCalculator/TipCalculator.vue';
import MapClusters from '@/components/POC Examples/Map-Clusters.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
    {
      path: "/",
      name: "calculator",
      component: TipCalculator,
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
    {
      path: "/calculator",
      name: "calculator",
      component: TipCalculator,
    },
  ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });

  export default router