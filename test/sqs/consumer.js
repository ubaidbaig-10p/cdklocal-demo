const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const sqs = new AWS.SQS({endpoint: 'http://localhost:4566'});
const QueueUrl = 'http://localhost:4566/000000000000/TestQueue'; // leave this one blank for now!

const receiveParams = {
    QueueUrl,
    MaxNumberOfMessages: 1
};

async function receive() {
    try {
        const queueData = await sqs.receiveMessage(receiveParams).promise();
        if (
            queueData &&
            queueData.Messages &&
            queueData.Messages.length > 0
        ) {
            const [firstMessage] = queueData.Messages;
            console.log('RECEIVED: ', firstMessage);
            const deleteParams = {
                QueueUrl,
                ReceiptHandle: firstMessage.ReceiptHandle
            };
            // @ts-ignore
            await sqs.deleteMessage(deleteParams).promise();
        } else {
            console.log('waiting...');
        }
    } catch (e) {
        console.log('ERROR: ', e);
    }
}

// we poll every 500ms and act accordingly
setInterval(receive, 500);
