const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        // captura os parametros requisição
        const { techs, latitude, longitude } = request.query;
        // converte a string em Array
        const techsArray = parseStringAsArray(techs);

        // buscar todos os devs num raio 10KM
        // filtrar por tecnologias

        // lista todos os registros
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            }
        });

        // seta o retorno
        return response.json({ devs});
    }
}