<script lang="ts">
  import Status from '$lib/components/Status.svelte';
  import { current_user } from '$lib/data/user.svelte';
  import { user_list } from '$lib/data/user_list.svelte';
  import { goto } from '$app/navigation';

  let username = $state('');

  const enter_chat = (e: Event) => {
    e.preventDefault();

    // create a randomized 10 letter string
    const id: string = Math.random().toString(36).substring(2, 12);
    current_user.set_new_user(id, username);

    // add the user to the list of users
    user_list.add_user(current_user.get_user());

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
      <button disabled={username.length < 3}>Enter Chat</button>
    </form>
    <div class="links">
      <a href="https://github.com/StephenGunn/boring_chat" target="_blank" rel="norefferer noopener"
        >Visit the Github Repository</a
      >
    </div>
  </div>
</div>

<style>
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
