<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";
  import {
    MAP_CONFIG,
    createCircleRadiusExpression,
    createTextSizeExpression,
  } from "../assets/config";

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
        "line-width": MAP_CONFIG.lineWidth,
        "line-gradient": MAP_CONFIG.nonProgressColor,
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
        "line-width": MAP_CONFIG.lineWidth,
        "line-color": MAP_CONFIG.nonProgressColor,
        "line-dasharray": MAP_CONFIG.lineDashArray,
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
        "line-width": MAP_CONFIG.lineWidth,
        "line-gradient": MAP_CONFIG.nonProgressColor,
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
        "circle-color": MAP_CONFIG.circleColor,
        "circle-radius": createCircleRadiusExpression("-1"),
        "circle-opacity": 1,
      },
    });

    map.addLayer({
      id: "station-label",
      type: "symbol",
      source: "station-src",
      layout: {
        "text-field": ["get", "no"],
        "text-size": createTextSizeExpression("-1"),
      },
      paint: {
        "text-color": "#fff",
      },
    });
  };

  const add3dTerrain = () => {
    map.setFog(MAP_CONFIG.fogSettings);

    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: MAP_CONFIG.demSource,
    });

    map.setTerrain({
      source: "mapbox-dem",
      exaggeration: 2.5,
    });
  };

  const onClickStation = (e) => {
    const stationNo = e.features[0].properties.no;
    const el = document.getElementById(stationNo);
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  onMount(async () => {
    map = new mapboxgl.Map({
      container: "map",
      style: MAP_CONFIG.style,
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

    map.on("click", "station-circle", onClickStation);
    map.on("click", "station-label", onClickStation);
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
