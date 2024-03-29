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

// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, _res) => JSON.stringify(req.body));

app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((person) => {
      person ? res.json(person) : res.status(404).end();
    });
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  if (body.name | (body.number === undefined)) {
    return res.status(400).json({ error: 'content missing' });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  if (body.name | (body.number === undefined)) {
    return res.status(400).json({ error: 'content missing' });
  }
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(id, person, { new: true }, { runValidators: true })
    .then(updatePerson => {
      res.json(updatePerson);
    })
    .catch(error => next(error));

});

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((person) => {
      res.send(
        `<p>Phonebook has info for ${
          person.length
        } people</p><p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

const endPoint404 = (req, res) => {
  res.status(404).send({ error: 'Not Found' });
};

app.use(endPoint404);

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
