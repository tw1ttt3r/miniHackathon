Array.from(document.querySelectorAll(".content-accionables > li"))
  .forEach( (element, i) => {
    element.addEventListener("click", () => {
      cnf.selected = i;
      fetchData(cnf.apis[i])
    })
  });

Array.from(document.querySelectorAll(".muestra p:first-of-type span"))
  .forEach( element => cnf.displayResults = element )

Array.from(document.querySelectorAll(".muestra .results"))
  .forEach( element => cnf.container = element )

Array.from(document.querySelectorAll(".filtrado div:first-of-type"))
  .forEach( element => cnf.containerFilters = element)

Array.from(document.querySelectorAll(".filtrado .resultsFilter"))
  .forEach( element => cnf.displayResultsFilter = element)

cnf.fieldInput = document.querySelector("#filter");
cnf.displayError = document.querySelectorAll(".filtrado .error")[0];
cnf.displayErrorFilter = document.querySelectorAll(".filtrado p:last-of-type")[0];

cnf.fieldInput.addEventListener("keyup", ({ target: { value } }) => {
  cnf.textFilter = value
  beginFilter(false)
})

Array.from(document.querySelectorAll(".filtrado div:last-of-type button"))
  .forEach( element => element.addEventListener("click", () => beginFilter(true)))