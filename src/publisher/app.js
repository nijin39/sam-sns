let response;
var AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-2" });


exports.handler = function (event, context) {
  var sns = new AWS.SNS();
  var eventText = JSON.stringify(event, null, 2);
  console.log("Received event:", eventText);

  var params = {
    Message: eventText,
    Subject: "Test SNS From Lambda",
    TopicArn: "arn:aws:sns:ap-northeast-2:256010096758:lambda-sns-SimpleTopic-1WIAB2EQYTCTS",
  };
  // Create promise and SNS service object
  var publishTextPromise = sns.publish(params).promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then(function (data) {
      console.log(
        `Message ${params.Message} sent to the topic ${params.TopicArn}`
      );
      console.log("MessageID is " + data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });

  return response;
};
