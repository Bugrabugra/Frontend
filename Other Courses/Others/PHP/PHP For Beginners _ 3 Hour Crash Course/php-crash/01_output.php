<?php // This is a php tag. If there is no html or other content below the php, we don't need to close the php tag.
/* -------- Output & Comments ------- */

// Echo - Output strings, numbers, html, etc
//echo "hello";
//echo 123;
//echo 10.5;

// print - Similar to echo, but a bit slower
//print 123;

// print_r - Gives a bit more info. Can be used to print arrays
//print_r([1, 2, 3]);

// var_dump - Even more info like data type and length
//var_dump(true);

// var_export - Similar to var_dump(). Outputs a string representation of a variable
//var_export("Hello");
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <h1><?= "Post One"; ?></h1>
  </body>
</html>
