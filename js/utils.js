function fetchData(endpoint) {
  fetch(endpoint)
    .then(res => res.json())
    .then(({ results }) => {
      cnf.container.innerHTML = '';
      cnf.allData = results;
      cnf.displayResults.innerHTML = results.length;
      console.log("display", results)
      if (!cnf.selected) {
        renderResults();
        return
      }
      beginGetDataPokemon(results);
    })
}

function beginGetDataPokemon(results) {
  results.forEach( async( { url }, i) => {
    await fetchPokemons(url, i)})
}

async function fetchPokemons(url, position) {
  const fetcher = await fetch(url);
  const data = await fetcher.json();

  const registro = cnf.allData[position];
  cnf.allData[position]= { ...registro, ...data }
  renderResult(registro.name, data.sprites.front_default)
}

function renderResults() {
  cnf.allData
    .forEach(({ name, image }) => {
      renderResult(name, image)
    });
}

function renderResult(name, image) {
  const component = `<section><p>${name}</p><img src="${image}"></section>`;
    cnf.container.insertAdjacentHTML('beforeend', component)
}