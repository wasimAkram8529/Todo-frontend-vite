output "tf-vpc-id" {
  value = aws_vpc.tf_vpc.id
}

output "tf-subnet-id" {
  value = aws_subnet.tf_subnet[*].id
}