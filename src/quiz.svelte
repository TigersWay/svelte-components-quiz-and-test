<svelte:options tag="tw-quiz" />
<script>
  import {onMount} from 'svelte';
  import hjsonparse from './hjson/hjson-parse';
  import {shuffleArray} from './utils';

  export let hjson = '', columns = '';
	let data = 	[];
  let results = [];

  onMount(() => {
    data = hjsonparse(hjson);
    data.forEach((item, index) => {
      data[index].answers = shuffleArray([...item.answers, item.correct]);
    })
    columns = columns || '18em auto';
  });
</script>

<style>
  host {display: block;}
  div {margin-bottom:.8em; break-inside: avoid;}
  p {margin: 0 0 .5em 0;}
  label {display: flex; align-items: center; line-height: 1.25em; margin: 0 0 .4em .4em;}
</style>

<host style="columns:{columns};">
  {#each data as {question, answers, correct}, i}
  <div>
    <p><!--<span>{i+1}&gt;&nbsp</span>-->{question}</p>
    {#each answers as answer, j}
    <label>
      <input type=radio bind:group={results[i]} value={answer}>
      &nbsp;<span>{answer}</span>
      <span>{#if results[i] == answer}{#if answer == correct}&nbsp;&#x2714;{:else}&nbsp;&#x2718;{/if}{/if}</span>
    </label>
    {/each}
  </div>
  {/each}
</host>
