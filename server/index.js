import express from "express";

const app = express();
const PORT = 4000;

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});