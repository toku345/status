<script>
  import { onMount } from "svelte";

  import Header from "./Header.svelte";
  import Whoami from "./Whoami.svelte";
  import Feeling from "./Feeling.svelte";
  import RecentTweets from "./RecentTweets.svelte";
  // import Confetti from "./Confetti.svelte";

  import { recentTweets } from "./stores.js";

  import firebase from "@firebase/app";
  import "@firebase/firestore";

  onMount(async () => {
    const res = await fetch("/firebaseconfig.json");
    const firebaseConfig = await res.json();

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    let scores = [];
    db.collection("sentiment-scores")
      .orderBy("postedAt", "asc")
      .limit(50)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          scores.push(doc.data());
        });
        recentTweets.set(scores);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  });
</script>

<style>
  .container {
    display: grid;
    width: 100%;
    height: 90%;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 400px 1fr;
    grid-gap: 1rem;
    grid-template-areas:
      "whoami feeling"
      "recent-tweets recent-tweets";
  }

  .item {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    border: 6px solid #171717;
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
  <div class="item whoami">
    <Whoami />
  </div>
  <div class="item feeling">
    <Feeling />
  </div>
  <div class="item recent-tweets">
    <RecentTweets />
  </div>
</div>
<!-- <Confetti /> -->
