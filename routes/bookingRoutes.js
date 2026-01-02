const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookingById,
  getUserBookings,
  getAllBookingsAdmin,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createBooking);
router.get("/:id", protect, getBookingById);
router.get("/user/me", protect, getUserBookings);
router.get("/admin/all", protect, getAllBookingsAdmin);

module.exports = router;
