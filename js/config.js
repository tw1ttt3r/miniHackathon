const cnf = {
  apis: [
    "https://rickandmortyapi.com/api/character",
    "https://pokeapi.co/api/v2/pokemon",
  ],
  filters: [
    [ { field: "name", inData: "name" }, { field: "gender", inData: "gender" }, { field: "location", inData: "location.name" } ],
    [ { field: "name", inData: "name" } ]
  ],
  selected: null,
  allData: null,
  displayResults: null,
  container: null,
  containerFilters: null,
  filterSelected: [],
  displayError: null,
  displayErrorFilter: null,
  textFilter: '',
  displayResultsFilter: null,
  fieldInput: null
};