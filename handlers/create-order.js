"use strict";
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const docClient = require("../dynamodb/doc-client");
const { v4: uuid } = require("uuid");

module.exports = function createOrder(request) {
  if (!request || !request.pizza || !request.address) {
    throw new Error(
      "To order pizza please provide pizza type and address where pizza should be delivered"
    );
  }

  const orderId = uuid();
  return docClient
    .send(
      new PutItemCommand({
        TableName: "pizza-orders",
        Item: {
          orderId: { S: orderId },
          pizza: { N: request.pizza },
          address: { S: request.address },
          orderStatus: { S: "pending" },
        },
      })
    )
    .then((res) => {
      console.log("Order is saved", res);
      return { orderId };
    })
    .catch((err) => {
      console.log("Oops, order is not saved", err);
      throw err;
    });
};
