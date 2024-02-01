<script>
  import { timeScale } from "$lib/stores";
  import GroenePijl from "./GroenePijl.svelte";

  export let product;
  export let procesHeight;
  export let data;
  export let bandStep;
  export let j;

</script>


<g class='product' transform='translate({$timeScale(new Date(product['Datum']+'-30'))-1},0)'>
  <rect 
    transform='rotate(45)'
    class={'product-' + product['prodID'] + '-' + j}
    x={0}
    y={0}
    width={procesHeight*Math.sin(0.25*Math.PI)}
    height={procesHeight*Math.sin(0.25*Math.PI)}
    fill='rgb(245,250,240)'
    style='-webkit-filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .3));'
  />
  {#each data.pijlen.filter(d => d['prodID'] === product['prodID']) as pijl}
    <GroenePijl {pijl} {procesHeight} {bandStep} {data}/>
  {/each}
</g>

<style>
  .product{
    pointer-events: none;
  }
</style>