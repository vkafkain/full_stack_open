const express = require("express");
const morgan = require("morgan");
const PORT = 8080;
const app = express();
const cors = require('cors');

app.use(express.static('build'))
app.use(express.json());
app.use(cors());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

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

  const findName = persons.findIndex((value) => {
    return value.name === body.name;
  });

  const findNumber = persons.findIndex((value) => {
    return value.number === body.number;
  });

  if (findName > 0) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  if (findNumber > 0) {
    return res.status(400).json({
      error: "number must be unique",
    });
  }

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "number and/or name not entered",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generatedIdRandom(),
  };
  persons = persons.concat(person);

  res.json(person);
});

app.get("/api/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
