data "aws_availability_zones" "az" {
  state = "available"
}

resource "aws_vpc" "tf_vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "tg-vpc"
  }
}

resource "aws_subnet" "tf_subnet" {
  count                   = 2
  vpc_id                  = aws_vpc.tf_vpc.id
  cidr_block              = cidrsubnet("10.0.0.0/16", 4, count.index)
  availability_zone       = data.aws_availability_zones.az.names[count.index]
  map_public_ip_on_launch = true
}

resource "aws_internet_gateway" "tf_ig" {
  vpc_id = aws_vpc.tf_vpc.id

  tags = {
    Name = "terraform-internet-gate"
  }
}

resource "aws_route_table" "tf-rt" {
  vpc_id = aws_vpc.tf_vpc.id

  route {
    gateway_id = aws_internet_gateway.tf_ig.id
    cidr_block = "0.0.0.0/0"
  }

  tags = {
    Name = "tf-route-table"
  }
}

resource "aws_route_table_association" "tf-rta" {
  count          = length(aws_subnet.tf_subnet)

  subnet_id      = aws_subnet.tf_subnet[count.index].id
  route_table_id = aws_route_table.tf-rt.id
}
