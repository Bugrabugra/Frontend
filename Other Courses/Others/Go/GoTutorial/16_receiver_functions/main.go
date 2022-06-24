package main

import (
	"fmt"
)

func main() {
	myBill := newBill("mario's bill")

	fmt.Println(myBill.format())
}
