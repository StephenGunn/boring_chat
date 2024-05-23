<script lang="ts">
  import Status from '$lib/components/Status.svelte';
  import Rooms from '$lib/components/Rooms.svelte';
  import ModeToggle from '$lib/components/ModeToggle.svelte';
  import UserList from '$lib/components/UserList.svelte';

  import { current_user } from '$lib/data/user.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    // check to make sure we have a user- if we don't redirect to the login page
    if (!current_user.get_user().id) {
      goto('/');
    }
  });
</script>

<svelte:head>
  <title>Boring Chat</title>
  <link rel="icon" href="https://fav.farm/🥰" />
</svelte:head>

<div class="stuff chat">
  <div class="stuff_bar">
    <div class="title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
        ><rect width="256" height="256" fill="none" /><rect
          x="52.13"
          y="52.13"
          width="151.73"
          height="151.73"
          rx="7.95"
          transform="translate(-53.02 128) rotate(-45)"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        /></svg
      > Boring Chat
    </div>
    <Status />
  </div>

  <div class="content">
    <div class="room_list"><Rooms /></div>
    <div class="room">
      <slot />
    </div>
    <div class="user_list"><UserList /></div>
  </div>

  <div class="bottom">
    <div class="links">
      <a href="https://github.com/StephenGunn/boring_chat" target="_blank" rel="norefferer noopener"
        >Visit the Github Repository</a
      >
      <a href="https://jovianmoon.io" target="_blank" rel="noopener noreferrer">Created by Stephen Gunn</a>
    </div>
    <ModeToggle />
  </div>
</div>

<style>
  .chat {
    max-width: 100%;
    max-height: 100%;
    width: 1500px;
    height: 800px;
    display: flex;
    flex-direction: column;
  }

  .room_list {
    width: 20%;
    border-right: 1px solid var(--accent);
  }

  .title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .title svg {
    width: 0.8rem;
    height: 0.8rem;
    color: var(--text);
  }

  .room {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .user_list {
    width: 20%;
    border-left: 1px solid var(--accent);
  }

  .content {
    flex: 1;
    display: flex;
  }

  .bottom {
    align-items: center;
    border-top: 1px solid var(--accent);
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bottom .links {
    padding: 0.3rem 0.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .bottom .links a {
    color: var(--text);
  }
</style>
