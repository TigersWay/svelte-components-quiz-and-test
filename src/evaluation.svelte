<svelte:options tag="tw-evaluation" />
<script>
  import {onMount} from 'svelte';
  import hjsonparse from './hjson/hjson-parse';
  import {shuffleArray} from './utils';

  export let hjson = '', columns = '';
	let data = 	[];
  let results = [];
  let counts = '';

  onMount(() => {
    data = hjsonparse(hjson);
    data.forEach((item, index) => {
      data[index].answers = shuffleArray(item.answers);
    })
    columns = columns || '18em auto';
  });

  function result(array) {
    let counts = {};

    array.forEach(([key, value]) => { counts[key] = (counts[key] || 0) + 1; });
    counts = Object.entries(counts).sort((a,b) => b[1] - a[1]);

    let last = counts.pop(), resultStr = '';

    if (!last) return resultStr;
    else resultStr = `${last[1]}x${last[0]}`;

    if (counts.length > 0) resultStr = `${counts.map(count => `${count[1]}x${count[0]}`).join(', ')} et ${resultStr}`;

    return resultStr;
  }

  $: counts = result(results);
</script>

<style>
  host {display: block;}
  div {margin-bottom:.8em; break-inside: avoid;}
  p {margin: 0 0 .5em 0;}
  label {display: flex; align-items: center; line-height: 1.25em; margin: 0 0 .4em .4em;}
  #results {margin-top:.8em;}
</style>

<host style="columns:{columns};">
  {#each data as {question, answers}, i}
  <div>
    <p>{question}</p>
    {#each answers as answer}
    <label><span>{answer[0]}</span><input type=radio bind:group={results[i]} value={answer[0]}>&nbsp;<span>{answer.slice(4)}</span></label>
    {/each}
  </div>
  {/each}
  <p id="results" style="column-span: all;">Résultats : {counts}</p>
</host>
