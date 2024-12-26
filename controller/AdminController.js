const express = require('express')
const mongooose = require('mongoose')
const tourSchema = require('../model/Tourism')
const path = require('path')

module.exports.TourData = async function (req,res) {
  const tours = await tourSchema.find();
  res.status(200).json({ tours});
}


module.exports.TourismUpload = async function (req, res) {
    // Use the Multer middleware to handle file uploads
    tourSchema.uploadAvatar(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: 'File upload failed', error: err.message });
      }
  
      // Extract form fields and uploaded file information
      const { title, description, duration, price, rating, reviews } = req.body;
      // const image = req.file ? tourSchema.avatarPath + "/" + req.file.filename : null; 
      // const image = req.file ? req.file.filename : null;
      const image = req.file
      ? path.join(tourSchema.avatarPath, req.file.filename).replace(/\\/g, '/')
      : null;
      
      console.log(image);
  
      try {
        // Validate if the required fields are provided
        if (!title || !description || !duration || !price) {
          return res.status(400).json({ message: 'Required fields are missing' });
        }
  
        // Create a new tour document
        const newTour = new tourSchema({
          title,
          description,
          image,
          duration,
          price,
          rating: rating || null, // Optional fields
          reviews: reviews || null, // Optional fields
        });
  
        // Save to the database
        await newTour.save();
  
        // Respond with success
        res.status(200).json({ message: 'Tour created successfully', tour: newTour });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
      }
    });
  };