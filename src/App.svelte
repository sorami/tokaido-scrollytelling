<script lang="ts">
  import Map from "./Map.svelte";
  import Header from "./Header.svelte";
  import Epilogue from "./Epilogue.svelte";
  import Colophon from "./Colophon.svelte";
  import Station from "./Station.svelte";
  import stationData from "./assets/stations.json";
  import scrollama from "scrollama";
  import { onMount } from "svelte";

  let map;

  const scroller = scrollama();

  onMount(() => {
    scroller
      .setup({
        step: ".step",
        offset: 0.5,
        progress: true,
      })
      .onStepEnter(async (response) => {
        response.element.classList.add("active");
        const curr = stationData[response.element.id];

        if (!map) return;
        map.flyTo({
          center: [curr.longitude, curr.latitude],
          zoom: 13,
          pitch: 60,
          bearing: 0,
        });
      })
      .onStepExit(async (response) => {
        response.element.classList.remove("active");
      });
  });
</script>

<main>
  <Map bind:map />

  <Header />

  <div id="station-container">
    {#each stationData as data}
      <Station {data} />
    {/each}
  </div>

  <Epilogue />

  <Colophon />
</main>

<style>
  #station-container {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }

  :global(.step) {
    opacity: 0.3 !important;
  }
  :global(.step.active) {
    opacity: 1 !important;
  }
</style>
