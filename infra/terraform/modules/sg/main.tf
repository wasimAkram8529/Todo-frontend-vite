resource "aws_security_group" "tf-frontend-sg" {
  for_each = var.frontend-allowed-ingress-port
  name = each.key
  vpc_id = var.tf-vpc-id

  dynamic "ingress" {
    for_each = each.value

    content {
      from_port = ingress.value
      to_port = ingress.value
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
}