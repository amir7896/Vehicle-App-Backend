const Vehicle = require("../models/vehicle");
const {
  STATUS_CODE,
  SUCCESS_MSG,
  ERRORS,
  BUCKET_NAMES,
} = require("../constants");
const { uploadImage, getImage, deleteImage } = require("../services/s3/index");

// Get total number of vehicles
const getTotalVehicles = async (req, res) => {
  try {
    const count = await Vehicle.countDocuments();

    return res.status(200).json({
      success: true,
      data: count,
    });
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};
// Create vehicle
const createVehicle = async (req, res) => {
  const { color, model, make, registrationNo, category } = req.body;

  let image;
  if (req.file) {
    image = await uploadImage(req.file, BUCKET_NAMES.vehicles);
  } else {
    image = null;
  }
  try {
    const vehicle = new Vehicle({
      color,
      model,
      make,
      registrationNo,
      category,
      image,
    });

    const response = await vehicle.save();
    if (response) {
      return res.status(STATUS_CODE.CREATED).json({
        success: true,
        message: SUCCESS_MSG.VEHICLE.CREATED,
        vehicle: vehicle,
      });
    } else {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERRORS.VEHICLE.NOT_CREATED });
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

// Get vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}).populate(
      "category",
      "categoryName"
    );

    if (vehicles.length > 0) {
      for (const vehicle of vehicles) {
        if (vehicle.image) {
          const imageURL = await getImage(vehicle.image);
          vehicle.image = imageURL;
        }
      }

      return res.status(STATUS_CODE.OK).json({ success: true, data: vehicles });
    } else {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        success: true,
        message: ERRORS.VEHICLE.NOT_FOUNDS,
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

// Get single vehicle
const getSingleVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        success: true,
        message: ERRORS.VEHICLE.NOT_EXISTS,
        data: null,
      });
    }

    return res.status(STATUS_CODE.OK).json({ success: true, data: vehicle });
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

// Update vehicle
const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { color, model, make, registrationNo, category } = req.body;

    const singleVehicle = await Vehicle.findById(id);
    if (!singleVehicle) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERRORS.VEHICLE.NOT_EXISTS });
    } else {
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        id,
        {
          color,
          model,
          make,
          registrationNo,
          category,
        },
        { new: true }
      );
      if (!updatedVehicle) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ success: false, message: ERRORS.VEHICLE.NOT_UPDATED });
      }

      return res.status(STATUS_CODE.OK).json({
        success: true,
        message: SUCCESS_MSG.VEHICLE.UPDATED,
        department: updatedVehicle,
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

// Delete vehicle
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERRORS.VEHICLE.NOT_FOUNDS });
    } else {
      if (vehicle.image) {
        await deleteImage(vehicle.image);
      }
      const deletedVehicle = await Vehicle.findByIdAndDelete(id);

      if (!deletedVehicle) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ success: false, message: ERRORS.VEHICLE.NOT_DELETED });
      }

      return res
        .status(STATUS_CODE.OK)
        .json({ success: true, message: SUCCESS_MSG.VEHICLE.DELETED });
    }
  } catch (error) {
    console.log("Delete error:", error);
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  getTotalVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
