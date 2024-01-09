<script>
  import Background from "$lib/components/Background.svelte";

  let wBackground;
  let hBackground;
</script>


<div class='container' bind:clientWidth={wBackground} bind:clientHeight={hBackground}>

  <Background w={wBackground} h={hBackground}/>

</div>

<style>
  .container{
    height:100%;
  }

</style>