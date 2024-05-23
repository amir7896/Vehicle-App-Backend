const Category = require("../models/category");
const { STATUS_CODE, ERRORS, SUCCESS_MSG } = require("../constants");

// Create category
const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const category = new Category({
      categoryName,
    });

    const response = await category.save();

    if (response) {
      return res.status(STATUS_CODE.CREATED).json({
        success: true,
        message: SUCCESS_MSG.CATEGORY.CREATED,
        category: category,
      });
    } else {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERRORS.CATEGORY.NOT_CREATED });
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

// Get categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { _id: 1, categoryName: 1 });

    if (categories.length > 0) {
      return res
        .status(STATUS_CODE.OK)
        .json({ success: true, data: categories });
    } else {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        success: true,
        message: ERRORS.CATEGORY.NOT_FOUNDS,
        data: null,
      });
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

// Get single category
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        success: true,
        message: ERRORS.CATEGORY.NOT_EXISTS,
        data: null,
      });
    }

    return res.status(STATUS_CODE.OK).json({ success: true, data: category });
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const singleCategory = await Category.findById(id);
    if (!singleCategory) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERRORS.CATEGORY.NOT_EXISTS });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
          categoryName,
        },
        { new: true }
      );
      if (!updatedCategory) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ success: false, message: ERRORS.CATEGORY.NOT_UPDATED });
      }

      return res.status(STATUS_CODE.OK).json({
        success: true,
        message: SUCCESS_MSG.CATEGORY.UPDATED,
        department: updatedCategory,
      });
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERRORS.CATEGORY.NOT_DELETED });
    }

    return res
      .status(STATUS_CODE.OK)
      .json({ success: true, message: SUCCESS_MSG.CATEGORY.DELETED });
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
