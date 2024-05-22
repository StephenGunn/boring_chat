<script lang="ts">
  import '$lib/css/reset.css';
  import '$lib/css/app.css';
</script>

<div class="container">
  <slot />
</div>

<style>
  .container {
    display: grid;
    place-content: center;
    height: 100vh;
    width: 100vw;
  }
</style>
