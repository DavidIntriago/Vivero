"use strict";


var models = require("../models");
var categoria = models.categoria;
var planta=models.planta;
var formidable = require("formidable");
var fs = require("fs");
var extensiones = ["jpg", "png", "jpeg"];
const tamanioMax = 2 * 1024 * 1024;

class CategoriaControl {
  async listar(req, res) {
    var lista = await planta.findAll({
      attributes: ["nombre", "alias", "tamanio", "descripcion","foto", "external_id"],
      include: [
        {
          model: categoria,
          as: "categoria",
          attributes: ["nombre", "external_id"],
        },
      ],
    });
    res.status(200);
    res.json({
      msg: "OK",
      code: 200,
      data: lista,
    });
  }

  async listarPaginada(req, res) {
    const { page = 0, size = 5 } = req.query;
    const limit = +size;
    const offset = (+page) * (+size);
  
    try {
      const lista = await planta.findAndCountAll({
        limit,
        offset,
        attributes: ["id", "nombre", "alias", "foto", "external_id"],
        include: [
          {
            model: categoria,
            as: "categoria",
            attributes: ["nombre", "external_id"],
          },
        ],
      });
  
      res.status(200).json({
        msg: "OK",
        code: 200,
        data: lista,
      });
    } catch (error) {
      console.error('Error al obtener la lista paginada:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  


  async obtener(req, res) {
    var external=req.params.external
    var lista = await planta.findOne({
      attributes: ["nombre", "alias", "tamanio", "descripcion","foto", "external_id"],
      include: [
        {
          model: categoria,
          as: "categoria",
          attributes: ["nombre", "external_id"],
        },
      ],
      where: {external_id: external}
    });
    res.status(200);
    res.json({
      msg: "OK",
      code: 200,
      data: lista,
    });
  }

  async listarCategoria(req, res) {
    var categoria_id=req.params.external
    var lista = await planta.findAll({
      attributes: ["nombre", "alias","foto", "external_id"],
      include: [
        {
          model: categoria,
          as: "categoria",
          attributes: ["nombre", "external_id"],
        },
      ],
      where: {id_categoria: categoria_id}
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
    // Lista de campos permitidos
    const camposPermitidos = ["nombre", "alias", "tamanio", "descripcion", "id_categoria"];

    // Verificar que solo se envíen campos permitidos
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
      var result = await planta.create({
        nombre: req.body.nombre,
        alias: req.body.alias,
        tamanio: req.body.tamanio,
        descripcion: req.body.descripcion,
        id_categoria: req.body.id_categoria,
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
    
    var lista = await planta.findOne({
      where: { external_id: external },
    });

    lista.nombre = req.body.nombre || lista.nombre;
    lista.alias = req.body.alias || lista.alias;
    lista.descripcion = req.body.descripcion || lista.descripcion;
    lista.tamanio = req.body.tamanio || lista.tamanio;

    await lista.save();

    res.status(200);
    res.json({
      msg: "OK",
      code: 200,
      data: lista, 
    });
  }

  async  eliminar(req, res) {
    const external = req.params.external;
    
    try {
        const plantaExistente = await planta.findOne({
            where: { external_id: external }
        });

        if (!plantaExistente) {
            return res.status(404).json({ 
                msg: "La planta no existe", 
                code: 404 
            });
        }

        const plantaEliminada = await planta.destroy({
            where: { external_id: external }
        });

        if (plantaEliminada === 0) {
            return res.status(400).json({
                msg: "No se pudo eliminar la planta",
                code: 400
            });
        }

        res.status(200).json({
            msg: "Planta eliminada correctamente",
            code: 200
        });
    } catch (error) {
        console.error("Error al intentar eliminar la planta:", error);
        res.status(500).json({
            msg: "Error interno del servidor",
            code: 500
        });
    }
}


  async guardarFoto(req, res) {
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
        fs.rename(file.filepath, "public/images/planta" + name, async function (err) {
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
      await planta.update(
        { foto: variasFoto },
        { where: { external_id: externalAuto } }
      );

      res.status(200);
      res.json({ msg: "OK", tag: "Imágenes guardadas", code: 200 });
    });
  }
}
module.exports = CategoriaControl;
