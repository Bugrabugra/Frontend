import express, { NextFunction, Request, Response } from "express";
import cookieSession from "cookie-session";

declare module "express-session" {
  interface SessionData {
    user: {
      username: string;
    };
  }
}

const app = express();
const port = 3333;

const users: Record<string, string> = {
  salem: "supercat123"
};

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["keyboard cat"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

app.get("/", auth, (req, res) => {
  res.sendFile(`${__dirname}/cats.html`);
});

app.post("/signin", (req, res) => {
  const username: string = req.body?.username;
  const password: string = req.body?.password;

  if (!username) return res.status(403).send("Credentials incorrect");

  const pw = users[username];
  if (pw !== password) return res.status(403).send("Credentials incorrect");

  req.session.user = {
    username
  };

  return res.status(200).send("ok");
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
