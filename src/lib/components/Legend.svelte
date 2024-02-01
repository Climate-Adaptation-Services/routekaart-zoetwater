<script>

  import { timeScale, procesColors } from "$lib/stores";

  const legendWidth = 300
  const legendHeight = 310

</script>

<g class='legend' transform='translate({$timeScale(new Date("2026-03-01")) - 50},{70})'>
  <rect 
    fill='#F6F0E8'
    width={legendWidth}
    height={legendHeight}
  />
  <g transform='translate({legendWidth/2},{-10})' >
    <text x='-132' y='43' font-size='20'>Legenda</text>
    {#each ['Landelijk team', 'Regio', 'Samen'] as wie, i}
      <g transform='translate(0,{i*37 + 90})'>
        <rect fill={$procesColors[wie]} width='140' height='30' x='-70' y='-20'/>
        <text style='fill:white' text-anchor='middle'>{wie}</text>
      </g>
    {/each}
    {#each ['Bespreken per regio', 'Bespreken plenair', 'Data uitwisseling'] as type, i}
      <g transform='translate(-25,{i*30 + 210})'>
        <line x1={-80} x2={-25} y1={-5} y2={-5} stroke='green' stroke-width='3' stroke-dasharray={(type === 'Bespreken per regio')
          ? ''
          : (type === 'Data uitwisseling')
            ? '2 2'
            : '7 3'
        }/>
        <text>{type}</text>
      </g>
    {/each}
  </g>
</g>

<style>
  .legend{
    -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .1));
    filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .1));
  }

  line{
    marker-end: url(#arrowgreen);
  }

</style>