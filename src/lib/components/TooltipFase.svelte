<script>
  import { faseHover } from "$lib/stores";

  export let h;
  export let contentMargin;

  const padding = 20

</script>


<div class='fase-tooltip' style='width:{$faseHover.tijd[1]-$faseHover.tijd[0] - 2*padding - 6}px; left:{contentMargin + $faseHover.tijd[0]+3}px; top:{contentMargin+3}px; padding:40px 20px 40px 20px'>
  <p>{$faseHover.beschrijving}</p>
</div>

<style>
  .fase-tooltip{
    background-color:rgb(230,230,230);
    position:absolute;
    margin-top:0%;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    z-index: 10000;
    color: rgb(50,50,50);
  }

</style>