"use strict";
const ClaudiaAPIBuilder = require("claudia-api-builder");
const getPizzas = require("./handlers/get-pizzas");
const createOrder = require("./handlers/create-order");
const updateOrder = require("./handlers/update-order");
const deleteOrder = require("./handlers/delete-order");
const getOrders = require("./handlers/get-orders");
const updateDeliveryStatus = require("./handlers/update-delivery-status");

const api = new ClaudiaAPIBuilder();

api.get("/", () => "Welcome to pizza API");

api.get("/pizzas", () => {
  return getPizzas();
});

api.get(
  "/pizzas/{id}",
  (req) => {
    return getPizzas(req.pathParams.id);
  },
  {
    error: 404,
  }
);

api.get("/orders", () => {
  return getOrders();
});

api.get(
  "/orders/{id}",
  (req) => {
    return getOrders(req.pathParams.id);
  },
  {
    error: 404,
  }
);

api.post(
  "/orders",
  (req) => {
    return createOrder(req.body);
  },
  {
    success: 201,
    error: 400,
  }
);

api.put(
  "/orders/{id}",
  (req) => {
    return updateOrder(req.pathParams.id, req.body);
  },
  {
    error: 400,
  }
);

api.delete(
  "/orders/{id}",
  (req) => {
    return deleteOrder(req.pathParams.id);
  },
  {
    success: 200,
    error: 400,
  }
);

api.post("/delivery", (req) => updateDeliveryStatus(req.body), {
  success: 200,
  error: 400,
});

module.exports = api;
