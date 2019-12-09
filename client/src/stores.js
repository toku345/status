import { writable } from "svelte/store";

export const recentTweets = writable([
  {
    tweet: "さぁー、やるぞー🔥",
    score: 0.6,
    magnitude: 0.6,
    postedAt: "2019/12/09 06:21:10"
  },
  {
    tweet: "tableのスタイリング、難しいな...",
    score: -0.1,
    magnitude: 0.1,
    postedAt: "2019/12/09 06:17:10"
  },
  {
    tweet:
      "とりあえず最近のつぶやきをテーブルで表示してみようって思ってたけど、これ表示するとなんでいいんだっけか？",
    score: 0.1,
    magnitude: 0.1,
    postedAt: "2019/12/09 06:17:01"
  }
]);
