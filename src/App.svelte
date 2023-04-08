<script lang="ts">
  import Map from "./Map.svelte";
  import Header from "./Header.svelte";
  import Epilogue from "./Epilogue.svelte";
  import Colophon from "./Colophon.svelte";
  import Station from "./Station.svelte";
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
      parseInt(stationNo) < 42 ? "rgba(0, 0, 0, 0.6)" : "#eb4d4b"
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

    const data = stationData[stationNo];
    const center = data ? [data.longitude, data.latitude] : [139, 35.681];
    const transition = stationTransition[stationNo];

    map.flyTo({
      center,
      zoom: transition.zoom ?? 13,
      pitch: transition.pitch ?? 60,
      bearing: transition.bearing ?? -60,
      speed: 0.8,
    });
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

  <div>
    {#each stationData as data}
      <Station {data} />
    {/each}
  </div>

  <Epilogue />

  <Colophon />
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
