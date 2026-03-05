variable "tf-backend-sg-id" {
  
}

variable "instance_type" {
  type = string
  default = "t2.micro"
}

variable "ami" {
  type = string
  default = "ami-0ecb62995f68bb549"
}

variable "key_name" {
  type = string
  default = "Ansible_key"
}

variable "subnet_id" {
}

variable "tags" {
  type = map(string)
}