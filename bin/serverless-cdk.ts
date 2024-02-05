#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { FargateDemoStack } from "../lib/fargate";
import { CloudfrontDemoStack } from "../lib/cloudfront";

const app = new cdk.App();

// Cloudfront stack
new CloudfrontDemoStack(app, "CloudfrontDemoStack", {
  stage: "dev",
  env: { account: "", region: "us-east-1" },
});

// Fargate stack
new FargateDemoStack(app, "FargateDemoStack", {
  env: { account: "", region: "us-east-1" },
});
