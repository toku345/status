<script>
  import { onMount } from "svelte";

  import Chart from "chart.js";
  import { recentTweets } from "./stores.js";

  onMount(() => {
    let ctx = document.getElementById("tweetsChart");

    let labels = $recentTweets.map(recentTweet => {
      return recentTweet.postedAt;
    });

    let data = $recentTweets.map(recentTweet => {
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
