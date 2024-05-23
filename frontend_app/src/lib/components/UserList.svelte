<script lang="ts">
  import { user_list } from '$lib/data/user_list.svelte';
  import { current_room } from '$lib/data/room.svelte.js';
</script>

<div class="user_list">
  <div class="room content">
    <div class="title">Users in #{current_room.get_name()}</div>
    <ul>
      {#each current_room.get_users() as user}
        <li>{user.name}</li>
      {/each}
    </ul>
  </div>
  <div class="all content">
    <div class="title">All Users</div>
    <ul>
      {#each user_list.get_users() as user}
        <li>{user.name}</li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .user_list {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    height: 100%;
  }
  .all {
    border-top: 1px solid var(--accent);
  }

  .content {
    padding: 1rem;
  }
</style>
