<script lang="ts">
  import Status from '$lib/components/Status.svelte';
  import { connection } from '$lib/connection.svelte.js';
  import { goto } from '$app/navigation';

  // this holds the local state of the input, the users
  // full data-set is stored in the connection class
  let username = $state('');

  const enter_chat = (e: Event) => {
    e.preventDefault();
    // set the username locally and on the server
    connection.set_user_name(username);

    // add the user to the welcome room, which exists by default on the server
    connection.add_user_to_room('welcome');

    // navigate to the chat route, which holds the #welcome room
    goto('/chat');
  };
</script>

<svelte:head>
  <title>Boring Chat - Select Username</title>
  <link rel="icon" href="https://fav.farm/👓" />
</svelte:head>

<div class="stuff login">
  <div class="stuff_bar">
    <div class="title">Login</div>
    <Status />
  </div>
  <div class="box">
    <h1>Boring Chat</h1>
    <p>
      Welcome to Boring Chat! Please enter a username to join the chat. The username must be between 3 and 8
      characters long.
    </p>
    <form onsubmit={enter_chat}>
      <input
        type="text"
        placeholder="Enter a username"
        bind:value={username}
        required
        minlength="3"
        maxlength="8"
      />
      {#if connection.is_reconnecting()}
        <div class="reconnecting">Trying to connect to the server...</div>
      {:else if connection.is_connected()}
        <button disabled={username.length < 3}>Enter Chat</button>
      {/if}
    </form>
    <div class="links">
      <a href="https://github.com/StephenGunn/boring_chat" target="_blank" rel="norefferer noopener"
        >Visit the Github Repository</a
      >
    </div>
  </div>
</div>

<style>
  .reconnecting {
    font-size: 0.7rem;
    padding: 0.25rem 0.4rem;
    display: inline-block;
  }
  .login {
    width: 100%;
    max-width: 500px;
    min-height: 300px;
  }

  input {
    margin: 1.5rem 0 1rem 0;
  }

  .links {
    margin-top: 1rem;
    font-size: 0.8rem;
  }
</style>
