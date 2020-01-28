const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websoket');

// inicializa a aplicação
const app = express();
// extrair o server http 
const server = http.Server(app);

setupWebsocket(server);

// conecta no banco
mongoose.connect('mongodb+srv://beedev:beedev@cluster0-vugtd.mongodb.net/week10?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// habilita a utilização do cors
app.use(cors());
// habilita a utilização de json
app.use(express.json());
// utiliza as rotas
app.use(routes);

// define a porta
server.listen(3333);