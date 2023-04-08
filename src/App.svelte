<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";
  import Header from "./Header.svelte";

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  onMount(async () => {
    const map = new mapboxgl.Map({
      container: "map",
      style: `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${
        import.meta.env.VITE_MAPTILER_KEY
      }`,
      center: [139.767, 35.681],
      zoom: 9,
      bearing: 0,
      pitch: 60,
      interactive: true,
      projection: "globe",
      transition: {
        duration: 300,
        delay: 0,
      },
    });

    map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
    map.addControl(new mapboxgl.GeolocateControl(), "bottom-left");
  });
</script>

<main>
  <Header />
  <div id="map" />
</main>

<style>
  #map {
    top: 0;
    height: 100vh;
    width: 100vw;
    position: fixed;
  }
</style>
