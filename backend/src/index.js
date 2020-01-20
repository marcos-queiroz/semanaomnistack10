const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

// inicializa a aplicação
const app = express();

// conecta no banco
mongoose.connect('mongodb+srv://beedev:beedev@cluster0-vugtd.mongodb.net/week10?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// habilita a utilização do cors
app.use(cors());
// habilita a utilização de json
app.use(express.json());
// utiliza as rotas
app.use(routes);

// define a porta
app.listen(3333);