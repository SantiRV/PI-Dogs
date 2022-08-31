const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const { Dog, Temperament } = require('../db');
require('dotenv').config();
const {getAllDogs} = require('../controllers/allDogs.controllers');
const {getApiInfo} = require('../controllers/getApiInfo.controller');
const {getDbInfo} =require('../controllers/getDbInfo.controller');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get(`/dogs`, async (req, res, next) => {
    try {
      const { name } = req.query;
      if (!name) {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const informacion = await apiInfo.concat(dbInfo);
        informacion.length
          ? res.status(200).send(informacion)
          : res.status(404).send("Api not found");
      }
      if (name) {
        const api = await getAllDogs();
        let dogName = await api.filter((d) =>
          d.name.toLowerCase().includes(name.toLowerCase())
        );
        dogName.length
          ? res.status(200).send(dogName)
          : res.status(404).send("Dog not found");
      }
    } catch (err) {
      next(err);
    }
  });
  
  /* ruta que valida si hay un id en params y filtra a los perros segun el id */
  router.get(`/dogs/:id`, async (req, res, next) => {
    try {
      const { id } = req.params;
      const dogsTotal = await getAllDogs();
  
      if (typeof id === "string" && id.length > 8) {
        let filter = dogsTotal.filter((el) => el.id == id);
        res.status(200).send(filter);
      } else {
        const infoApi = await getAllDogs();
        const find = infoApi.find((data) => data.id === Number(id));
        res.status(200).json(find);
      }
    } catch (err) {
      next(err);
    }
  });
  
  /* ruta que nos obtiene los temperamentos desde la api y los guarda en la db */
  router.get(`/temperament`, async (req, res, next) => {
    try {
      const array = [];
      const arr = [];
      const apiData = await getAllDogs()
      const infoTemperament = apiData.map((d) => {
        return {
          temperament: d.temperament,
        };
      });
  
      const filtro = infoTemperament.filter((d) => d.temperament !== undefined);
  
      filtro.map((d) => {
        array.push(d.temperament.split(","));
        return array;
      });
  
      array.forEach((d) => {
        for (var i = 0; i < d.length; i++) {
          d[i] = d[i].trimStart();
          arr.push(d[i]);
        }
      });
  
      const tabla = {};
      const unicos = arr.filter((indice) => {
        return tabla.hasOwnProperty(indice) ? false : (tabla[indice] = true);
      });
      unicos.sort();
  
      const dbApi = unicos.map((d) => {
        return Temperament.findOrCreate({
          where: {
            name: d,
          },
        });
      });
  
      let infoDbApi = await Temperament.findAll();
      res.status(200).json(infoDbApi);
    } catch (err) {
      next(err);
    }
  });
  
  router.post(`/dogs`, async (req, res, next) => {
    try {
      let {
        name,
        life_span,
        height_Min,
        height_Max,
        weight_Min,
        weight_Max,
        age,
        image,
        temperament,
        createInDb,
      } = req.body;
      const createDog = await Dog.create({
        name,
        life_span,
        height_Min,
        height_Max,
        weight_Min,
        weight_Max,
        age,
        image,
        createInDb,
      });
  
      let dogTemperament = await Temperament.findAll({
        where: {
          name: temperament,
        },
      });
      createDog.addTemperament(dogTemperament);
      res.status(200).send("Dog created successfully");
    } catch (err) {
      next(err);
    }
  });
// router.get('/dogs', async (req, res, next) => {
//     try {
//         const name = req.query.name;
//         let allDogs = await getAllDogs();
//         if (name) {
//             let dogName = await allDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
//             dogName.length ?
//                 res.status(200).send(dogName) :
//                 res.send([{
//                     name: 'Sorry, looks like we don´t have that dog breed',
//                     id: '', temperaments: 'Try using our pupper creator',
//                     image: 'https://i.pinimg.com/originals/44/80/5b/44805bfcaaa975c12c514d99c34c593a.gif'
//                 }]);
//         } else {
//             res.status(200).send(allDogs)
//         }
//     }catch(err){
//         next(err);
//     }
// });

// router.get('/dogs/:raceId', async (req, res, next) => {
//     const { raceId } = req.params;
//     const allRaces = await getAllDogs();
//     if (raceId) {
//         let race = await allRaces.filter(el => el.id == raceId);
//         race.length ? res.status(200).json(race) : res.status(404).send(`Sorry, we don´t have a race with ${raceId} as ID 🤷‍♀️`);
//     }
// })

// router.get('/temperament', async (_req, res) => {
//     let infoApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//     let tempsRepeated = infoApi.data.map(el => el.temperament).toString();
//     tempsRepeated = await tempsRepeated.split(',');
//     const tempsConEspacio = await tempsRepeated.map(el => {
//         if (el[0] == ' ') {
//             return el.split('');
//         }
//         return el;
//     });
//     const tempsSinEspacio = await tempsConEspacio.map(el => {
//         if (Array.isArray(el)) {
//             el.shift();
//             return el.join('');
//         }
//         return el;
//     })

//     await tempsSinEspacio.forEach(el => {
//         if (el != '') {
//             Temperament.findOrCreate({
//                 where: {
//                     name: el
//                 },
//             });
//         }
//     });
//     const allTemps = await Temperament.findAll();
//     res.status(200).send(allTemps);
// });

// router.post('/dogs', async (req, res) => {
//     let {
//         name,
//         heightMin,
//         heightMax,
//         weightMin,
//         weightMax,
//         life_span,
//         image,
//         temperaments,
//     } = req.body;
//     let raceCreated = await Dog.create({
//         name,
//         heightMin,
//         heightMax,
//         weightMin,
//         weightMax,
//         life_span: life_span + ' years',
//         image,
//     });
//     let temperamentDB = await Temperament.findAll({
//         where: {
//             name: temperaments,
//         }
//     });
//     raceCreated.addTemperament(temperamentDB);
//     res.status(200).send('🐕 Race created successfully 🐶')
// });

module.exports = router;
