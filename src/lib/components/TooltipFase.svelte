<script>
  import { faseHover } from "$lib/stores";

  export let h;
  export let contentMargin;

  const padding = 15
  const tooltipWidth = $faseHover.tijd[1]-$faseHover.tijd[0] - 2*padding - 6

  const textSize = (tooltipWidth > 100) ? 14 : 10
</script>


<div class='fase-tooltip' style='width:{tooltipWidth}px; height:{h-90}px; left:{contentMargin + $faseHover.tijd[0]+3}px; top:{contentMargin+3}px; padding:40px {padding}px 40px {padding}px'>
  <p style='font-size:{textSize}px'>{$faseHover.beschrijving}</p>
  <svg>
    <g>
      <rect class='faseboundary' x='5' y='5' height={h-8} width={$faseHover.tijd[1]-$faseHover.tijd[0]-2} fill='none' stroke={($faseHover !== null && $faseHover.naam === $faseHover.naam) ? 'steelblue' : 'none'}/>
    </g>
  </svg>
</div>

<style>
  .fase-tooltip{
    background-color: #F6F0E8;
    position:absolute;
    margin-top:0%;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    z-index: 10000;
    color: rgb(50,50,50);
  }

  svg{
    width:120%;
    height:120%;
    position: absolute;
    top:-5px;
    left:-7px;
    z-index: 10000;
  }

  .faseboundary{
    stroke-width:3; 
    stroke-dasharray: 7 3;
    animation: dash 90s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: -800;
    }
  }

</style>