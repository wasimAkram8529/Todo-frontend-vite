
output "tf-frontend-sg-id" {
  value = aws_security_group.tf-frontend-sg["tf-frontend-sg"].id
}

output "alb-sg-id" {
  value = aws_security_group.tf-frontend-sg["tf-alb-sg"].id
}