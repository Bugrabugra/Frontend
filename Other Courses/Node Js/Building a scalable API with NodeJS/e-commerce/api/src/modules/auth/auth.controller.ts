import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { usersTable } from "../users/users.schema";
import { eq } from "drizzle-orm";
import omit from "lodash/omit";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const [user] = await db
      .insert(usersTable)
      .values({ ...data, password: hashedPassword })
      .returning();

    const userWithoutPassword = omit(user, ["password"]);

    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    // create a jwt token
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      "your-secret",
      { expiresIn: "30d" },
    );

    const userWithoutPassword = omit(user, ["password"]);

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}
