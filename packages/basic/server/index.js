'use strict';

const express = require('express');

const app = express();

const USERS = [
  {
    id: 1,
    name: 'Michael',
    surname: 'Jackson',
    age: 56,
    gender: 'male',
  },
  {
    id: 2,
    name: 'Kate',
    surname: 'Nilton',
    age: 43,
    gender: 'female',
  },
  {
    id: 3,
    name: 'John',
    surname: 'Smith',
    age: 48,
    gender: 'male',
  },
];

app.get('/users', (req, res) => {
  console.log(`GET ${req.url}`);
  res.end(USERS);
});

app.patch('/users/:id', (req, res) => {
  console.log(`PATCH ${req.url} with PARAMS id = ${req.params.id}`);

  const userIndex = USERS.findIndex((user) => user.id === req.params.id);

  if (userIndex === -1) {
    res.sendStatus(404);
    return;
  }

  USERS[userIndex] = { ...req.body };
  res.json(USERS[userIndex]);
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
