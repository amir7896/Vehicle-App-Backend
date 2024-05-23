const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const {
  validCategory,
} = require("../middlewares/validations/categoryValidation");

const isAuthenticate = require("../middlewares/authentication/isAuthenticate");

router.get("/list", isAuthenticate, getCategories);
router.get("/:id", isAuthenticate, getSingleCategory);
router.post("/create", isAuthenticate, validCategory, createCategory);
router.put("/update/:id", isAuthenticate, validCategory, updateCategory);
router.delete("/delete/:id", isAuthenticate, deleteCategory);

module.exports = router;
