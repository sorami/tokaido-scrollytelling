<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";
  import {
    MAP_CONFIG,
    createCircleRadiusExpression,
    createTextSizeExpression,
  } from "../assets/config";

  const IS_DEBUG = import.meta.env.MODE === "development";

  export let map;

  let mapPosition: Record<string, number> = {
    lng: 139.767125,
    lat: 35.681236,
    zoom: 10,
    pitch: 0,
    bearing: 0,
  };

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
        "line-width": MAP_CONFIG.line.width,
        "line-gradient": MAP_CONFIG.line.nonProgressColor,
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
        "line-width": MAP_CONFIG.line.width,
        "line-color": MAP_CONFIG.line.nonProgressColor,
        "line-dasharray": MAP_CONFIG.line.dashArray,
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
        "line-width": MAP_CONFIG.line.width,
        "line-gradient": MAP_CONFIG.line.nonProgressColor,
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
        "circle-color": MAP_CONFIG.point.circleColor,
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
        "text-color": MAP_CONFIG.point.textColor,
      },
    });
  };

  const add3dTerrain = () => {
    map.setFog(MAP_CONFIG.terrain.fogSettings);

    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: MAP_CONFIG.terrain.demSource,
    });

    map.setTerrain({
      source: "mapbox-dem",
      exaggeration: MAP_CONFIG.terrain.exaggeration,
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
      ...MAP_CONFIG.initialMapSettings,
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

    if (IS_DEBUG) {
      map.on("move", () => {
        const { lng, lat } = map.getCenter();
        const zoom = map.getZoom();
        const bearing = map.getBearing();
        const pitch = map.getPitch();
        mapPosition = { lng, lat, zoom, bearing, pitch };
        console.log(
          `lng: ${lng.toFixed(4)}, lat: ${lat.toFixed(4)}, zoom: ${zoom.toFixed(
            2
          )}, bearing: ${bearing.toFixed(2)}, pitch: ${pitch.toFixed(2)}`
        );
      });
    }
  });
</script>

<div id="map" />

{#if IS_DEBUG}
  <div
    class="fixed bottom-10 left-16 bg-gray-900 p-3 rounded opacity-70 font-sans"
  >
    <div>{mapPosition.lng.toFixed(2)}, {mapPosition.lat.toFixed(2)}</div>
    <div class="flex justify-between items-center">
      <div text-xs>zoom</div>
      <div>{mapPosition.zoom.toFixed(2)}</div>
    </div>
    <div class="flex justify-between items-center">
      <div text-xs>bearing</div>
      <div>{mapPosition.bearing.toFixed(2)}</div>
    </div>
    <div class="flex justify-between items-center">
      <div text-xs>pitch</div>
      <div>{mapPosition.pitch.toFixed(2)}</div>
    </div>
  </div>
{/if}

<style>
  #map {
    top: 0;
    height: 100vh;
    width: 100vw;
    position: fixed;
  }
</style>
