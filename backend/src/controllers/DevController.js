const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websoket')

module.exports = {
    // Controller para listar os Devs
    async index (request, response) {
        // lista todos os registros
        const devs = await Dev.find();

        // seta o retorno
        return response.json(devs);
    },

    // Controller para cadastrar um novo Dev
    async store (request, response) {
        // captura o corpo da requisição
        const { github_username, techs, latitude, longitude } = request.body;

        // verifica se o Dev existe
        let dev = await Dev.findOne({ github_username });
        if(!dev){
            // consome a API passando o username do github
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);;
            // carrega o resultado em suas variaveis
            const { name = login, avatar_url, bio } = apiResponse.data;
            // converte a string em Array
            const techsArray = parseStringAsArray(techs);
            // carregar a localização
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            // seta os valores no DB
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });   
            
            // Filtrar as conexões que estão no máximo 10 km de distância 
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude }, 
                techsArray
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        // seta o retorno
        return response.json(dev);

    }
};