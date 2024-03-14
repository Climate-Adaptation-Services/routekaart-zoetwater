<script>
  import { spoorSelection, timeScale } from "$lib/stores";

  export let h;
  export let w;

  $: spoor = ($spoorSelection['bpzID']) ? 'bpz' : 'omgeving';
  
  $: bboxSpoorCircle = document.getElementsByClassName(`circle-${$spoorSelection['Korte titel'].replaceAll(' ','')}`)[0].getBoundingClientRect()
  
  $: productID = ($spoorSelection['prodID']) ? $spoorSelection['prodID'].split(',')[0] : ''
  $: bboxProduct = (productID)
    ? document.getElementsByClassName('product-g-' + productID)[0].getBoundingClientRect()
    : null

  const maand = {
    '01':'Januari', '02':'Februari', '03':'Maart', '04':'April', '05':'Mei', '06':'Juni', '07':'Juli', '08':'Augustus', '09':'September', '10':'Oktober', '11':'November', '12':'December'
  }

</script>   

<div class='tooltip-spoor' style='
  left:{(bboxSpoorCircle.left > w*0.6) 
      ? bboxSpoorCircle.left - 450 
      : bboxSpoorCircle.left}px;
  {(bboxProduct) 
    ? `top: ${bboxProduct.top+40}px;` 
    : `bottom: ${h - bboxSpoorCircle.top -20}px;`}
  border:5px solid {(spoor === 'bpz') ? '#EA7722' : '#6FAD33'}'>
  
  <h4>{$spoorSelection['Volledige titel']}</h4>
  <p style='font-size:14px'>{$spoorSelection['Korte beschrijving']}</p>
  <p style='font-size:12px; width:50%; float:left'><em>{($spoorSelection['Type']) ? $spoorSelection['Type'] : ''}</em></p>
  <p style='font-size:12px; display:inline-block; float:left; text-align:right; width:50%'><em>{maand[$spoorSelection['Datum'].split('-')[1]] + ' ' + $spoorSelection['Datum'].split('-')[0]}</em></p>
</div>

<style>
  .tooltip-spoor{
    position: absolute;
    border-radius: 10px;
    z-index: 10000;
    max-width:350px;
    background-color: #F4EEE6;
    padding: 0px 10px 0px 10px;
    box-shadow: rgba(0, 0, 0, 0.26) 0px 22px 70px 4px;
  }

</style>