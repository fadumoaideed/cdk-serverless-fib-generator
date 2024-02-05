import * as cdk from "@aws-cdk/core";
import { Vpc } from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

export class FargateDemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc(this, "VPC-fa-test", {
      maxAzs: 2,
      natGateways: 1,
    });

    // Fargate cluster
    const cluster = new ecs.Cluster(this, "fargateCluster-fa-test", {
      vpc: vpc as any,
    });

    // Fargate service
    const backendService =
      new ecs_patterns.ApplicationLoadBalancedFargateService(
        this,
        "backendService-fa-test",
        {
          cluster: cluster,
          memoryLimitMiB: 1024,
          cpu: 512,
          desiredCount: 2,
          taskImageOptions: {
            image: ecs.ContainerImage.fromAsset("./backend"),
            environment: {
              DB_HOST: "variable01",
            },
          },
        }
      );

    // Health check
    backendService.targetGroup.configureHealthCheck({ path: "/health" });

    // Load balancer url
    new cdk.CfnOutput(this, "loadBalancerUrl-fa-test", {
      value: backendService.loadBalancer.loadBalancerDnsName,
      exportName: "loadBalancerUrl",
    });
  }
}
