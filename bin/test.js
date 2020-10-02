#!/usr/bin/env node
const cdk = require('@aws-cdk/core');
const { CdkWorkshopStack } = require('../lib/test-stack');

const app = new cdk.App();
new CdkWorkshopStack(app, 'CdkWorkshopStack');
