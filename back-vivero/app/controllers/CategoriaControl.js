"use strict";

var models = require("../models");
var categoria = models.categoria;
var planta = models.planta;
var formidable = require("formidable");
var fs = require("fs");
var extensiones = ["jpg", "png", "jpeg"];
const tamanioMax = 2 * 1024 * 1024;


class CategoriaControl {
  async listar(req, res) {
    var lista = await categoria.findAll({
      attributes: ["id","nombre", "tipo", "tamanio", "external_id", "foto"],
    });
    res.status(200);
    res.json({
      msg: "OK",
      code: 200,
      data: lista,
    });
  }


  async crear(req, res) {
    var UUID = require("uuid");
    const camposPermitidos = ["nombre", "tipo", "tamanio"];
    const camposEnviados = Object.keys(req.body);
    const camposInvalidos = camposEnviados.filter(
      (campo) => !camposPermitidos.includes(campo)
    );

    if (
      camposInvalidos.length > 0 ||
      !camposPermitidos.every((campo) => camposEnviados.includes(campo))
    ) {
      res.status(400);
      res.json({
        msg: "ERROR",
        tag: "Campos no permitidos o incompletos",
        code: 400,
      });
      return;
    } else {
      var result = await categoria.create({
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        tamanio: req.body.tamanio,
        external_id: UUID.v4(),
      });
      
      res.status(200);
      res.json({
        msg: "OK",
        code: 200,
        data: result,
      });
    }
  }

  async modificar(req, res) {
    const external = req.params.external;
    
    var lista = await categoria.findOne({
      where: { external_id: external },
    });

    lista.nombre = req.body.nombre || lista.nombre;
    lista.tipo = req.body.tipo || lista.tipo;
    lista.tamanio = req.body.tamanio || lista.tamanio;

    await lista.save();

    res.status(200);
    res.json({
      msg: "OK",
      code: 200,
      data: lista, 
    });
  }

  async eliminar(req, res) {
    const external = req.params.external;
    
    var lista = await categoria.findOne({
      where: { external_id: external },
    });

    var plantas = await planta.destroy({
      where: { id_categoria: lista.id },
    });

    await lista.destroy();

    res.status(200);
    res.json({
      msg: "OK",
      code: 200,
    });
  }

  async guardarFotoC(req, res) {
    const externalAuto = req.params.external;
    var form = new formidable.IncomingForm(),
      files = [];

    form
      .on("file", function (field, file) {
        files.push(file);
      })
      .on("end", function () {
        console.log("OK");
      });

    form.parse(req, async function (err, fields) {
      let listado = files;
      let external = fields.external[0];
      let fotos = [];

      for (let index = 0; index < listado.length; index++) {
        var file = listado[index];
        var extension = file.originalFilename.split(".").pop().toLowerCase();

        if (file.size > tamanioMax) {
          res.status(400);
          return res.json({
            msg: "ERROR",
            tag: "El tamaño del archivo supera los 2MB ",
            code: 400,
          });
        }

        if (!extensiones.includes(extension)) {
          res.status(400);
          return res.json({
            msg: "ERROR",
            tag: "Solo soporta " + extensiones,
            code: 400,
          });
        }

        const name = external + "_" + index + "." + extension;
        fotos.push(name);
        fs.rename(file.filepath, "public/images/categoria" + name, async function (err) {
          if (err) {
            res.status(400);
            console.log(err);
            return res.json({
              msg: "Error",
              tag: "No se pudo guardar el archivo",
              code: 400,
            });
          }
        });
      }

      const variasFoto = fotos.join(",");
      await categoria.update(
        { foto: variasFoto },
        { where: { external_id: externalAuto } }
      );

      res.status(200);
      res.json({ msg: "OK", tag: "Imágenes guardadas", code: 200 });
    });
  }
}
module.exports = CategoriaControl;
