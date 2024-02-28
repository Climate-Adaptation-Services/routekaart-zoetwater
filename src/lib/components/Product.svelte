<script>
  import { timeScale, procesColors } from "$lib/stores";
  import GroenePijl from "./GroenePijl.svelte";

  export let product;
  export let procesHeight;
  export let data;
  export let bandStep;
  export let j;

  const proces = data.proces.filter(d => d['procID'] === product['procID'])[0]

</script>


<g class='product' transform='translate({$timeScale(new Date(product['Datum']))-1},0)'>
  <rect 
    transform='rotate(45)'
    class={'product-' + product['prodID'] + '-' + j}
    x={0}
    y={0}
    width={procesHeight*Math.sin(0.25*Math.PI)}
    height={procesHeight*Math.sin(0.25*Math.PI)}
    fill={'rgb(245,250,240)'}
    stroke={$procesColors[proces['Wie']]}
    stroke-width='2'
    style='-webkit-filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .3));'
  />
  {#if product['Weblink']}
    <image xlink:href='/images/check.png' width={procesHeight+5} x={-procesHeight*0.48} y='-7'/>
  {/if}
  {#each data.pijlen.filter(d => d['prodID'] === product['prodID']) as pijl}
    <GroenePijl {pijl} {procesHeight} {bandStep} {data}/>
  {/each}
</g>

<style>
  .product{
    pointer-events: none;
  }
</style>