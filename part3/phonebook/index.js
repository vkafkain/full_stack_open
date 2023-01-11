const express = require("express");
const PORT = 3001;
const app = express();

app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

function generatedIdRandom() {
  const random = Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
  return random;
}

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generatedIdRandom(),
  };
  persons = persons.concat(person);

  console.log(person);
  res.json(person);
});

app.get("/api/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
