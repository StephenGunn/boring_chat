<script lang="ts">
  import { connection } from '$lib/connection.svelte.js';

  let message = $state('');
</script>

<div class="messages"></div>

<div class="input">
  <form on:submit={connection.send(message)}>
    <input type="text" placeholder="Enter a message" bind:value={message} required />
    <button disabled={message.length < 1}>Send</button>
  </form>
</div>

<style>
</style>
