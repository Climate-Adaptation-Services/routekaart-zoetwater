<script>
  import { timeScale } from "$lib/stores"

  export let w
  export let hIngeklapt
  export let hUitgeklapt
  export let spoor
  export let uitgeklapt
  export let data;

  let hover = false;

  function spoorMouseOver(){
    hover = true
  }

  const spoorHeight = 15

</script>

<svg class='svg-{spoor}'>
  <g class='g-spoor' on:mouseover={() => spoorMouseOver()}>

    <g class='uitgeklapt-spoor' style='opacity:{(uitgeklapt) ? 1 : 0}'>
      <rect fill={(spoor === 'bpz') ? '#EA7722' : '#6FAD33'} width={w} height={hUitgeklapt*0.2} x={0} y={hUitgeklapt*0.2 - (hUitgeklapt/5)/2}/>
      {#each data.bpz as bpz}
        <g transform='translate({$timeScale(new Date(bpz['Datum']+'-01'))},{hUitgeklapt*0.2})'>
          <circle 
            cx={0}
            cy={0}
            r={12}
            fill='white'
            stroke='black'
            stroke-width='5'
          />
          <text text-anchor='middle' font-size='8' style='fill:rgb(50,50,50)'
            y='1.5em'>
            {#each bpz['Korte titel'].split(' ') as word}
              <tspan dy='1em' x={0}>{word}</tspan>
            {/each}
          </text>
        </g>
      {/each}
    </g>
    <rect height={hIngeklapt} width='100' style='fill:{(spoor === 'bpz') ? '#EA7722' : '#6FAD33'}; cursor:pointer'/>
    <text 
      class='title'
      x='10' 
      y={(uitgeklapt) ? `15` : `${hIngeklapt/2}`} 
      dy='0.36em' 
      font-size={`${w*0.01}`}
    >
      {(spoor === 'bpz') ? 'Bestuurlijk spoor' : 'Omgevingsspoor'}
    </text>
  </g>
</svg>


<style>
  svg{
    width:100%;
    height:100%;
    pointer-events: none;
  }

  .title{
    fill:white;
    font-weight: 500;
    transition: all 1s;
  }

  .uitgeklapt-spoor{
    transition: all 1s;
  }


</style>