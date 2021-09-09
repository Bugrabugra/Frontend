package main

import "fmt"

func main() {
	menu := map[string]float64{
		"soup":           4.99,
		"pie":            7.99,
		"salad":          6.99,
		"toffee pudding": 3.55,
	}

	fmt.Println(menu)
	fmt.Println(menu["pie"])

	// Looping maps
	for k, v := range menu {
		fmt.Println(k, "-", v)
	}

	// Ints as key type
	phonebook := map[int]string{
		35445456: "mario",
		65886363: "luigi",
		13756425: "peach",
	}

	fmt.Println(phonebook)
	fmt.Println(phonebook[35445456])

	phonebook[35445456] = "bowser"
	fmt.Println(phonebook[35445456])
}
