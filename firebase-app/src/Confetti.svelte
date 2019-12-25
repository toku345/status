<script>
  import { onMount } from "svelte";

  let characters = ["😑", "😪", "😷", "🥴", "😵"];

  let confetti = new Array(100)
    .fill()
    .map((_, i) => {
      return {
        character: characters[i % characters.length],
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        r: 0.1 + Math.random() * 1
      };
    })
    .sort((a, b) => a.r - b.r);

  onMount(() => {
    let frame;

    function loop() {
      frame = requestAnimationFrame(loop);

      confetti = confetti.map(emoji => {
        emoji.y += 0.7 * emoji.r;
        if (emoji.y > 120) emoji.y = -20;
        return emoji;
      });
    }

    loop();

    return () => cancelAnimationFrame(frame);
  });
</script>

<style>
  :global(body) {
    overflow: hidden;
  }

  span {
    position: absolute;
    font-size: 5vw;
  }
</style>

<!--
  Copyright (c) 2016-19 [these people](https://github.com/sveltejs/svelte/graphs/contributors)

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  © 2019 GitHub, Inc.
-->

<div>
  {#each confetti as c}
    <span style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})">
      {c.character}
    </span>
  {/each}
</div>
