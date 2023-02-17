require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.SERVER_PORT;
const app = express();
const cors = require('cors');
const Person = require('./models/Person');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);

app.get('/api/persons', (req, res) => {
  Person.find({}).then(notes => {
    res.json(notes)
  })
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = Person.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

function generatedIdRandom() {
  const random = Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
  return random;
}

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if(body.name | body.number === undefined) {
    return res.status(400).json({error: 'content missing'});
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
});

app.get('/api/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
