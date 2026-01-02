const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { packageId, travelDate, travellers } = req.body;

    if (!travellers || travellers.length === 0) {
      return res.status(400).json({ message: "Traveller details required" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      package: packageId,
      travelDate,
      travellers,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
};
const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("package")
    .populate("user", "name email");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  res.json(booking);
};

const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("package")
    .sort({ createdAt: -1 });

  res.json(bookings);
};
const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("package", "title location price")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getUserBookings,
  getAllBookingsAdmin,
};
