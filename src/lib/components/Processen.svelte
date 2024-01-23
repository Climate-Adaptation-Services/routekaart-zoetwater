<script>
  import { procesHover, productHover, timeScale } from "$lib/stores";

  import Tooltip from "./Tooltip.svelte";

  export let data
  export let w
  export let h

  const margin = {top:20, bottom:30}
  $: innerHeight = h - margin.top - margin.bottom

  const bandPadding = 7
  $: bandStep = innerHeight / data.proces.length 

  const procesHeight = 22

  const procesColors = {
    'Landelijk team': '#0070C0',
    "Regio": '#C00001',
    "Samen": '#00B050'
  }

  function mouseOverProces(proces){
    procesHover.set(proces['procID'])
  }

  function mouseOutProces(){
    procesHover.set(null)
  }

  function mouseOverProduct(product){
    productHover.set(product['prodID'])
  }

  function mouseOutProduct(){
    productHover.set(null)
  }

</script>

{#if $timeScale}
  <svg class='procesSVG'>
    <defs>
      <filter id='glow'>
        <feGaussianBlur stdDeviation='2.5' result='coloredBlur'/>
        <feMerge>
          <feMergeNode in="coloredBlur"></feMergeNode>
          <feMergeNode in='SourceGraphic'></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <g transform='translate({0},{margin.top})'>
      {#each data.proces as proces, i}
        <g transform='translate({0},{i*bandStep})' class={'proces-g proces-g-' + proces['procID']}
          opacity={(($procesHover && $procesHover !== proces['procID']) || ($productHover && proces['procID'] !== data.product.filter(d => d['prodID'] === $productHover)[0]['procID']))
            ? 0.2 
            : 1}>
          <rect 
            class={'proces-' + proces['procID']}
            x={$timeScale(new Date(proces['Datum start']+'-01'))}
            y={0} 
            height={procesHeight}
            width={$timeScale(new Date(proces['Datum eind']+'-30')) - $timeScale(new Date(proces['Datum start']+'-01')) - 2} 
            fill={procesColors[proces['Wie']]}
            stroke='none' 
            style='filter:url(#glow)'
            on:mouseover={() => mouseOverProces(proces)}
            on:mouseout={() => mouseOutProces(proces)}/>
          {#each data.product.filter(product => product['procID'] === proces['procID']) as product, j}
            <g transform='translate({$timeScale(new Date(product['Datum']+'-30'))-1},0) rotate(45)'>
              <rect 
                class={'product-' + product['prodID'] + '-' + j}
                x={0}
                y={0}
                width={22*Math.sin(0.25*Math.PI)}
                height={22*Math.sin(0.25*Math.PI)}
                fill='rgb(245,250,240)'
                style='-webkit-filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .3));'
                on:mouseover={() => mouseOverProduct(product)}
                on:mouseout={() => mouseOutProduct(product)}
              />
              {#if $productHover === product['prodID']}
                <image pointer-events='none' href='/images/goal.png' width={22*Math.sin(0.25*Math.PI)}></image>
              {/if}
            </g>
          {/each}
          <text 
            x={$timeScale(new Date(proces['Datum start']+'-01')) + ($timeScale(new Date(proces['Datum eind']+'-30')) - $timeScale(new Date(proces['Datum start']+'-01')) - 2)/2}
            dx={(proces['Korte titel'] === 'Ontwikkelpadenkaarten') ? 60 : 0}
            y='1.2em'
            font-size='13'
            text-anchor='middle'
            style='fill:white'
            pointer-events='none'>
            {proces['Korte titel']}
          </text>
        </g>
      {/each}
    </g>
  </svg>
  {#if $procesHover !== null || $productHover !== null}
    <Tooltip {procesHeight} {bandStep} {data} {margin} />
  {/if}
{/if}


<style>
  svg{
    width:100%;
    height:100%;
  }

  .proces-g{
    transition:all 0.8s;
  }
</style>

