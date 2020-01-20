const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// rota para listar os devs
routes.get('/devs', DevController.index);

// rota para cadastrar dev
routes.post('/devs', DevController.store);

// rota para buscar um dev
routes.get('/search', SearchController.index);


module.exports = routes;