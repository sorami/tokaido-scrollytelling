<script lang="ts">
  import Map from "./lib/Map.svelte";
  import Header from "./lib/Header.svelte";
  import Epilogue from "./lib/Epilogue.svelte";
  import Footer from "./lib/Footer.svelte";
  import Station from "./lib/Station.svelte";
  import {
    MAP_CONFIG,
    createCircleRadiusExpression,
    createTextSizeExpression,
  } from "./assets/config";
  import stationData from "./assets/stations.json";
  import roadProgress from "./assets/progress.json";
  import { transitionSettings } from "./assets/transition";
  import scrollama from "scrollama";
  import bearing from "@turf/bearing";
  import { onMount } from "svelte";

  let map;

  let fogStyle: "day" | "night" = "day";

  const scroller = scrollama();

  const updateRoadProgress = (stationNo) => {
    if (!map) return;

    map.setPaintProperty("road-1", "line-gradient", [
      "step",
      ["line-progress"],
      MAP_CONFIG.line.progressColor,
      roadProgress[stationNo].road_1,
      MAP_CONFIG.line.nonProgressColor,
    ]);

    map.setPaintProperty(
      "boat",
      "line-color",
      42 <= parseInt(stationNo) && parseInt(stationNo) <= 54
        ? MAP_CONFIG.line.progressColor
        : MAP_CONFIG.line.nonProgressColor
    );
    map.setPaintProperty("road-2", "line-gradient", [
      "step",
      ["line-progress"],
      MAP_CONFIG.line.progressColor,
      roadProgress[stationNo].road_2,
      MAP_CONFIG.line.nonProgressColor,
    ]);
  };

  const updateStationCircle = (stationNo) => {
    map.setPaintProperty("station-circle", "circle-color", [
      "case",
      ["==", ["get", "no"], stationNo],
      MAP_CONFIG.point.targetCircleColor,
      MAP_CONFIG.point.circleColor,
    ]);

    map.setPaintProperty(
      "station-circle",
      "circle-radius",
      createCircleRadiusExpression(stationNo)
    );
    map.setLayoutProperty(
      "station-label",
      "text-size",
      createTextSizeExpression(stationNo)
    );
  };

  const calculateBearing = (stationNo: string) => {
    const no = parseInt(stationNo);
    if (!(0 <= no && no <= 53)) {
      return transitionSettings.default.bearing;
    }

    // Bearing from the current station to the next station
    const curr = [stationData[no].longitude, stationData[no].latitude];
    const next = [stationData[no + 1].longitude, stationData[no + 1].latitude];
    return bearing(curr, next);
  };

  const updateMapPosition = (stationNo) => {
    if (!map) return;

    if (stationNo === "-1") {
      map.fitBounds(MAP_CONFIG.bounds, {
        padding: 80,
        bearing: 0,
        pitch: 60,
      });
      return;
    }

    const center = [
      stationData[stationNo].longitude,
      stationData[stationNo].latitude,
    ];
    const transition = transitionSettings.stations[stationNo];

    if (transition) {
      map.flyTo({
        center,
        zoom: transition.zoom ?? transitionSettings.default.zoom,
        pitch: transition.pitch ?? transitionSettings.default.pitch,
        bearing: transition.bearing ?? calculateBearing(stationNo),
        speed: transition.speed ?? transitionSettings.default.speed,
      });
    } else {
      map.flyTo({
        center,
        zoom: transitionSettings.default.zoom,
        pitch: transitionSettings.default.pitch,
        bearing: calculateBearing(stationNo),
        speed: transitionSettings.default.speed,
      });
    }

    if (transition.rotate) {
      map.once("moveend", () => {
        const rotateNumber = map.getBearing();
        map.rotateTo(rotateNumber + transitionSettings.rotation.bearing, {
          duration: transitionSettings.rotation.duration,
          easing: (t) => t,
        });
      });
    }
  };

  onMount(() => {
    scroller
      .setup({
        step: ".step",
        offset: 0.5,
        progress: true,
      })
      .onStepEnter(async (response) => {
        response.element.classList.add("active");
        const stationNo = response.element.id;
        updateStationCircle(stationNo);
        updateRoadProgress(stationNo);
        updateMapPosition(stationNo);

        if (Math.random() < MAP_CONFIG.terrain.fog.switch_probability) {
          if (fogStyle === "day") {
            map.setFog(MAP_CONFIG.terrain.fog.night);
            fogStyle = "night";
          } else if (fogStyle === "night") {
            map.setFog(MAP_CONFIG.terrain.fog.day);
            fogStyle = "day";
          }
        }
      })
      .onStepExit(async (response) => {
        response.element.classList.remove("active");
      });
  });
</script>

<main>
  <Map bind:map />

  <Header />

  <div id="steps">
    <!-- Dummy step for map positioning when scrolling back -->
    <div id="-1" class="step pb-[30vh]">
      <div class="hidden" />
    </div>

    {#each stationData as data}
      <Station {data} />
    {/each}

    <Epilogue />

    <!-- Dummy step for map positioning in the end -->
    <div id="-1" class="step pt-[5vh]">
      <div class="hidden" />
    </div>
  </div>

  <Footer />
</main>

<style>
  :global(.step) {
    opacity: 0.3 !important;
    transition: opacity 800ms;
  }
  :global(.step.active) {
    opacity: 1 !important;
  }
</style>
