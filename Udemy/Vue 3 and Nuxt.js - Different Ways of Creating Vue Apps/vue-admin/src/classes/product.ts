import {Entity} from "@/interfaces/entity";

export class Product implements Entity{
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;

  constructor(
    id: number = 0,
    title: string = "",
    description: string = "",
    image: string = "",
    price: number = 0
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
  }
}