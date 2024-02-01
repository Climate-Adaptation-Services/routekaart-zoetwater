<script>
  export let w
  export let h
  export let spoor
  export let uitgeklapt
</script>

<svg class='svg-{spoor}'>
  <g class='g-spoor'>
    <text 
      class='title'
      x='10' 
      y={(uitgeklapt) ? `15` : `${h/2}`} 
      dy='0.36em' 
      font-size={(uitgeklapt) ? `${w*0.008}` : `${w*0.01}`}
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

</style>