<script>
  import Processen from "./Processen.svelte";
  import BPZ from "./BPZ.svelte";
  
  export let w;
  export let h;
  export let data;
  export let contentMargin

  $: contentHeight = h - 2*contentMargin
  $: contentWidth = w - 2*contentMargin
  $: procesHeight = 0.8*contentHeight
  $: bpzHeight = 0.2*contentHeight

</script>


<div class='content' style='left:{contentMargin}px;top:{contentMargin}px;height:{contentHeight}px; width:{contentWidth}px'>
  <div class='processen' style='height:{procesHeight}px'>
    <Processen {data} w={contentWidth} h={procesHeight}/>
  </div>
  <div class='bpz' style='height:{bpzHeight}px'>
    <BPZ {data} w={contentWidth} h={bpzHeight}/>
  </div>
</div>

<style>
  .content{
    position: absolute;
  }

  .processen{
    /* background-color: rgba(255, 0, 0, 0.05); */
  }
  .bpz{
    background-color: rgba(232, 176, 23, 0.109);
  }
</style>