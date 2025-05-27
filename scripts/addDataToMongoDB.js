import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Property from '../models/propertyModel.js'

const MONGO_URI = 'mongodb+srv://apaul42:4cVZZu9VogE8KUvP@testclsuter.659h6.mongodb.net/property-CRUD';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const results = [];

fs.createReadStream('properties_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    try {
      results.push({
        id: row.id,
        title: row.title,
        type: row.type,
        price: Number(row.price),
        state: row.state,
        city: row.city,
        areaSqFt: Number(row.areaSqFt),
        bedrooms: Number(row.bedrooms),
        bathrooms: Number(row.bathrooms),
        amenities: row.amenities.split('|'),
        furnished: row.furnished,
        availableFrom: new Date(row.availableFrom),
        listedBy: row.listedBy,
        tags: row.tags.split('|'),
        colorTheme: row.colorTheme,
        rating: Number(row.rating),
        isVerified: row.isVerified.toLowerCase() === 'true',
        listingType: row.listingType
      });
    } catch (err) {
      console.error(err);
    }
  })
  .on('end', async () => {
    try {
      await Property.insertMany(results);
      console.log(`done`);
      mongoose.connection.close();
    } catch (err) {
      console.error(err);
    }
  });
