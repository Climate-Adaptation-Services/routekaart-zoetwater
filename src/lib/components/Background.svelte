<script>
  import { timeScale } from "$lib/stores";
  import { scaleTime } from "d3"
    import { afterUpdate } from "svelte";

  export let w
  export let h
  export let contentMargin
  export let data

  $: svgWidth = w - 2*contentMargin
  $: svgHeight = h - 2*contentMargin

  const years = [2023,2024,2025,2026,2027]
  const quarters = ['Q1','Q2','Q3','Q4']
  const quarterpadding = 3
  $: quarterWidth = svgWidth / (4.5*quarters.length)

  $: if(w > 0){
    timeScale.set(scaleTime()
      .domain([new Date("2023-01-01"), new Date("2027-07-01")])
      .range([0, svgWidth]))
  }

  let fasen = []
  afterUpdate(() => {
    fasen = []
    data.fases.forEach(fase => {
      fasen.push({
        naam:fase['Titel'], 
        tijd:[$timeScale(new Date(fase['Datum start']+'-01')), $timeScale(new Date(fase['Datum eind']+'-30'))]}
      )
    });
  }, [$timeScale])


</script>

<div class='background'>
  {#if $timeScale}
    <svg>
      <g transform='translate({contentMargin},{contentMargin})'>
        {#each years as year,i}
          <g class='jaar'>
            {#each quarters as quarter,j}
              {#if !(year === 2027 && j > 1)}
                <rect class='kwartaal' fill={(i%2 === 0) ? 'rgb(220, 220, 220)' : 'rgb(231, 231, 231)'}
                  width={quarterWidth-quarterpadding} height={svgHeight}
                  x={(i*4+j) * (quarterWidth)}
                  y={0}
                />
                <text class='quartertext' x={(i*4+j) * (quarterWidth) + 0.5*quarterWidth} text-anchor='middle' y={svgHeight-16} font-size='18' style='fill:rgb(190, 190, 190)'>
                  {quarter}
                </text>
              {/if}
            {/each}
          <text class='yeartext' x={(i*4) * (quarterWidth) + 2*quarterWidth} text-anchor='middle' y={svgHeight+30} font-size='22' style='fill:rgb(170, 170, 170)'>{year}</text>
          </g>
        {/each}
        {#each fasen as fase}
          <g class='fases' transform='translate({fase.tijd[0]}, -9)'>
            <text x={(fase.tijd[1]-fase.tijd[0])/2} y='-12' text-anchor='middle'>{fase.naam}</text>
            <line x1={20} x2={fase.tijd[1]-fase.tijd[0]-20} y1={0} y2={0} stroke='lightgrey' marker-end="url(#arrow)" marker-start="url(#arrow)" stroke-width='5'></line>
          </g>
        {/each}
        <defs>
          <!-- A marker to be used as an arrowhead -->
          <marker
            id="arrow"
            fill="lightgrey"
            viewBox="0 0 10 10"
            refX="0"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
      </g>
    </svg>
  {/if}
</div>

<style>
  svg{
    width:100%;
    height:100%;
    background-color: rgb(160, 160, 160);
    background-color: rgb(246, 240, 232);
  }

  .background{
    height:100%;
    width:100%;
    position: absolute;
  }
  .quartertext{
    font-weight: 700;
  }
  .yeartext{
    font-weight: 500;   
  }

</style>