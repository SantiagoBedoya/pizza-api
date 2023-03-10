const pizzas = require("../data/pizzas.json");

function getPizzas(pizzaId) {
  if (!pizzaId) {
    return pizzas;
  }

  const pizza = pizzas.find((p) => p.id == pizzaId);
  if (!pizza) {
    throw new Error("The pizza you requested was not found");
  }

  return pizza;
}

module.exports = getPizzas;
