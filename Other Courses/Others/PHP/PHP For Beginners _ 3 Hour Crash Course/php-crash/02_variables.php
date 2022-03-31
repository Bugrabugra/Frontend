<?php

/* ----- Variables & Data Types ----- */

/* --------- PHP Data Types --------- */
/*
- String - A string is a series of characters surrounded by quotes
- Integer - Whole numbers
- Float - Decimal numbers
- Boolean - true or false
- Array - An array is a special variable, which can hold more than one value
- Object - A class
- NULL - Empty variable
- Resource - A special variable that holds a resource
*/

/* --------- Variable Rules --------- */
/*
- Variables must be prefixed with $
- Variables must start with a letter or the underscore character
- variables can't start with a number
- Variables can only contain alpha-numeric characters and underscores (A-z, 0-9, and _ )
- Variables are case-sensitive ($name and $NAME are two different variables)
*/

$name = "Brad";  // string
$age = 40; // int
$has_kids = false; // boolean
$cash_on_hand = 20.75; // float

// Concatenate Strings
//echo $name . ' is ' . $age . 'years old';

// Better to do this
//echo "${name} is ${age} years old";

// Arithmetic Operators
$x = "5" + "5";
var_dump($x);
echo 10 - 5;
echo 10 * 5;
echo 10 / 5;
echo 10 % 3;

// constants
define("HOST", "localhost");
define("DBNAME", "dev_db");

echo HOST;

