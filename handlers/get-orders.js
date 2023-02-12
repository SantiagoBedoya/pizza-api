const { ScanCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const docClient = require("../dynamodb/doc-client");

function getOrders(orderId) {
  if (orderId) {
    return docClient
      .send(
        new GetItemCommand({
          TableName: "pizza-orders",
          Key: {
            orderId: { S: orderId },
          },
        })
      )
      .then((res) => {
        if (!res.Item) {
          throw new Error("The order you requested not found");
        }
        return res.Item;
      })
      .catch((err) => {
        throw err;
      });
  }

  return docClient
    .send(
      new ScanCommand({
        TableName: "pizza-orders",
      })
    )
    .then((res) => {
      return res.Items;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = getOrders;
