# CDK Local Javascript Project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`TestStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

## Install 
##### Pull `localstack/localstack` docker image. 
```docker-compose pull```

##### Start localstack container 
```docker-compose up -d```

##### Deploy CDK Stack 
```cdklocal deploy```

##### Test SNS
- ```node test/sns/consumer.js```
- ```aws --endpoint-url=http://localhost:4566 sns publish --topic-arn arn:aws:sns:us-west-2:000000000000:MyTestTopic --message "TEST"```

## Destroy Stack
- `cdklocal destroy`

## Helpful Tools
- aws cli

### AWS cli Usage
We need to add `--endpoint-url http://localhost:4566` in any aws-cli command we want to use.

_Example: `aws --endpoint-url http://localhost:4566 sqs list-queues`_