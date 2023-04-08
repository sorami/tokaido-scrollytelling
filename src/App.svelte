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

    const addStationLayers = () => {
      map.addSource("station-src", {
        type: "geojson",
        data: "stations/points.geojson",
      });

      map.addLayer({
        id: "station-circle",
        type: "circle",
        source: "station-src",
        layout: {},
        paint: {
          "circle-color": "rgba(31,41,55,1)",
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0,
            8,
            3,
            10,
            12,
          ],
          "circle-opacity": 1,
        },
      });

      map.addLayer({
        id: "station-label",
        type: "symbol",
        source: "station-src",
        layout: {
          "text-field": ["get", "no"],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0,
            8,
            3,
            10,
            12,
          ],
        },
        paint: {
          "text-color": "#fff",
        },
      });
    };

    map.on("load", () => {
      addStationLayers();
    });
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
