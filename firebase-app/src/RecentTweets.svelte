<script>
  import { onMount } from "svelte";

  import Chart from "chart.js";
  import { recentTweets } from "./stores.js";

  function makeConfig(labels, data) {
    return {
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
  }

  onMount(() => {
    const ctx = document.getElementById("tweetsChart");
    let myChart;

    recentTweets.subscribe(recentTweets => {
      const labels = recentTweets.map(recentTweet => {
        return recentTweet.postedAt;
      });

      const data = recentTweets.map(recentTweet => {
        return recentTweet.score;
      });

      const config = makeConfig(labels, data);
      const myChart = new Chart(ctx, config);
    });

    return () => {
      myChart.destroy();
    };
  });
</script>

<style>
  .tweets-chart {
    width: 100%;
    height: 100%;
  }
</style>

<canvas id="tweetsChart" class="tweets-chart" />
