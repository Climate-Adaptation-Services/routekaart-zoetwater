<script>
  import { procesSelection, timeScale, procesColors } from "$lib/stores";
  import Product from "./Product.svelte";

  import TooltipProces from "./TooltipProces.svelte";

  export let data
  export let w
  export let h

  const margin = {top:20, bottom:30}
  $: innerHeight = h - margin.top - margin.bottom

  // $: bandPadding = h*0.04
  $: bandStep = innerHeight / data.proces.length 

  $: procesHeight = h*0.03

  function clickProces(proces){
    procesSelection.set(null)
    setTimeout(() => { procesSelection.set(proces['procID']) }, 1);
  }

  // function mouseOutProces(){
  //   procesSelection.set(null)
  // }

</script>

{#if $timeScale}
  <svg class='procesSVG' viewBox="0 0 {w} {h}" on:click={() => procesSelection.set(null)}>
    <defs>
      <filter id='glow'>
        <feGaussianBlur stdDeviation='2.5' result='coloredBlur'/>
        <feMerge>
          <feMergeNode in="coloredBlur"></feMergeNode>
          <feMergeNode in='SourceGraphic'></feMergeNode>
        </feMerge>
      </filter>
      <marker
        id="arrowgreen"
        fill="green"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="3"
        markerHeight="3"
        orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>
    <g transform='translate({0},{margin.top})'>
      {#each data.proces as proces, i}
        <g transform='translate({0},{i*bandStep})' class={'proces-g proces-g-' + proces['procID']}
          opacity={($procesSelection && $procesSelection !== proces['procID'])
            ? 0.2 
            : 1}>
          <rect 
            class={'proces-' + proces['procID']}
            x={$timeScale(new Date(proces['Datum start']+'-01'))}
            y={0} 
            height={procesHeight}
            width={$timeScale(new Date(proces['Datum eind']+'-30')) - $timeScale(new Date(proces['Datum start']+'-01')) - 2} 
            fill={$procesColors[proces['Wie']]}
            stroke='none' 
            style='filter:url(#glow)'
            on:click={() => clickProces(proces)}
          />
          {#each data.product.filter(product => product['procID'] === proces['procID']) as product, j}
            <Product {product} {data} {procesHeight} {bandStep} {j} />
          {/each}

          <text 
            class='proces-titel'
            x={$timeScale(new Date(proces['Datum start']+'-01')) + ($timeScale(new Date(proces['Datum eind']+'-30')) - $timeScale(new Date(proces['Datum start']+'-01')) - 2)/2}
            dx={(proces['Korte titel'] === 'Ontwikkelpadenkaarten') ? 60 : 0}
            y='1.1em'
            font-size={h*0.02}
            text-anchor='middle'
            style='fill:white'
            pointer-events='none'>
            {proces['Korte titel']}
          </text>
        </g>
      {/each}
    </g>
  </svg>
  {#if $procesSelection !== null}
    <TooltipProces {procesHeight} {bandStep} {data} {margin} />
  {/if}
{/if}


<style>
  svg{
    width:100%;
    height:100%;
  }

  .proces-g{
    transition:all 0.8s;
    cursor: pointer;
  }

  .proces-titel{
    transition: all 1s;

  }
</style>

