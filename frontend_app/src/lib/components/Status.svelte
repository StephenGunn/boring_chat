<script lang="ts">
  let connected: boolean = false;
</script>

<div class="status">
  {#if !connected}
    Not
  {/if}
  Connected
  <div class="circle" class:connected></div>
</div>

<style>
  .status {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.75rem;
    font-weight: bold;
    color: var(--text);
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
  }

  .connected {
    background-color: green;
  }
</style>
