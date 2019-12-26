<script>
  import { onMount } from "svelte";

  import Flare from "./Feeling/Flare.svelte";
  import Pop from "./Feeling/Pop.svelte";
  import Smoke from "./Feeling/Smoke.svelte";

  import { recentTweets } from "./stores.js";

  /* let latestScore = null;*/
  let latestScore = -0.26;

  /* onMount(() => {
   *   recentTweets.subscribe(tweets => {
   *     if (tweets.length) {
   *       let latestTweet = tweets[0];
   *       latestScore = latestTweet.score;
   *     }
   *   });
   * });*/
</script>

<style>
  .feeling {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
</style>

<div class="feeling">
  {#if latestScore !== null}
    {#if latestScore < -0.25}
      <Smoke />
    {:else if latestScore < 0.25}
      <Pop />
    {:else}
      <Flare />
    {/if}
  {/if}
</div>
