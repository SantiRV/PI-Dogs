const {Dog, Temperament} = require('../db'); 

/*  funcion que retorna la informacion de la tabla Dog incluyendo la tabla temperament  */

const getDbInfo = async () => {
    return await Dog.findAll({
      include: {
        model: Temperament,
        attribute: {
          include: ["name"],
        },
        through: {
          attribute: [],
        },
      },
    });
  };

module.exports = {
    getDbInfo,
}