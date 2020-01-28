module.exports = function parseStringAsArray(arrayAsString = null) {
    if(arrayAsString != null){
        return arrayAsString.split(',').map(tech => tech.trim());
    }
}