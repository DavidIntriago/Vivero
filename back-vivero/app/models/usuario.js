"use strict";

module.exports = (sequelize, DataTypes) => {
    const usuario = sequelize.define('usuario',{
        nombres: {type: DataTypes.STRING(150), defaultValue:"NONE"},
        apellidos: {type: DataTypes.STRING(150), defaultValue:"NONE"},
        external_id:{type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4}
    }, { timestamps: false, freezeTableName: true });
        usuario.associate = function(models){
        usuario.hasOne(models.cuenta, {foreignKey: 'id_usuario', as: 'cuenta'});
        usuario.belongsTo(models.rol, {foreignKey: 'id_rol'});
    };
    return usuario;
};