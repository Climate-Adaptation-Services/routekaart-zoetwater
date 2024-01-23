<script>
  import Background from "$lib/components/Background.svelte";
  import Content from "$lib/components/Content.svelte";

  export let data;

  let wBackground;
  let hBackground;
  const contentMargin = 50

  $: console.log(data)

</script>


<div class='container' bind:clientWidth={wBackground} bind:clientHeight={hBackground}>
  {#if wBackground && data}
    <Background w={wBackground} h={hBackground} {contentMargin} {data}/>

    <Content w={wBackground} h={hBackground} {data} {contentMargin} />
  {/if}
</div>

<style>
  .container{
    height:100%;
  }

</style>