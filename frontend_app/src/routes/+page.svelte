<script lang="ts">
  import Status from '$lib/components/Status.svelte';
</script>

<div class="stuff login">
  <div class="stuff_bar">
    <div class="title">Login</div>
    <Status />
  </div>
  <div class="box">
    <h1>Boring Chat</h1>
    <p>
      Welcome to Boring Chat. A very basic chat-app frontend that can be used to learn or expirment with
      websocket backends.
    </p>
  </div>
</div>

<style>
  .login {
    max-width: 500px;
    min-height: 300px;
  }
</style>
