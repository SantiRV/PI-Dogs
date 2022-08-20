const {
    API_KEY,
  } = process.env;
const axios = require('axios');
const endpoint = 'https://api.thedogapi.com/v1/breeds?api_key='

const getApiInfo = () => {
    const apiUrl = axios.get(`${endpoint}${API_KEY}`)
        .then(res => res.data.map(el => {
            return {
                id: el.id,
                name: el.name,
                height_Min: el.height.metric.split(' - ')[0],
                height_Max: el.height.metric.split(' - ')[1] ?
                    el.height.metric.split(' - ')[1] :
                    Math.round(el.height.metric.split(' - ')[0] * 1.1),
                weight_Min: el.weight.metric.split(' - ')[0] !== "NaN" ?
                    el.weight.metric.split(' - ')[0] :
                    (el.weight.metric.split(' - ')[1] ?
                        Math.round(el.weight.metric.split(' - ')[1] * 0.6) :
                        '30'), //Math.round(el.weight.imperial.split(' - ')[1] * 0.6 / 2.205).toString()),
                weight_Max: el.weight.metric.split(' - ')[1] ?
                    el.weight.metric.split(' - ')[1] :
                    '39', //Math.round(parseInt(el.weight.imperial.split(' - ')[1]) / 2.205).toString(),
                life_span: el.life_span,
                temperaments: el.temperament ? el.temperament : null,
                image: el.image.url,
            }
        }));
    return apiUrl
}

module.exports = {
    getApiInfo,
}