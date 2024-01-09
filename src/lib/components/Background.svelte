<script>
  export let w
  export let h

  const svgMargin = 50
  $: svgWidth = w - 2*svgMargin
  $: svgHeight = h - 2*svgMargin

  const years = [2023,2024,2025,2026,2027]
  const quarters = ['Q1','Q2','Q3','Q4']
  const quarterpadding = 3
  $: quarterWidth = svgWidth / (4.5*quarters.length)

  $: fasen = [
    {
      naam:'Voorbereiding',
      tijd:[0, 4 * quarterWidth]
    },
    {
      naam:'Uitwerking opgave en maatregelen',
      tijd:[4 * quarterWidth, 8 * quarterWidth]
    },
    {
      naam:'Beoordeling en afweging',
      tijd:[8 * quarterWidth, 14 * quarterWidth]
    },
    {
      naam:'Besluitvorming',
      tijd:[14 * quarterWidth, 16 * quarterWidth]
    },
    {
      naam:'Borging',
      tijd:[16 * quarterWidth, 18 * quarterWidth]
    }
  ]

</script>

<div class='background'>
  <svg>
    <g transform='translate({svgMargin},{svgMargin})'>
      {#each years as year,i}
        <g class='jaar'>
          {#each quarters as quarter,j}
            {#if !(year === 2027 && j > 1)}
              <rect class='kwartaal' fill={(i%2 === 0) ? 'rgb(220, 220, 220)' : 'rgb(231, 231, 231)'}
                width={quarterWidth-quarterpadding} height={svgHeight}
                x={(i*4+j) * (quarterWidth)}
                y={0}
              />
              <text class='quartertext' x={(i*4+j) * (quarterWidth) + 0.5*quarterWidth} text-anchor='middle' y={svgHeight-16} font-size='18' style='fill:rgb(160, 160, 160)'>
                {quarter}
              </text>
            {/if}
          {/each}
        <text class='yeartext' x={(i*4) * (quarterWidth) + 2*quarterWidth} text-anchor='middle' y={svgHeight+30} font-size='22'>{year}</text>
        </g>
      {/each}
      {#each fasen as fase}
        <g transform='translate({fase.tijd[0]}, -8)'>
          <text x={(fase.tijd[1]-fase.tijd[0])/2} y='-12' text-anchor='middle'>{fase.naam}</text>
          <line x1={0} x2={fase.tijd[1]-fase.tijd[0]} y1={0} y2={0} stroke='lightgrey' marker-end="url(#arrow)" marker-start="url(#arrow)" stroke-width='5'></line>
        </g>
      {/each}
      <defs>
        <!-- A marker to be used as an arrowhead -->
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="3"
          markerHeight="3"
          orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
    </g>
  </svg>
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
  }
  .quartertext{
    font-weight: 700;
  }
  .yeartext{
    font-weight: 500;   
  }

</style>