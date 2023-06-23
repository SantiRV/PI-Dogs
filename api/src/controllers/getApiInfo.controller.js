const {
    API_KEY,
  } = process.env;
const axios = require('axios');

/* funcion que llama a la api y se guarada los datos necesarios de los perros en infoApi */
const getApiInfo = async () => {
    const getApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const infoApi = getApi.data.map((response) => {
      return {
        id: response.id,
        name: response.name,
        height: response.height.metric.split(" - "),
        weight: response.weight.metric.split(" - "),
        temperament: response.temperament,
        image: response.image.url,
        life_span: response.life_span,
        origin: response.origin,
      };
    });
    return infoApi;
  };

module.exports = {
    getApiInfo,
}