<script>
  import { scaleTime, select, selectAll } from "d3";

  export let data
  export let w
  export let h

  const margin = {top:20, left:0, bottom:30, right:0}
  $: innerHeight = h - margin.top - margin.bottom
  $: innerWidth = w - margin.left - margin.right

  $: timeScale = scaleTime()
    .domain([new Date("2023-01-01"), new Date("2027-07-01")])
    .range([0, innerWidth])

  const bandPadding = 7
  $: bandStep = innerHeight / data.proces.length 

  const procesHeight = 22

  const procesColors = {
    'Landelijk team': '#0070C0',
    "Regio": '#C00001',
    "Samen": '#00B050'
  }

  function mouseOverProces(proces){
    selectAll('.proces-g')
      .style('opacity', 0.5)
    select('.proces-g-' + proces['procID'])
      .style('opacity', 1)
  }

  function mouseOutProces(){
    selectAll('.proces-g')
      .style('opacity', 1)
  }

</script>

<svg class='procesSVG'>
  <g transform='translate({margin.left},{margin.top})'>
    {#each data.proces as proces, i}
      <g transform='translate({0},{i*bandStep})' class={'proces-g proces-g-' + proces['procID']}>
        <rect 
          class={'proces-' + proces['procID']}
          x={timeScale(new Date(proces['Datum start']+'-01'))}
          y={0} 
          height={procesHeight}
          width={timeScale(new Date(proces['Datum eind']+'-30')) - timeScale(new Date(proces['Datum start']+'-01')) - 2} 
          fill={procesColors[proces['Wie']]}
          stroke='black' 
          on:mouseover={() => mouseOverProces(proces)}
          on:mouseout={() => mouseOutProces(proces)}/>
        {#each data.product.filter(product => product['procID'] === proces['procID']) as product, j}
          <rect 
            class={'product-' + product['prodID'] + '-' + j}
            x={0}
            y={0}
            width={22*Math.sin(0.25*Math.PI)}
            height={22*Math.sin(0.25*Math.PI)}
            fill='white'
            stroke='black'
            transform='translate({timeScale(new Date(product['Datum']+'-30'))-1},0) rotate(45)'
          />
        {/each}
        <text 
          x={timeScale(new Date(proces['Datum start']+'-01')) + (timeScale(new Date(proces['Datum eind']+'-30')) - timeScale(new Date(proces['Datum start']+'-01')) - 2)/2}
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

<style>
  svg{
    width:100%;
    height:100%;
  }

  .proces-g{
    transition:all 0.5s
  }
</style>

