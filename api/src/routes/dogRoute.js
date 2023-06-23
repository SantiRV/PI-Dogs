const Router = require('express');
const { Dog, Temperament } = require('../db');
const { getAllDogs } = require('../controllers/allDogs.controllers');
const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    const dogsTotal = await getAllDogs();
    try {
        if(name) {
            let dogName = dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            dogNameName.length ?
            res.status(200).json(dogName) :
            res.status(404).send('Dog Not Found')
        } else {
            res.status(200).json(dogsTotal);
        }
    } catch(error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allDogs = await getAllDogs();
    try {
        if (id) {
            const dogId = allDogs.filter(e => e.id == id);
            dogId.length ?
                res.status(200).json(dogId) :
                res.status(404).send('Dog Not Found')
        }
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const allDogs = await getAllDogs();
    try {
        if(id) {
            const deleteDog = allDogs.filter(poke => dog.id === id);
            deleteDog.length ?
            res.status(200).send('Dog delete') :
            res.status(404).send('Error')
        }
    } catch(error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
    const {name, height, weight, temperament, image, life_span, origin, createdInDb } = req.body;
    if (!name || !height || !weight || !temperament || !image || !life_span || !origin ) {
        console.log(name);
        return res.status(400).json({info: 'Falta ingresar un dato'});
    }

    let arrTemperament = [];
    req.body.temperament.map(e => arrTemperament.push({ name: e }));
    if(!arrTemperament.length) {
        return res.status(400).json({info: 'Chose one Temperament'});
    }
    console.log(arrTemperament, 'ARRAY');

    const exist = await  Dog.findOne({ where: {name: req.body.name } });
    console.log(exist);

    if(exist) {
        console.log(exist);
        return res.send(400).json({ info: "nombre existente"})
    }
    
    try {
        const createDog = Pokemon.create({
            name, 
            height, 
            weight, 
            temperament, 
            image, 
            life_span, 
            origin,
            createdInDb  
        });
        const createdDb = await Temperament.findAll({
            where: { name: temperament }
        });
        createDog.addTemperament(createdDb);
        return res.status(200).send('Dog created')
    } catch(error) {
        console.log(error);
    }

});

module.exports = router;