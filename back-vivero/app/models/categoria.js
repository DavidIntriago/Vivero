'use strict';

module.exports = (sequelize, DataTypes) => {
  const categoria = sequelize.define('categoria', {
    nombre: { type: DataTypes.STRING(150), defaultValue: "NONE" },
    tipo: { type: DataTypes.STRING(150), defaultValue: "NONE" },
    tamanio: { type: DataTypes.STRING(30), defaultValue: "NONE" },
    foto:{ type: DataTypes.STRING, defaultValue: "NONE" },
    external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 }
  }, { timestamps: false, freezeTableName: true });

  categoria.associate = function (models) {
    categoria.hasMany(models.planta, { foreignKey: 'id_categoria', as: 'categoria' });
  };

  return categoria;
};
