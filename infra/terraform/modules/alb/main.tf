resource "aws_lb" "alb" {
  name = "demo-alb"
  load_balancer_type = "application"
  internal = false
  security_groups = [var.alb-sg]
  subnets = var.subnets
}

resource "aws_lb_target_group" "alb-tg" {
  name = "alb-tg"
  port = 80
  protocol = "HTTP"
  vpc_id = var.vpc_id
}

resource "aws_lb_listener" "alb-listener" {
  load_balancer_arn = aws_lb.alb.arn
  port = 80
  protocol = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.alb-tg.arn
  }
}

resource "aws_lb_target_group_attachment" "alb-tg-attach" {
  count = length(var.instance_ids)
  target_group_arn = aws_lb_target_group.alb-tg.arn
  target_id = var.instance_ids[count.index]
  port = 80
}