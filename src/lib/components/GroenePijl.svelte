<script>
  export let pijl
  export let procesHeight
  export let bandStep
  export let data

  const vanProcesIndex = parseInt(pijl['vanprocID'].split('proc')[1])
  const naarProcesIndex = parseInt(pijl['naarprocID'].split('proc')[1])

</script>

<line
  x1={0} 
  x2={0} 
  y1={procesHeight} 
  y2={naarProcesIndex*bandStep - vanProcesIndex*bandStep} 
  stroke='green' 
  stroke-width='3'
  stroke-dasharray={(pijl.type === 'Bespreken per regio')
    ? ''
    : (pijl.type === 'Data uitwisseling')
      ? '2 2'
      : '7 3'
  }
/>

<style>

  line{
    marker-end: url(#arrowgreen);
  }


</style>