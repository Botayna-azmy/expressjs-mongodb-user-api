const express = require('express');
const User = require('./user');

const app = express();

app.use(express.json());