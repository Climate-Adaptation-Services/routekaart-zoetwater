<script>
// @ts-nocheck

  import { procesSelection } from "$lib/stores";
  import { onMount } from "svelte";
  import { timeScale } from "$lib/stores";

  export let procesHeight
  export let bandStep
  export let data
  export let margin


  const proces = data.proces.filter(d => d['procID'] === $procesSelection)[0]

  const procesIndex = parseInt(proces['procID'].split('proc')[1])

  const producten = data.product.filter(prod => prod['procID'] === proces['procID'])

  const procesWidth = $timeScale(new Date(proces['Datum eind']+'-30'))-$timeScale(new Date(proces['Datum start']+'-01'))

  const tooltipLocation = (procesIndex > 10)
    ? 'top'
    : 'bottom'

  const procesColorsLight = {
    'Landelijk team': '#d0e4fb',
    "Regio": '#fce1e2',
    "Samen": '#effaef'
  }

  const procesColors = {
    'Landelijk team': '#0070C0',
    "Regio": '#C00001',
    "Samen": '#00B050'
  }

  let offsetX = 0;
  let offsetY = 0;
  let divOffsetX = 0;
  let divOffsetY = 0;

  let tooltipWidth = 0;
  let tooltipHeight = 0;
  onMount(() => {
    const tooltipContentBox = document.getElementsByClassName('tooltipContent')[0].getBoundingClientRect()
    tooltipWidth = tooltipContentBox.width
    tooltipHeight = tooltipContentBox.height

    if(tooltipLocation === 'bottom'){
      // offset for distance from proces
      offsetX = 20
      offsetY = 60
    }else{
      // offset for distance from proces
      offsetX = -20
      offsetY = -30

      // offset to fix the position of the tooltip
      divOffsetX = offsetX
      if(procesIndex > 13){divOffsetX -= 250}
      divOffsetY = -tooltipHeight + offsetY
    }
  })

  const maand = {
    '01':'Jan', '02':'Feb', '03':'Maa', '04':'Apr', '05':'Mei', '06':'Jun', '07':'Jul', '08':'Aug', '09':'Sep', '10':'Okt', '11':'Nov', '12':'Dec'
  }

  const imageHeight = procesHeight*2
  const textSize = procesHeight*0.8

</script>

<div class='tooltip' 
  style='transform:translate({divOffsetX}px,{divOffsetY}px);
    left:{$timeScale(new Date(proces['Datum start']+'-01'))}px; top:{procesIndex*bandStep - bandStep + procesHeight}px'>

  <div class='tooltipContent' style='transform:translate({(tooltipLocation === 'bottom') ? offsetX : 0}px,{(tooltipLocation === 'bottom') ? offsetY : 0}px)' >
    <h3>
      {proces['Volledige titel']}
    </h3>
    <p class='kortbeschrijving' style='font-size:16px'>
      {proces['Korte beschrijving']}
    </p>
    <hr>
    <div class='proces-extra-info'>
      <img class='extra-info-imgs' src="/images/schedule.png" style='width:50px'/>
      <p style='font-size:18px'>{maand[proces['Datum start'].split('-')[1]] + ' ' + proces['Datum start'].split('-')[0] + ' -- ' + maand[proces['Datum eind'].split('-')[1]] + ' ' + proces['Datum eind'].split('-')[0]}</p>
    </div>
    <div class='proces-extra-info'>
      <img class='extra-info-imgs' src="/images/team.png" style='width:50px'/>
      <p style='font-size:18px'>{proces['Wie']}</p>
    </div>
    {#if producten.length > 0}
      <div class='proces-extra-info'>
        {#each producten as product}
          <img class='extra-info-imgs' src="/images/ruitje.png" style='width:50px'/>
          <p style='font-size:18px'>{product['Volledige omschrijving']}</p>
        {/each}
      </div>
    {/if}
    <!-- <img src="/images/cancel.png" style='right:5px; top:5px; cursor:pointer; position:absolute; opacity:0.3' 
      width='25px' on:click={() => procesSelection.set(null)}/> -->

  </div>

  {#if tooltipWidth > 0}
    <svg>
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="100%" fx="50%" fy="50%">
          <stop offset="40%" style="stop-color:rgb(255,255,255)"/>
          <stop offset="100%" style="stop-color:{procesColorsLight[proces['Wie']]}"/>
        </radialGradient>
      </defs>
      <g class='tooltip' transform='translate({-divOffsetX},{-divOffsetY})' style='stroke:{procesColors[proces['Wie']]}'>
        <line 
          x1={0}
          x2={(tooltipLocation === 'bottom') ? offsetX : divOffsetX}
          y1={(tooltipLocation === 'top') ? 0 : procesHeight} 
          y2={offsetY} 
        />
        <line 
          x1={procesWidth}
          x2={(tooltipLocation === 'bottom') ? tooltipWidth+offsetX : tooltipWidth+divOffsetX}
          y1={(tooltipLocation === 'top') ? 0 : procesHeight} 
          y2={offsetY} 
        />
        <path 
          d="
            M{(tooltipLocation === 'bottom') ? offsetX : divOffsetX} {(tooltipLocation === 'bottom') ? offsetY : divOffsetY} 
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
    fill:url(#grad1);
    pointer-events: default;
    cursor: pointer;
  }

  .tooltip{
    position: absolute;
    z-index: 500;
    pointer-events: none;
    width:800px;
    height:800px;
    /* stroke:rgb(170,170,170); */
    stroke-dasharray:7 3; 
    stroke-width: 1;
    stroke-opacity: 0.6;
  }

  .tooltip path, line{
    /* stroke-dasharray: 7 7; */
    /* animation: dash 90s linear infinite; */
  }

  @keyframes dash {
    to {
      stroke-dashoffset: -1000;
    }
  }

  .tooltipContent{
    position: absolute;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    padding:20px;
    max-width: 450px;
    text-align: center;
    color: #635F5D;
  }

  svg{
    width:100%;
    height:100%;
  }

  h3{
    margin-top:0px;
    margin-bottom: 10px;
  }
 
  hr {
    border: 0;
    clear:both;
    display:block;
    width: 96%;               
    background-color:rgb(186, 186, 186);
    height: 1px;
  }

  .proces-extra-info{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .extra-info-imgs{
    padding-right:10px;
  }

  .kortbeschrijving{
    color: #8E8883
  }

  .proces-extra-info{
    color:rgb(100,100,100)
  }

</style>