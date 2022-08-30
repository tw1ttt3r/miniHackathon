function fetchData(endpoint) {
  fetch(endpoint)
    .then(res => res.json())
    .then(({ results }) => {
      reset();
      cnf.allData = results;
      cnf.displayResults.innerHTML = results.length;
      renderFilters()
      if (!cnf.selected) {
        renderResults();
        return
      }
      beginGetDataPokemon(results);
    })
}

function reset() {
  cnf.container.innerHTML = '';
  cnf.displayResultsFilter.innerHTML = '';
  cnf.displayErrorFilter.innerHTML = ''
  cnf.displayError.innerHTML = '';
  cnf.filterSelected = [];
  cnf.textFilter = '';
  cnf.fieldInput.value = '';
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

function renderResult(name, image, container = cnf.container) {
  const component = `<section><p>${name}</p><img src="${image}"></section>`;
  container.insertAdjacentHTML('beforeend', component)
}

function renderFilters() {
  cnf.containerFilters.innerHTML = '';
  cnf.filters[cnf.selected]
    .forEach( ({field: filter}) => {
      cnf.containerFilters.insertAdjacentHTML('beforeend', `<input type="checkbox" class="filterData" name="${filter}"> <label for="${filter}">${filter}</label>`)
    })
  Array.from(document.querySelectorAll(".filterData"))
    .forEach( element => {
      element.addEventListener("click", ({ target: { name } }) => {
        if (cnf.filterSelected.includes(name)) {
          cnf.filterSelected =  cnf.filterSelected.filter( filter => filter !== name )
          return
        }
        cnf.filterSelected = [ ...cnf.filterSelected, name ]
      })
    })
}

function renderFilterResults() {
  const results = cnf.filterSelected.reduce((prev, curr, i) => {
  const field = cnf.filters[cnf.selected].filter( filterr => filterr.field === curr )[0].inData
    if (!i) {
      prev = cnf.allData.filter( registro => registro[field].includes(cnf.textFilter))
      return prev
    }
    return prev.filter( registro => registro[field] === cnf.textFilter )
  }, [])
  cnf.displayResultsFilter.innerHTML = '';
  cnf.displayErrorFilter.innerHTML = ''
  if (!results.length) {
    cnf.displayErrorFilter.innerHTML = 'Sin registros encontrados'
    return
  }
  results.forEach( registro => renderResult(registro.name, !cnf.selected ? registro.image : registro.sprites.front_default, cnf.displayResultsFilter) )
}

function beginFilter(search) {
  if (!cnf.filterSelected.length) {
    cnf.displayError.innerHTML = "No existe un filtro seleccionado"
    return
  }
  cnf.displayError.innerHTML = ""
  if (search) renderFilterResults()
}