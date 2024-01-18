<script>
  import { scaleTime, scaleBand } from "d3";

  export let data
  export let w
  export let h

  const margin = {top:30, left:0, bottom:30, right:0}
  $: innerHeight = h - margin.top - margin.bottom
  $: innerWidth = w - margin.left - margin.right

  $: timeScale = scaleTime()
    .domain([new Date("2023-01-01"), new Date("2027-07-01")])
    .range([0, innerWidth])

  const bandPadding = 7
  $: bandStep = innerHeight / data.proces.length 

</script>

<svg class='procesSVG'>
  <g transform='translate({margin.left},{margin.top})'>
    {#each data.proces as proces, i}
      <g transform='translate({0},{i*bandStep})'>
        <rect 
          x={timeScale(new Date(proces['Datum start']+'-01'))}
          y={0} 
          height='22'
          width={timeScale(new Date(proces['Datum eind']+'-30')) - timeScale(new Date(proces['Datum start']+'-01')) - 2} 
          fill='#027CC4'
          stroke='black' />
        <rect 
          x={0}
          y={0}
          width='16.5'
          height='16.5'
          fill='white'
          stroke='black'
          transform='translate({timeScale(new Date(proces['Datum eind']+'-30'))-1},0) rotate(45)'
        />
        <text 
          x={timeScale(new Date(proces['Datum start']+'-01')) + (timeScale(new Date(proces['Datum eind']+'-30')) - timeScale(new Date(proces['Datum start']+'-01')) - 2)/2}
          y='1.2em'
          font-size='13'
          text-anchor='middle'
          style='fill:white'>
          {proces['Korte titel']}
        </text>
      </g>
    {/each}
  </g>
</svg>

<style>
  svg{
    width:100%;
    height:100%;
  }
</style>

