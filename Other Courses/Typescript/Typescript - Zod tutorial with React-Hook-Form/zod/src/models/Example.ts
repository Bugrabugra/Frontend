import { z } from "zod";


// creating a schema for strings
const mySchema = z.string()

// parsing
mySchema.parse("Dave"); // => Dave
mySchema.parse(42); // => throws ZodError

// safe parsing doesn't throw error if validation fails
mySchema.safeParse("Dave"); // => {success: true, data: "Dave"}
mySchema.parse(42); // => {success: false, data: ZodError}

///////
const schema = z.coerce.string();
schema.parse("Dave"); // => "Dave"
schema.parse(42); // => "42"
schema.parse(true); // => "true"
