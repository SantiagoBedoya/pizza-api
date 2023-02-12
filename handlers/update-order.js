const { UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const docClient = require("../dynamodb/doc-client");

function updateOrder(orderId, updates) {
  if (!orderId || !updates || !updates.pizza || !updates.address) {
    throw new Error(
      "Order ID, pizza and address are required for updating the order"
    );
  }

  return docClient
    .send(
      new UpdateItemCommand({
        TableName: "pizza-orders",
        Key: {
          orderId: { S: orderId },
        },
        UpdateExpression: "set pizza = :p, address = :a",
        ExpressionAttributeValues: {
          ":p": { N: updates.pizza },
          ":a": { S: updates.address },
        },
      })
    )
    .then((res) => {
      return res.Attributes;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = updateOrder;
