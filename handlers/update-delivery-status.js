const { UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const docClient = require("../dynamodb/doc-client");

module.exports = function updateDeliveryStatus(request) {
  if (!request.deliveryId || !request.status) {
    throw new Error("Status and delivery ID are required");
  }
  return docClient
    .send(
      new UpdateItemCommand({
        TableName: "pizza-orders",
        Key: {
          orderId: { S: request.deliveryIds },
        },
        AttributeUpdates: {
          deliveryStatus: {
            Action: "PUT",
            Value: { S: request.status },
          },
        },
      })
    )
    .then(() => {
      return {};
    });
};
