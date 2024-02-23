<script>
  import { spoorSelection, timeScale } from "$lib/stores";

  export let h;
  export let w;

  $: spoor = ($spoorSelection['bpzID']) ? 'bpz' : 'omgeving';
  
  $: bbox = document.getElementsByClassName(`circle-${$spoorSelection['Korte titel'].replaceAll(' ','')}`)[0].getBoundingClientRect()

</script>   

<div class='tooltip-spoor' style='left:{(bbox.left > w*0.6) ? bbox.left - 500 : bbox.left}px; top:{bbox.top-250}px; border:5px solid {(spoor === 'bpz') ? '#EA7722' : '#6FAD33'}'>
  <h4>{$spoorSelection['Volledige titel']}</h4>
  <p style='font-size:14px'>{$spoorSelection['Korte beschrijving']}</p>
</div>

<style>
  .tooltip-spoor{
    position: absolute;
    border-radius: 10px;
    z-index: 10000;
    max-width:350px;
    background-color: #F4EEE6;
    padding: 0px 10px 0px 10px;
  }

</style>