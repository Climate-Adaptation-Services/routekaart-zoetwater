<script>
  import Background from "$lib/components/Background.svelte";
  import Content from "$lib/components/Content.svelte";
  import { scaleTime } from "d3"

  export let data;

  let wBackground;
  let hBackground;
  const contentMargin = 50

  $: console.log(data)

  const timeScale = scaleTime()
    .domain([new Date("2023-01-01"), new Date("2027-07-01")])
    .range([0, wBackground])

</script>


<div class='container' bind:clientWidth={wBackground} bind:clientHeight={hBackground}>
  {#if wBackground && data}
    <Background w={wBackground} h={hBackground} {contentMargin} {data} {timeScale}/>

    <Content w={wBackground} h={hBackground} {data} {contentMargin} {timeScale} />
  {/if}
</div>

<style>
  .container{
    height:100%;
  }

</style>