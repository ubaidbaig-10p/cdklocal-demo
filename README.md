# CDK Local Javascript Project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`TestStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

## Useful commands

 * `npm run test`         perform the jest unit tests
 * `cdk deploy`           deploy this stack to your default AWS account/region
 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template


## Pre-Req

- aws cli
- localstack -> pip install localstack
- locakstack-cdk -> npm install aws-cdk-local

## Commands
- `cdklocal deploy`
- `cdklocal destroy`
- `aws --endpoint-url http://localhost:4566 `