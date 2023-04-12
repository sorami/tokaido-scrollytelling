<div id="footer" class="card">
  <div class="max-w-2xl text-center m-auto flex flex-col gap-y-8 font-sans">
    <div>
      <h3>Data</h3>
      <p>
        Images: 歌川広重「東海道五拾三次之内」（保永堂版） - <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ja.wikipedia.org/wiki/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1_(%E6%B5%AE%E4%B8%96%E7%B5%B5)"
          >東海道五十三次 (浮世絵) - Wikipedia</a
        > (Public Domain)
      </p>
      <p>
        Roads: <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/japan-road-jp/Gokaodo-Map"
          >japan-road-jp/Gokaodo-Map</a
        > (CC BY-NC-SA 4.0)
      </p>
      <p>
        Stations: <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ja.wikipedia.org/wiki/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1)"
          >東海道五十三次 - Wikipedia</a
        >
      </p>
      <p>
        Map Style: <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.mierune.co.jp/maptiler"
          >MapTiler - MIERUNE Streets</a
        >
      </p>
    </div>

    <div>
      <h3>Code</h3>
      <p>Mapbox GL JS, Scrollama, Svelte, Turf.js, UnoCSS, ...</p>
    </div>

    <div class="my-6 text-sm">
      Data & Code → <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/sorami/tokaido-scrollytelling"
        >https://github.com/sorami/tokaido-scrollytelling</a
      >
    </div>

    <div text-sm>
      <a target="_blank" rel="noopener noreferrer" href="https://sorami.dev"
        >sorami.dev</a
      >
    </div>
  </div>
</div>

<style>
  #footer {
    position: relative;
    z-index: 5;
    margin: auto;
    width: 100%;
    position: relative;
    text-align: center;
    margin: 0;
    padding: 3vh 2vw;
  }

  p > a,
  p > a:visited {
    @apply text-gray-300;
    text-decoration: underline;
  }

  h3 {
    @apply text-sm font-bold;
  }

  p {
    @apply text-xs;
  }
</style>
