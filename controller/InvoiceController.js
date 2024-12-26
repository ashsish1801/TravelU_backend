const express = require("express");
const mongoose = require('../config/mongoose');
const User = require('../model/user');
const Tourism = require('../model/Tourism');

module.exports.invoice = async function (req, res) {
  const { tourId, userId } = req.params; // Extract IDs from route parameters
  console.log("Tour ID:", tourId, "User ID:", userId);

  try {
    // Fetch tourism data using tourId
    const tourismData = await Tourism.findById(tourId);

    if (!tourismData) {
      return res.status(404).json({ message: "Tourism data not found." });
    }

    // Optionally, fetch user data using userId (if required)
    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User data not found." });
    }

    // Respond with both tourism and user data
    res.status(200).json({
      message: "Data fetched successfully.",
    //   tourism: tourismData,
    //   user: userData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
};
