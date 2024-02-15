<script>
  import Processen from "./Processen.svelte";
  import Spoor from "./Spoor.svelte";

  export let w;
  export let h;
  export let data;
  export let contentMargin
  export let timeScale

  $: contentHeight = h - 2*contentMargin
  $: contentWidth = w - 2*contentMargin

  let bpz = false;
  let omgeving = false;

  $: bpzHeight = (bpz) ? 0.13*contentHeight : 0.05*contentHeight
  $: omgevingHeight = (omgeving) ? 0.13*contentHeight : 0.05*contentHeight

  $: quarterPadding = 0.05*contentHeight

  $: procesHeight = contentHeight - bpzHeight - omgevingHeight - quarterPadding

  const margin = {top:20, bottom:30}
  $: innerHeight = procesHeight - margin.top - margin.bottom
  $: bandStep = innerHeight / data.proces.length 


  function clickSpoor(spoor){
    (spoor === 'bpz')
      ? (bpz) 
        ? bpz = false 
        : bpz = true
      : (omgeving)
        ? omgeving = false
        : omgeving = true
  }
  
</script>


<div class='content' style='left:{contentMargin}px;top:{contentMargin}px;height:{contentHeight}px; width:{contentWidth}px'>
  <div class='processen' style='height:{procesHeight}px'>
    <Processen {data} w={contentWidth} h={procesHeight} {margin} {innerHeight} {bandStep}/>
  </div>
  
  {#each ['bpz', 'omgeving'] as spoor}
    <div class={'spoor ' + spoor} style='height:{(spoor === 'bpz') ? bpzHeight : omgevingHeight}px'>
      <Spoor {data} w={contentWidth} hUitgeklapt={0.13*contentHeight} hIngeklapt={0.05*contentHeight} {spoor} uitgeklapt={(spoor === 'bpz') ? bpz : omgeving} 
        {clickSpoor} {procesHeight} {bpzHeight} {bandStep} {margin}/>
    </div>
  {/each}
  <div class='quarter-padding' style='height:{quarterPadding}px'>
  </div>
</div>

<style>
  .content{
    position: absolute;
  }

  .processen{
    /* background-color: rgba(255, 0, 0, 0.05); */
    transition: all 1s;
  }
</style>