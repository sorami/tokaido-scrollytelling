<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";

  export let map;

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const addRoadLayers = () => {
    map.addSource("road-1-src", {
      type: "geojson",
      data: "roads/Tokaido1_v3.geojson",
      lineMetrics: true,
    });
    map.addLayer({
      id: "road-1",
      type: "line",
      source: "road-1-src",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-width": 6,
        "line-gradient": [
          "step",
          ["line-progress"],
          "#eb4d4b",
          0,
          "rgba(0, 0, 0, 0.6)",
        ],
      },
    });

    map.addSource("boat-src", {
      type: "geojson",
      data: "roads/tokaido_boat.geojson",
    });
    map.addLayer({
      id: "boat",
      type: "line",
      source: "boat-src",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-width": 6,
        "line-color": "rgba(0, 0, 0, 0.6)",
        "line-dasharray": [1, 2],
      },
    });

    map.addSource("road-2-src", {
      type: "geojson",
      data: "roads/Tokaido2_v3.geojson",
      lineMetrics: true,
    });
    map.addLayer({
      id: "road-2",
      type: "line",
      source: "road-2-src",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-width": 6,
        "line-gradient": [
          "step",
          ["line-progress"],
          "#eb4d4b",
          0,
          "rgba(0, 0, 0, 0.6)",
        ],
      },
    });
  };

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
          6,
          0,
          8,
          10,
          10,
          16,
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
        "text-size": ["interpolate", ["linear"], ["zoom"], 4, 0, 8, 3, 10, 16],
      },
      paint: {
        "text-color": "#fff",
      },
    });
  };

  const add3dTerrain = () => {
    map.setFog({
      range: [0.8, 8],
      color: "#dc9f9f",
      "horizon-blend": 0.5,
      "high-color": "#245bde",
      "space-color": "#000000",
      "star-intensity": 0.15,
    });

    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    });

    map.setTerrain({
      source: "mapbox-dem",
      exaggeration: 2.5,
    });
  };

  onMount(async () => {
    map = new mapboxgl.Map({
      container: "map",
      style: `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${
        import.meta.env.VITE_MAPTILER_KEY
      }`,
      center: [139.767, 35.681],
      zoom: 9,
      bearing: 0,
      pitch: 60,
      // enable `interactive` option, but disable scroll
      // (let the user zoom with the controll button instead)
      interactive: true,
      scrollZoom: false,
      projection: "globe",
      transition: {
        duration: 300,
        delay: 0,
      },
    });

    map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
    map.addControl(new mapboxgl.GeolocateControl(), "bottom-left");

    map.on("load", async () => {
      addRoadLayers();
      addStationLayers();
      add3dTerrain();
    });

    map.on("click", "station-circle", (e) => {
      const stationNo = e.features[0].properties.no;
      const el = document.getElementById(stationNo);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
</script>

<div id="map" />

<style>
  #map {
    top: 0;
    height: 100vh;
    width: 100vw;
    position: fixed;
  }
</style>
