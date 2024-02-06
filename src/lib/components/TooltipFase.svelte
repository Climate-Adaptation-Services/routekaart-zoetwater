<script>
  import { faseHover } from "$lib/stores";

  export let h;
  export let contentMargin;

  const padding = 15
  const tooltipWidth = $faseHover.tijd[1]-$faseHover.tijd[0] - 2*padding - 6

  const textSize = (tooltipWidth > 100) ? 14 : 10
</script>


<div class='fase-tooltip' style='width:{tooltipWidth}px; left:{contentMargin + $faseHover.tijd[0]+3}px; top:{contentMargin+3}px; padding:40px {padding}px 40px {padding}px'>
  <p style='font-size:{textSize}px'>{$faseHover.beschrijving}</p>
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

</style>