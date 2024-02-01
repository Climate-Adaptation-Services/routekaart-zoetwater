<script>
  import { procesHover, productHover, timeScale, procesColors } from "$lib/stores";
  import GroenePijl from "./GroenePijl.svelte";

  import TooltipProces from "./TooltipProces.svelte";

  export let data
  export let w
  export let h

  const margin = {top:20, bottom:30}
  $: innerHeight = h - margin.top - margin.bottom

  const bandPadding = 7
  $: bandStep = innerHeight / data.proces.length 

  const procesHeight = 22

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
      <marker
        id="arrowgreen"
        fill="green"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="4"
        markerHeight="4"
        orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
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
            fill={$procesColors[proces['Wie']]}
            stroke='none' 
            style='filter:url(#glow)'
            on:mouseover={() => mouseOverProces(proces)}
            on:mouseout={() => mouseOutProces(proces)}/>
          {#each data.product.filter(product => product['procID'] === proces['procID']) as product, j}
            <g transform='translate({$timeScale(new Date(product['Datum']+'-30'))-1},0)'>
              <rect 
                transform='rotate(45)'
                class={'product-' + product['prodID'] + '-' + j}
                x={0}
                y={0}
                width={procesHeight*Math.sin(0.25*Math.PI)}
                height={procesHeight*Math.sin(0.25*Math.PI)}
                fill='rgb(245,250,240)'
                style='-webkit-filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .3));'
                on:mouseover={() => mouseOverProduct(product)}
                on:mouseout={() => mouseOutProduct(product)}
              />
              {#if $productHover === product['prodID']}
                <image pointer-events='none' href='/images/goal.png' width={22*Math.sin(0.25*Math.PI)} x={-0.5*procesHeight*Math.sin(0.25*Math.PI)} y={0.2*procesHeight*Math.sin(0.25*Math.PI)}></image>
              {/if}
              {#each data.pijlen.filter(d => d['prodID'] === product['prodID']) as pijl}
                <GroenePijl {pijl} {procesHeight} {bandStep} {data}/>
              {/each}
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
  }
</style>

