<script>
  export let data;
  const alignment = data.no % 2 == 0 ? "righty" : "lefty";
</script>

<div id={data.no} class="step wrapper {alignment}">
  <div class="content card rounded-md">
    <div class="text-center flex flex-col mb-4">
      <div class="text-2 font-inknut">{data.name_roman}</div>
      <h2 class="text-xl font-yuji">{data.name}</h2>
    </div>

    <div class="mb-4">
      <a href={data.wikipedia_ja} target="_blank" rel="noopener noreferrer"
        ><img
          class="rounded-lg hover:opacity-85"
          src={data.img_path}
          alt={data.name}
        /></a
      >
      <p class="text-xs text-center mt-2">{data.img_caption}</p>
    </div>

    <div class="text-xs flex flex-col gap-y-3 opacity-75 leading-tight">
      <p>
        "{data.extract_ja}"
        <a href={data.wikipedia_ja} target="_blank" rel="noopener noreferrer"
          >Wikipedia (ja)</a
        >
      </p>
      <p class="font-roman">
        "{data.extract_en}"
        <a href={data.wikipedia_en} target="_blank" rel="noopener noreferrer"
          >Wikipedia (en)</a
        >
      </p>
    </div>
  </div>
</div>

<style>
  .wrapper {
    position: relative;
    z-index: 5;
    width: 33vw;
    padding-bottom: 50vh;
  }

  .wrapper.lefty {
    margin-left: 5vw;
  }
  .wrapper.righty {
    margin-left: 62vw;
  }
  @media (max-width: 768px) {
    .wrapper.lefty,
    .wrapper.righty {
      width: 84vw;
      margin: 0 auto;
    }
  }

  .content {
    opacity: 0.9;
    padding: 2em 1.5em;
  }
</style>
