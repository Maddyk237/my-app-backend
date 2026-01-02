const express = require("express");
const router = express.Router();
const {
  getPackages,
  addPackage,
  updatePackage,
  getPackageById,
  deletePackage,
} = require("../controllers/packageController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/authMiddleware");

router.get("/", getPackages);
router.post("/", protect, adminOnly, addPackage);
router.get("/:id", protect, adminOnly, getPackageById);
router.put("/:id", protect, adminOnly, updatePackage);
router.delete("/:id", protect, adminOnly, deletePackage);
module.exports = router;
