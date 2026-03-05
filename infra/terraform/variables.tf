

variable "aws-region" {
  type = string
}

variable "tags" {
  type = list(map(string))
  default = [ {
    "Name" = "tf-backend-instance"
    "env"  = "staging"
  },{
    "Name" = "tf-frontend-instance"
    "env"  = "staging"
  } ]
}