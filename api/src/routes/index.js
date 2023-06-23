const { Router } = require('express'); 

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogRoute = require('./dogRoute');
const temperamentRoute = require('./temperamentRoute');

require('dotenv').config();


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRoute);
router.use('/temperaments', temperamentRoute);


module.exports = router;
