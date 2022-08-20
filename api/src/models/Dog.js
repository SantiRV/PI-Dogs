const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    /* Defining the name column in the dog table. */
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height_Max: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    height_Min: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    weight_Max: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    weight_Min: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
