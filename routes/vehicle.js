const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicle");
const {
  validVehicle,
} = require("../middlewares/validations/vehicleValidation");
const isAuthenticate = require("../middlewares/authentication/isAuthenticate");

router.get("/list", isAuthenticate, getVehicles);
router.get("/:id", isAuthenticate, getSingleVehicle);
router.post("/create", isAuthenticate, validVehicle, createVehicle);
router.put("/update/:id", isAuthenticate, validVehicle, updateVehicle);
router.delete("/delete/:id", isAuthenticate, deleteVehicle);

module.exports = router;
