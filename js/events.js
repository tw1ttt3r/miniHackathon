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