import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type Recipe = {
  title: string;
  description: string;
};

const recipes: Recipe[] = [
  {
    title: "Spaghetti Bolognese",
    description: "A classic Italian meat sauce pasta.",
  },
  {
    title: "Chicken Alfredo",
    description: "Creamy pasta with grilled chicken.",
  },
  { title: "Beef Tacos", description: "Seasoned beef in a crispy taco shell." },
  {
    title: "Vegetable Curry",
    description: "Spicy and hearty mixed vegetable curry.",
  },
  {
    title: "Grilled Cheese Sandwich",
    description: "Melted cheese between toasted bread.",
  },
  { title: "Tomato Soup", description: "Smooth, rich tomato soup." },
  {
    title: "Caesar Salad",
    description: "Crisp lettuce with creamy Caesar dressing.",
  },
  {
    title: "Pan-Seared Salmon",
    description: "Salmon fillet with lemon butter sauce.",
  },
  { title: "Mushroom Risotto", description: "Creamy risotto with mushrooms." },
  {
    title: "BBQ Chicken Wings",
    description: "Spicy and sticky grilled chicken wings.",
  },
];

async function main() {
  console.log("Start seeding...");

  try {
    await prisma.recipe.deleteMany({});

    const batchSize = 5;

    for (let i = 0; i < recipes.length; i += batchSize) {
      const batch = recipes.slice(i, i + batchSize);
      await Promise.all(
        batch.map((recipe) =>
          prisma.recipe.create({
            data: recipe,
          }),
        ),
      );

      console.log(`Seeded recipes ${i + 1} to ${i + batch.length}`);
    }

    console.log(`Seeding finished. Added ${recipes.length} recipes.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
