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

  const product = data.product.filter(prod => prod['procID'] === proces['procID'])[0]

  const procesWidth = timeScale(new Date(proces['Datum eind']+'-30'))-timeScale(new Date(proces['Datum start']+'-01'))

  const tooltipLocation = (procesIndex > 10)
    ? 'top'
    : 'bottom'

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
      offsetX = 20
      offsetY = 60

      divOffsetX = 0;
      divOffsetY = 0
    }else{
      offsetX = -20
      offsetY = -40

      divOffsetX = offsetX - tooltipWidth
      divOffsetY = -tooltipHeight + offsetY
    }
  })

  const maand = {
    '01':'Jan', '02':'Feb', '03':'Maa', '04':'Apr', '05':'Mei', '06':'Juni', '07':'Juli', '08':'Aug', '09':'Sep', '10':'Okt', '11':'Nov', '12':'Dec'
  }

</script>

<div class='tooltip' 
  style='transform:translate({divOffsetX}px,{divOffsetY}px);
    left:{timeScale(new Date(proces['Datum start']+'-01'))}px; top:{procesIndex*bandStep - bandStep + procesHeight}px'>

  <div class='tooltipContent' style='transform:translate({(tooltipLocation === 'bottom') ? offsetX : 0}px,{(tooltipLocation === 'bottom') ? offsetY : 0}px)' >
    <h4>
      {proces['Volledige titel']}
    </h4>
    <p>
      {proces['Korte beschrijving']}
    </p>
    <hr>
    <div class='proces-extra-info'>
      <img class='extra-info-imgs' src="/images/schedule.png" />
      <p>{maand[proces['Datum start'].split('-')[1]] + ' ' + proces['Datum start'].split('-')[0] + ' -- ' + maand[proces['Datum eind'].split('-')[1]] + ' ' + proces['Datum eind'].split('-')[0]}</p>
    </div>
    <div class='proces-extra-info'>
      <img class='extra-info-imgs' src="/images/team.png" />
      <p>{proces['Wie']}</p>
    </div>
    <div class='proces-extra-info'>
      <img class='extra-info-imgs' src="/images/goal.png" />
      <p>{product['Volledige omschrijving']}</p>
    </div>

  </div>

  {#if tooltipWidth > 0}
    <svg>
      <g class='tooltip' stroke='black' stroke-dasharray="7 3" transform='translate({-divOffsetX},{-divOffsetY})'>
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
    fill:rgb(246, 244, 242);
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
    padding:25px;
    max-width: 450px;
    text-align: center;
  }

  svg{
    width:100%;
    height:100%;
  }

  h4{
    margin-top:0px;
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
    width:35px;
    height:35px;
    padding-right:10px;
  }

</style>