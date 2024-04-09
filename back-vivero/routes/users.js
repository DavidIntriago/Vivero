var express = require("express");
var router = express.Router();

let jwt = require("jsonwebtoken");

const rol = require("../app/controllers/RolControl");
let rolControl = new rol();

const cuenta = require("../app/controllers/CuentaControl");
let CuentaControl = new cuenta();

const categoria = require("../app/controllers/CategoriaControl");
let CategoriaControl = new categoria();

const planta = require("../app/controllers/PlantaControl");
let PlantaControl = new planta();
1;
const auth = function middleware(req, res, next) {
  const token = req.headers["token-key"];

  console.log(req.headers);

  if (token === undefined) {
    res.status(401);
    res.json({
      msg: "ERROR",
      tag: "Falta token",
      code: 401,
    });
  } else {
    require("dotenv").config();
    const key = process.env.KEY;
    jwt.verify(token, key, async (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({
          msg: "ERROR",
          tag: "Token no valido o expirado",
          code: 401,
        });
      } else {
        console.log(decoded);
        req.id = decoded.external;
        console.log("aquio");
        console.log(req.id);
        const models = require("../app/models");
        const cuenta = models.cuenta;
        const aux = await cuenta.findOne({
          where: { external_id: decoded.external },
        });
        if (aux === null) {
          res.status(401);
          res.json({
            msg: "ERROR",
            tag: "Token no valido",
            code: 401,
          });
        } else {
          next();
        }
      }
    });
  }
  // console.log(req.url);
  // console.log(token);
  // next();
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/admin/rol", rolControl.listar);
router.post("/admin/rol/save", rolControl.crear);

router.post("/inicio_sesion", CuentaControl.inicio_sesion);

router.get("/admin/categoria", CategoriaControl.listar);
router.post("/admin/categoria/guardar", CategoriaControl.crear);
router.post("/admin/categoria/imagen/:external", CategoriaControl.guardarFotoC);
router.put("/admin/categoria/modificar/:external", CategoriaControl.modificar);
router.delete("/admin/categoria/eliminar/:external", CategoriaControl.eliminar);




router.get("/admin/planta", PlantaControl.listar);
router.get("/admin/plantas/", PlantaControl.listarPaginada);
router.get("/admin/planta/categoria/:external", PlantaControl.listarCategoria);
router.get("/admin/planta/external/:external", PlantaControl.obtener);
router.post("/admin/planta/guardar", PlantaControl.crear);
router.post("/admin/planta/imagen/:external", PlantaControl.guardarFoto);
router.put("/admin/planta/modificar/:external", PlantaControl.modificar);




module.exports = router;
