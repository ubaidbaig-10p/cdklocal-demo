const sns = require('@aws-cdk/aws-sns');
const subs = require('@aws-cdk/aws-sns-subscriptions');
const sqs = require('@aws-cdk/aws-sqs');
const cdk = require('@aws-cdk/core');
const {Function, AssetCode, Runtime, Tracing} = require('@aws-cdk/aws-lambda');
const {RestApi, LambdaIntegration, Model} = require('@aws-cdk/aws-apigateway');

class TestStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    this.createQueueTopicAndSubscribe();
    this.createLambdaAndHTTPGateway();
  }

  createLambdaAndHTTPGateway() {
    const lambdaProps = {
      handler: 'hello.handler',
      runtime: Runtime.NODEJS_12_X,
      tracingEnabled: Tracing.ACTIVE
    };

    const lambda = new Function(this, 'SsTestLambdaFunction', {
      ...lambdaProps,
      code: new AssetCode(`${__dirname}/../src`),
    });

    const restApi = new RestApi(this, `SsTestApi`);

    const helloResource = restApi.root.addResource('hello');
    helloResource.addMethod('GET', new LambdaIntegration(lambda), {
      methodResponses: [
        {statusCode: '200'},
        // Add other codes like 400 and 403 as needed.
        {statusCode: '401', responseModels: {'application/json': Model.ERROR_MODEL}},
        {statusCode: '500', responseModels: {'application/json': Model.ERROR_MODEL}},
      ],
    });
  }

  createQueueTopicAndSubscribe() {
    const queue = new sqs.Queue(this, 'TestQueue', {
      queueName: 'TestQueue',
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'TestTopic', {
      topicName: 'MyTestTopic'
    });

    topic.addSubscription(new subs.SqsSubscription(queue));
  }
}

module.exports = { TestStack }
