// server.js

const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const SECRET_KEY = "your-secret-key"; // Ganti dengan kunci rahasia yang kuat
const expiresIn = "1h"; // Token kedaluwarsa dalam 1 jam

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = router.db
    .get("users")
    .find({ email: email, password: password })
    .value();

  if (user) {
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

server.listen(8001, () => {
  console.log("JSON Server is running on port 8001");
});
