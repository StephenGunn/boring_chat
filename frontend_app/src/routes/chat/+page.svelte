<script lang="ts">
  import { current_room } from '$lib/data/room.svelte.js';
</script>

<div class="messages">
  {#each current_room.get_messages() as message}
    <div class="message">
      <div class="user">{message.user.name}</div>
      <div class="content">{message.content}</div>
    </div>
  {/each}
</div>

<style>
  .message {
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }
</style>
