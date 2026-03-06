output "tf-frontend-instance-public-ip" {
  value = aws_instance.tf-frontend-ec2.public_ip
}