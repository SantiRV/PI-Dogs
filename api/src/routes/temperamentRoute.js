const {Router} = require('express');
const axios = require('axios');
const { Temperament } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    const tempNormal = await Temperament.findOne({where: {name: 'normal'}});

    if(!tempNormal) {
        try {
            const temperament = await axios.get("https://api.thedogapi.com/v1/breeds");
            const tempTotal = temperament.data.results.map(e => e.name);
            const tempCreate = tempTotal.map(async e => await Temperament.create({name: e}));
            res.status(200).send(tempCreate);
        } catch(error) {
            res.status(404).send('error');
        }
    } else {
        const temperament =await Temperament.findAll();
        const tempTotal = temperament.map(e => e.name);
        return res.status(200).send(tempTotal);
    }
});

module.exports = router;