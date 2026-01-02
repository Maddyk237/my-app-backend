const Package = require("../models/Package");

// GET all packages
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch {
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};

// POST add new package (protected)
const addPackage = async (req, res) => {
  try {
    const { title, location, description, price, imageUrl } = req.body;

    if (!title || !location || !description || !price || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPackage = await Package.create({
      title,
      location,
      description,
      price,
      imageUrl,
    });

    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: "Failed to add package" });
  }
};

const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Update fields
    pkg.title = req.body.title || pkg.title;
    pkg.location = req.body.location || pkg.location;
    pkg.description = req.body.description || pkg.description;
    pkg.price = req.body.price || pkg.price;
    pkg.imageUrl = req.body.imageUrl || pkg.imageUrl;

    const updatedPackage = await pkg.save();

    res.json({
      message: "Package updated successfully ✅",
      updatedPackage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    await pkg.deleteOne();

    res.json({ message: "Package deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPackages,
  addPackage,
  updatePackage,
  getPackageById,
  deletePackage,
};
