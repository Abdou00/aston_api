import express from "express";

const app = express();
const PORT = 4000;
// Tableau représentant les data
const database = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

// Middlewares
// Retourne un middleware qui analyse uniquement les corps codés en urlen et regarde uniquement les requêtes où l'en-tête Content-Type correspond à l'option type. Cet analyseur accepte uniquement l'encodage UTF-8 du corps et supporte le gonflage automatique des encodages gzip et deflate.
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Content-Type: application/json

// Routes
app.get('/api', (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  // Check if the user does not exist
  let result = database.filter(
    (user) => user.email === email || user.username === username
  );

  if (result.length === 0) {
    database.push({
      id: generateID(),
      username,
      password,
      email,
      timezone: {},
      schedule: [],
    });

    return res.json({ message: "Account created successfully!" });
  }

  res.json({ error_message: "User already exists!" });
});

app.post();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});