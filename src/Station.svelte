<script>
  export let data;

  const title =
    1 <= data.no && data.no <= 53 ? `${data.no}. ${data.name}` : data.name;

  const reading =
    1 <= data.no && data.no <= 53
      ? `&emsp;&emsp;&ensp;${data.name_roman}`
      : data.name_roman;

  const alignment = data.no % 2 == 0 ? "righty" : "lefty";
</script>

<div id={data.no} class="wrapper {alignment}">
  <div class="content bg-gray-900/95 rounded-md">
    <div class="text-center flex flex-col mb-4">
      <div class="text-xs font-roman">{@html reading}</div>
      <h2 class="text-2xl font-yuji">{title}</h2>
    </div>

    <div class="mb-4">
      <img class="rounded-lg" src={data.img_path} alt={data.name} />
      <p class="text-xs text-center mt-2">{data.img_caption}</p>
    </div>

    <div class="text-xs flex flex-col gap-y-3 leading-none opacity-75">
      <p>
        "{data.extract_ja}"
        <a href={data.wikipedia_ja} target="_blank" rel="noopener noreferrer"
          >Wikipedia (ja)</a
        >
      </p>
      <p>
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
