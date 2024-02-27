<script>
  import { timeScale, spoorPijl, spoorSelection, procesSelection } from "$lib/stores"
  import { selectAll } from "d3";
  import { afterUpdate } from "svelte";

  export let w
  export let hIngeklapt
  export let hUitgeklapt
  export let spoor
  export let uitgeklapt
  export let data;
  export let clickSpoor
  export let procesHeight
  export let bpzHeight
  export let bandStep
  export let margin

  afterUpdate(() => {setTimeout(() => {
    selectAll('.spoor-button rect').attr('width', document.getElementsByClassName('spoor-button-title')[0].getBoundingClientRect().width + 20)
  }, 500)})

  const dataSpoor = (spoor === 'bpz') ? data.bpz : data.omgeving;

  function clickCircle(spoorCircle){
    if(spoorCircle['prodID'] && spoorCircle['prodID'].length === 6){
      procesSelection.set(null)
      spoorPijl.set(spoorCircle)
    }else{
      spoorPijl.set(null)
      spoorSelection.set(null)
    }
    spoorSelection.set(spoorCircle)
  }

  $: spoorPijlProduct = ($spoorPijl !== null) ? data.product.filter(d => d.prodID === $spoorPijl.prodID)[0] : null
  $: spoorPijlProces = (spoorPijlProduct !== null) ? data.proces.filter(d => d.procID === spoorPijlProduct.procID)[0] : null
  $: spoorPijlProcesNummer = (spoorPijlProces !== null) ? parseInt(spoorPijlProces.procID.split('proc')[1]) : null

</script> 

<svg class='svg-{spoor}' style='position:absolute; top:0; height:100%; width:100%; pointer-events:none'>
  <marker
    id="arrowbpz"
    fill="#EA7722"
    viewBox="0 0 10 10"
    refX={hIngeklapt*0.25 + 2.5}
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" />
  </marker>
  <g class='g-spoor' transform='translate(0,{(spoor === 'bpz') ? procesHeight : procesHeight+ bpzHeight})'>

    <!-- dit element bestaat altijd om een fade te kunnen doen bij uitklappen -->
    <g class='uitgeklapt-spoor' style='opacity:{(uitgeklapt) ? 1 : 0}; visibility:{(uitgeklapt) ? 'visible' : 'hidden'}; }'>
      <rect fill={(spoor === 'bpz') ? '#EA7722' : '#6FAD33'} width={w} height={hIngeklapt*0.35} x={0} y={hIngeklapt*0.35}/>
      {#each dataSpoor as spoorCircle}
        <g transform='translate({$timeScale(new Date(spoorCircle['Datum']))},{hUitgeklapt*0.2})'>
          {#if uitgeklapt && $spoorPijl === spoorCircle && spoor === 'bpz'}
            <line x1={0} x2={$timeScale(new Date(spoorPijlProduct.Datum)) - $timeScale(new Date(spoorCircle.Datum))} y1={0} y2={-margin.bottom - (data.proces.length - spoorPijlProcesNummer)*bandStep - bandStep} 
              stroke={(spoor === 'bpz') ? '#EA7722' : '#6FAD33'} stroke-width='3' marker-start='url(#arrow{spoor})'></line>
          {/if}
        <circle 
            class='spoor-circle circle-{spoorCircle['Korte titel'].replaceAll(' ','')}'
            cx={0}
            cy={0}
            r={hIngeklapt*0.25}
            fill='white'
            stroke={(spoor === 'bpz') ? '#EA7722' : '#6FAD33'}
            stroke-width='5'
            on:click={() => clickCircle(spoorCircle)}
          />
          {#if uitgeklapt}
            <text text-anchor='middle' font-size={3 + w*0.006} style='fill:rgb(50,50,50)'
              y={(["PPLG's (concept)", 'Beoordelingscriteria', "Deltascenario's"].includes(spoorCircle['Korte titel'])) ? '-3.2em' : '1.5em'}>
              {#each spoorCircle['Korte titel'].split(' ') as word}
                <tspan dy='1em' x={0}>{word}</tspan>
              {/each}
            </text>
          {/if}
        </g>
      {/each}
    </g>
    {#if spoor === 'bpz' && !uitgeklapt}
      <text x='5' y='-10'>Klik op spoor om te openen</text>
    {/if}
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

  .spoor-button-title{
    fill:white;
    font-weight: 500;
    transition: all 1s;
  }

  .uitgeklapt-spoor{
    transition: all 1s;
  }

  .g-spoor{
    transition: all 1s;
    pointer-events: all;
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