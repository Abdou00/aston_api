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

app.post('login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  let result = database.filter(
    (user) => user.email === email && user.username === username
  );

  if (result.length !== 1) {
    return res.json({ error_message: "Invalid Credentals !!!" });
  }

  res.json({
    message: "Login successfully",
    data: {
      _id: result[0].id,
      _myEmail: result[0].email,
    },
  });
});

app.post('/schedule/create', (req, res) => {
  const { userId, timezone, schedule } = req.body;
  console.log(req.body);

  let result = database.filter((db) => db.id === userId);

  result[0].timezone = timezone;
  result[0].schedule = schedule;

  res.json({
    message: "OK"
  })
});

app.get('/schedules/:id', (req, res) => {
  const { id } = req.params;

  let result = database.filter((db) => db.id === id);

  if (result.length === 1) {
    return res.json({
      message: "Schedules successfully retrieved!",
      schedules: result[0].schedule,
      username: result[0].username,
      timezone: result[0].timezone,
    });
  }

  return res.json({
    eror_message: "Sign in again, an error occured..."
  });
});

app.post('/schedules/:username', (req, res) => {
  const { username } = req.body;

  let result = database.filter((db) => db.username === username);

  if (result.length === 1) {
    const scheduleArray = result[0].schedule;
    const filteredArray = scheduleArray.filter((sch) => sch.startTime !== "");

    return res.json({
      message: "Schedules successfully retrieved!",
      schedules: filteredArray,
      timezone: result[0].timezone,
      receiverEmail: result[0].email,
    });
  }

  return res.json({
    error_message: "User doesn't exist"
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});