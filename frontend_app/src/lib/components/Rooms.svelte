<script lang="ts">
  import { room_list } from '$lib/data/room_list.svelte.js';
  import { current_room } from '$lib/data/room.svelte.js';
  let new_room_name = $state('');

  function add_room() {
    room_list.add_room({
      name: new_room_name,
      id: Math.random().toString(36).substring(7),
      messages: [],
      users: []
    });
    new_room_name = '';
  }
</script>

<div class="content">
  <div class="current">
    <div class="title">Current Room</div>
    <div class="room_name">
      {#if current_room.get_name() === null}
        No room selected
      {:else}
        #{current_room.get_name()}
      {/if}
    </div>
  </div>
  <div class="rooms">
    {#if room_list.get_rooms().length === 0}
      <div>No rooms</div>
    {:else}
      {#each room_list.get_rooms() as room}
        <div class="room">
          <div class="room_name">{room.name}</div>
          <div class="room_users">{room.id}</div>
        </div>
      {/each}
    {/if}
  </div>

  <div class="add">
    <input placeholder="Room name" type="text" bind:value={new_room_name} />
    <button onclick={add_room}>Add & Join</button>
  </div>
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .current {
    padding: 1rem;
    border-bottom: 1px solid var(--accent);
  }
  .rooms {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
  }

  .add {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-top: 1px solid var(--accent);
    cursor: pointer;
    gap: 0.5rem;
  }

  .add input {
    flex: 1;
  }
  .add button {
    min-width: fit-content;
  }
</style>
