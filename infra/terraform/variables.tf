

variable "aws-region" {
  type = string
}

variable "tags" {
  type = map(string)
  default = {
    "Name" = "tf-frontend-instance"
    "env"  = "staging"
  }
}