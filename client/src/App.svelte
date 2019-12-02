<script>
  import Header from "./Header.svelte";
  // import Confetti from "./Confetti.svelte";
</script>

<style>
  .container {
    display: grid;
    width: 100%;
    height: 90%;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 1rem;
    grid-template-areas:
      "whoami feeling"
      "recent-tweets recent-tweets";
  }

  .item {
    background-color: #1eaafc;
    background-image: linear-gradient(
      130deg,
      #6c52d9 0%,
      #1eaafc 85%,
      #3edfd7 100%
    );
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    color: #fff;
    border-radius: 4px;
    border: 6px solid #171717;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
  }

  .whoami {
    grid-area: whoami;
  }

  .feeling {
    grid-area: feeling;
  }

  .recent-tweets {
    grid-area: recent-tweets;
  }
</style>

<Header />
<div class="container">
  <div class="item whoami">whoami</div>
  <div class="item feeling">Feeling</div>
  <div class="item recent-tweets">Recent Tweets</div>
</div>
<!-- <Confetti /> -->
