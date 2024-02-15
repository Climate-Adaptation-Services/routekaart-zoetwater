<script>
  import { timeScale } from "$lib/stores"
  import { selectAll } from "d3";
  import { afterUpdate } from "svelte";

  export let w
  export let hIngeklapt
  export let hUitgeklapt
  export let spoor
  export let uitgeklapt
  export let data;
  export let clickSpoor

  afterUpdate(() => {setTimeout(() => {
    selectAll('.spoor-button rect').attr('width', document.getElementsByClassName('spoor-button-title')[0].getBoundingClientRect().width + 20)
  }, 1)})

</script>

<svg class='svg-{spoor}'>
  <g class='g-spoor'>

    <g class='uitgeklapt-spoor' style='opacity:{(uitgeklapt) ? 1 : 0}; visibility:{(uitgeklapt) ? 'visible' : 'hidden'}; }'>
      <rect fill={(spoor === 'bpz') ? '#EA7722' : '#6FAD33'} width={w} height={hIngeklapt*0.35} x={0} y={hIngeklapt*0.35}/>
      {#each data.bpz as bpz}
        <g transform='translate({$timeScale(new Date(bpz['Datum']+'-20'))},{hUitgeklapt*0.2})'>
          <circle 
            class='spoor-circle'
            cx={0}
            cy={0}
            r={hIngeklapt*0.25}
            fill='white'
            stroke={(bpz['Type'] === 'Ter bespreking') ? 'grey' : (spoor === 'bpz') ? '#EA7722' : '#6FAD33'}
            stroke-width='5'
          />
          <text text-anchor='middle' font-size={w*0.006} style='fill:rgb(50,50,50)'
            y='1.5em'>
            {#each bpz['Korte titel'].split(' ') as word}
              <tspan dy='1em' x={0}>{word}</tspan>
            {/each}
          </text>
        </g>
      {/each}
    </g>

    <g class='spoor-button' on:click={() => clickSpoor(spoor)} >
      <rect height={hIngeklapt} style='fill:{(spoor === 'bpz') ? '#EA7722' : '#6FAD33'}; cursor:pointer; stroke-width:2.5'/>
      <text 
        class='spoor-button-title'
        x='10' 
        y={hIngeklapt/2} 
        dy='0.36em' 
        font-size={`${w*0.01}`}
      >
        {(spoor === 'bpz') ? 'Bestuurlijk spoor' : 'Omgevingsspoor'}
      </text>
    </g>
  </g>
</svg>


<style>
  svg{
    width:100%;
    height:100%;
  }

  .spoor-button-title{
    fill:white;
    font-weight: 500;
    transition: all 1s;
  }

  .uitgeklapt-spoor{
    transition: all 1s;
  }

  .spoor-circle{
    pointer-events: default;
    transition: all 0.5s;
  }

  .spoor-circle:hover{
    stroke-dasharray: 5 3;
    animation: dash 120s linear infinite;
    cursor: pointer;
    transform: scale(1.3);
  }

  .spoor-button rect:hover{
    stroke:white;
    stroke-dasharray: 5 3;
    animation: dash 120s linear infinite;
    cursor: pointer;
  }
  .spoor-button text{
    pointer-events: none;
  }

  .spoor-button{
    cursor:pointer;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: -1000;
    }
  }

</style>