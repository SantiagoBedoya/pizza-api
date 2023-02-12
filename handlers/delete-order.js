const { DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const docClient = require("../dynamodb/doc-client");

function deleteOrder(orderId) {
  if (!orderId) {
    throw new Error("Order ID is required for deleting the order");
  }
  return docClient
    .send(
      new DeleteItemCommand({
        TableName: "pizza-orders",
        Key: {
          orderId: { S: orderId },
        },
      })
    )
    .then((res) => {
      return {};
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = deleteOrder;
