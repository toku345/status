<script>
  import { onMount } from "svelte";

  import Chart from "chart.js";

  let recentTweets = [
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
  ].reverse();

  onMount(() => {
    let ctx = document.getElementById("tweetsChart");

    let labels = recentTweets.map(recentTweet => {
      return recentTweet.postedAt;
    });

    let data = recentTweets.map(recentTweet => {
      return recentTweet.score;
    });

    let config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "",
            data: data,
            fill: false
          }
        ]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: ""
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Posted at"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Post's sentiment score"
              }
            }
          ]
        }
      }
    };

    let myChart = new Chart(ctx, config);
  });
</script>

<style>
  .tweets-chart {
    width: 100%;
    height: 100%;
  }
</style>

<canvas id="tweetsChart" class="tweets-chart" />
