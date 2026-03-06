terraform {
  backend "s3" {
  }
}

provider "aws" {
  region = var.aws-region
}

data "aws_vpcs" "vpcs" {
}

data "aws_subnet" "public-subnet-A" {
  filter {
    name   = "tag:Name"
    values = ["PublicSubnetA"]
  }
}

# data "aws_subnets" "subnets" {
#   filter {
#     name   = "vpc-id"
#     values = [data.aws_vpcs.vpcs.ids[0]]
#   }

#   filter {
#     name   = "tag:Name"
#     values = ["PublicSubnet*"]
#   }
# }

# module for custom VPC
# module "tf-vpc" {
#   source = "./modules/vpc"
# }

module "tf-frontend-sg" {
  source = "./modules/sg"
  tf-vpc-id = data.aws_vpcs.vpcs.ids[0]
}


module "tf-frontend-instance" {
  source = "./modules/instances"
  subnet_id = data.aws_subnet.public-subnet-A.id
  tf-frontend-sg-id = module.tf-frontend-sg.tf-frontend-sg-id
  tags = var.tags
}