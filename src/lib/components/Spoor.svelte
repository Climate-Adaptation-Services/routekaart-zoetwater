<script>
  export let w
  export let h
  export let spoor
  export let uitgeklapt

  let hover = false;

  function spoorMouseOver(){
    hover = true
  }

</script>

<svg class='svg-{spoor}'>
  <g class='g-spoor' on:mouseover={() => spoorMouseOver()}>
    <text 
      class='title'
      x='10' 
      y={(uitgeklapt) ? `15` : `${h/2}`} 
      dy='0.36em' 
      font-size={(uitgeklapt) ? `${w*0.008}` : `${w*0.01}`}
    >
      {(spoor === 'bpz') ? 'Bestuurlijk spoor' : 'Omgevingsspoor'}
    </text>
    {#if !uitgeklapt}
      <text x={w/2} y='{h/2}' dy='0.36em' text-anchor='middle' font-style='italic' font-weight='100' style='fill:white'>Klik om uit te klappen</text>
    {/if}
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


</style>