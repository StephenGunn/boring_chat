<script lang="ts">
  import '$lib/css/reset.css';
  import '$lib/css/app.css';
  import { connection } from '$lib/connection.svelte.js';

  // this is where we establish our connection that will be used throughout the app
  connection.connect();
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
    padding: 1rem;
  }
</style>
