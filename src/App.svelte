<script lang="ts">
  import Map from "./lib/Map.svelte";
  import Header from "./lib/Header.svelte";
  import Epilogue from "./lib/Epilogue.svelte";
  import Footer from "./lib/Footer.svelte";
  import Station from "./lib/Station.svelte";
  import { MAP_CONFIG } from "./assets/config";
  import stationData from "./assets/stations.json";
  import roadProgress from "./assets/progress.json";
  import stationTransition from "./assets/transtion.json";
  import scrollama from "scrollama";
  import { onMount } from "svelte";

  let map;

  const scroller = scrollama();

  const updateRoadProgress = (stationNo) => {
    if (!map) return;

    map.setPaintProperty("road-1", "line-gradient", [
      "step",
      ["line-progress"],
      "#eb4d4b",
      roadProgress[stationNo].road_1,
      "rgba(0, 0, 0, 0.6)",
    ]);

    map.setPaintProperty(
      "boat",
      "line-color",
      42 <= parseInt(stationNo) && parseInt(stationNo) <= 54
        ? "#eb4d4b"
        : "rgba(0, 0, 0, 0.6)"
    );
    map.setPaintProperty("road-2", "line-gradient", [
      "step",
      ["line-progress"],
      "#eb4d4b",
      roadProgress[stationNo].road_2,
      "rgba(0, 0, 0, 0.6)",
    ]);
  };

  const updateStationCircle = (stationNo) => {
    map.setPaintProperty("station-circle", "circle-color", [
      "case",
      ["==", ["get", "no"], stationNo],
      "#eb4d4b",
      "rgba(31,41,55,1)",
    ]);

    map.setPaintProperty("station-circle", "circle-radius", [
      "interpolate",
      ["linear"],
      ["zoom"],
      6,
      ["case", ["==", ["get", "no"], stationNo], 10, 0],
      8,
      ["case", ["==", ["get", "no"], stationNo], 18, 12],
      10,
      ["case", ["==", ["get", "no"], stationNo], 24, 12],
    ]);
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
    const transition = stationTransition[stationNo];

    map.flyTo({
      center,
      zoom: transition.zoom ?? 13,
      pitch: transition.pitch ?? 60,
      bearing: transition.bearing ?? -60,
      speed: 0.8,
    });

    if (transition.rotate) {
      map.once("moveend", () => {
        const rotateNumber = map.getBearing();
        map.rotateTo(rotateNumber + 180, {
          duration: 60000,
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
