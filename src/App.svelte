<script lang="ts">
  import Map from "./Map.svelte";
  import Header from "./Header.svelte";
  import Colophon from "./Colophon.svelte";
  import Station from "./Station.svelte";
  import stationData from "./assets/stations.json";
</script>

<main>
  <Map />

  <Header />

  <div id="station-container">
    {#each stationData as data}
      <Station {data} />
    {/each}
  </div>

  <Colophon />
</main>

<style>
  #station-container {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }
</style>
