<script>
// @ts-nocheck

  import { procesSelection, timeScale, procesColors, spoorPijl, spoorSelection } from "$lib/stores";
  import Product from "./Product.svelte";
  import { select } from "d3";

  import TooltipProces from "./TooltipProces.svelte";

  export let data
  export let w
  export let h
  export let bandStep
  export let margin
  export let innerHeight

  $: procesHeight = h*0.03

  function clickProces(proces){
    select('.proces-' + proces['procID'])
      .style('stroke', 'none')

    spoorSelection.set(null)
    procesSelection.set(null)
    setTimeout(() => { procesSelection.set(proces['procID']) }, 1);
  }

</script>

{#if $timeScale}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <svg class='procesSVG' viewBox="0 0 {w} {h}" on:click={() => {procesSelection.set(null); spoorPijl.set(null); spoorSelection.set(null)}}>
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
          opacity={(
            $procesSelection && 
            $procesSelection !== proces['procID'] || 
            (
              $spoorPijl && 
              // dit is ingewikkeld
              !data.product.filter(d => $spoorPijl['prodID'].split(',').includes(d['prodID'])).map(d => d['procID']).includes(proces['procID'])
            ))
            ? 0.2 
            : 1}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <rect 
            class={'procesrect proces-' + proces['procID']}
            x={$timeScale(new Date(proces['Datum start']))}
            y={0} 
            height={procesHeight}
            width={$timeScale(new Date(proces['Datum eind'])) - $timeScale(new Date(proces['Datum start'])) - 2} 
            fill={$procesColors[proces['Wie']]}
            style='filter:url(#glow)'
            on:click={() => clickProces(proces)}
            on:mouseover={() => {if($procesSelection === null){select('.proces-' + proces['procID']).style('stroke', 'white')}}}
            on:mouseout={() => select('.proces-' + proces['procID']).style('stroke', 'none')}
          />
          {#each data.product.filter(product => product['procID'] === proces['procID']) as product, j}
            <Product {product} {data} {procesHeight} {bandStep} {j} />
          {/each}

          <text 
            class='proces-titel'
            x={$timeScale(new Date(proces['Datum start'])) + ($timeScale(new Date(proces['Datum eind'])) - $timeScale(new Date(proces['Datum start'])) - 2)/2}
            dx={(proces['Korte titel'] === 'Ontwikkelpadenkaarten') 
              ? 110 
              : (proces['Korte titel'] === 'Beschrijving mogelijke maatregelen') 
                ? -40
                : 0
            }
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
    transition:all 0.2s;
    cursor: pointer;  
  }

  .procesrect:hover{
    stroke-dasharray:7 7;
    stroke-width:1.5;
    animation: dash 120s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: -1000;
    }
  }

  .proces-titel{
    transition: all 1s;

  }
</style>

