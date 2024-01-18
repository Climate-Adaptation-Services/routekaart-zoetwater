<script>
  import { procesHover } from "$lib/stores";
  import { onMount } from "svelte";

  export let timeScale
  export let procesHeight
  export let bandStep
  export let data
  export let margin

  const proces = data.proces.filter(d => d['procID'] === $procesHover)[0]
  const procesIndex = parseInt($procesHover.split('proc')[1])

  const procesWidth = timeScale(new Date(proces['Datum eind']+'-30'))-timeScale(new Date(proces['Datum start']+'-01'))

  const offsetX = 20;
  const offsetY = 80;

  let tooltipWidth = 0;
  let tooltipHeight = 0;
  onMount(() => {
    const tooltipContentBox = document.getElementsByClassName('tooltipContent')[0].getBoundingClientRect()
    tooltipWidth = tooltipContentBox.width
    tooltipHeight = tooltipContentBox.height
  })

</script>

<div class='tooltip' style='left:{timeScale(new Date(proces['Datum start']+'-01'))}px; top:{procesIndex*bandStep - bandStep + procesHeight}px'>

  <div class='tooltipContent' style='transform:translate({offsetX}px,{offsetY+procesHeight}px)'>
    <h4>
      {proces['Volledige titel']}
    </h4>
  </div>
  {#if tooltipWidth > 0}
    <svg>
      <g class='tooltip' transform='translate(0,{procesHeight})'
        stroke='black' stroke-dasharray="7 7">
        <line 
          x1={0}
          x2={offsetX} 
          y1={0} 
          y2={offsetY} 
        />
        <line 
          x1={procesWidth}
          x2={tooltipWidth + offsetX} 
          y1={0} 
          y2={offsetY} 
        />
        <path 
          d="
            M{offsetX} {offsetY} 
            l{tooltipWidth} 0 
            l0 {tooltipHeight}
            l-{tooltipWidth} 0
            z
          "
        />
      </g>
    </svg>
  {/if}
</div>

<style>
  path{
    fill:antiquewhite;
  }

  .tooltip{
    position: absolute;
    z-index: 500;
    pointer-events: none;
    width:800px;
    height:800px;
  }

  .tooltipContent{
    position: absolute;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  }

  svg{
    width:100%;
    height:100%;
  }

</style>