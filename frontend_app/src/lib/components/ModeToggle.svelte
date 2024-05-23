<script>
  let mode = 'light';

  // detect system dark mode
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
    mode = 'dark';
  }

  const toggleMode = () => {
    mode = mode === 'light' ? 'dark' : 'light';
    if (mode === 'light') {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  };
</script>

<div class="toggle">
  <button onclick={toggleMode}>
    {#if mode === 'light'}
      go dark 🌚
    {:else}
      go light 🌞
    {/if}
  </button>
</div>

<style>
  .toggle {
    padding: 0 0.25rem 0;
  }
  button {
    padding: 0.25rem 0.5rem;
    height: auto;
    border: none;
    line-height: 0.7rem;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
