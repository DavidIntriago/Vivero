
'use strict';

module.exports = (sequelize, DataTypes) => {
  const planta = sequelize.define('planta', {
    nombre: {type: DataTypes.STRING(150), defaultValue:"NONE"},
    alias: {type: DataTypes.STRING(150), defaultValue:"NONE"},
    tamanio: {type: DataTypes.STRING(30), defaultValue:"NONE"},
    descripcion: {type: DataTypes.TEXT('long'), defaultValue:"NONE"},
    foto:{type: DataTypes.STRING, defaultValue: "sin_foto.jpg"},
    external_id:{type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4}
  }, { timestamps: false, freezeTableName: true });

  planta.associate = function (models) {
    planta.belongsTo(models.categoria, { foreignKey: 'id_categoria', as: 'categoria' });
  };

  return planta;
};
