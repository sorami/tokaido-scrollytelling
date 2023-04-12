<script>
  const scrollToFirstCard = () => {
    const element = document.querySelector(".station");
    element.scrollIntoView({ behavior: "smooth" });
  };
</script>

<div id="header" class="card">
  <h1 class="text-3xl font-yuji">東海道中スクロール栗毛</h1>

  <div class="font-inknut mt-2 mb-8">
    Scrollytelling the 53 Stations of the Tōkaidō in Japan
  </div>

  <div class="text-xs max-w-2xl m-auto flex flex-col gap-y-3">
    <div>
      ”東海道五十三次（とうかいどうごじゅうさんつぎ）は、江戸時代に整備された五街道の一つ、東海道にある53の宿場を指す。古来、道中には風光明媚な場所や有名な名所旧跡が多く、浮世絵や和歌・俳句の題材にもしばしば取り上げられた。”
      <br />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://ja.wikipedia.org/wiki/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1"
        >Wikipedia (ja)</a
      >
    </div>

    <div class="font-roman">
      "The 53 Stations of the Tōkaidō (東海道五十三次, Tōkaidō Gojūsan-tsugi)
      are the rest areas along the Tōkaidō, which was a coastal route that ran
      from Nihonbashi in Edo (modern-day Tokyo) to Sanjō Ōhashi in Kyoto."
      <br />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://en.wikipedia.org/wiki/53_Stations_of_the_T%C5%8Dkaid%C5%8D"
        >Wikipedia (en)</a
      >
    </div>
  </div>

  <div class="text-xs font-inknut mt-6">
    <a target="_blank" rel="noopener noreferrer" href="https://sorami.dev"
      >Sorami Hisamoto</a
    >, 2023.04
  </div>

  <div
    id="down-arrow"
    class="m-auto mt-5 w-12 h-12 opacity-50 rounded-full cursor-pointer"
    hover="opacity-100 bg-orange-600/90"
    on:click={scrollToFirstCard}
    on:keypress={scrollToFirstCard}
  >
    <div
      class="inline-block i-material-symbols-keyboard-double-arrow-down w-12 h-12"
    />
  </div>
</div>

<style>
  #header {
    position: relative;
    z-index: 5;
    margin: auto;
    width: 100%;
    position: relative;
    text-align: center;
    margin: 0;
    padding: 3vh 2vw;
  }

  #down-arrow {
    animation: MoveUpDown 2000ms ease-in-out infinite;
  }

  @keyframes MoveUpDown {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(1em);
    }
  }
</style>
