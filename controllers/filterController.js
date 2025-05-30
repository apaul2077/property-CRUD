import asyncHandler from 'express-async-handler';
import Property from '../models/propertyModel.js';

const filterProperties = asyncHandler(async (req, res) => {
  const {
    title,
    type,
    priceMin,
    priceMax,
    areaMin,
    areaMax,
    state,
    city,
    bedrooms,
    bathrooms,
    furnished,
    availableFrom,
    amenities,
    tags,
    isVerified,
    listingType,
    listedBy
  } = req.query;

  const query = {};

  if (title) query.title = { $regex: title, $options: 'i' };
  if (type) query.type = type;
  if (state) query.state = state;
  if (city) query.city = city;
  if (bedrooms) query.bedrooms = Number(bedrooms);
  if (bathrooms) query.bathrooms = Number(bathrooms);
  if (furnished) query.furnished = furnished;
  if (availableFrom) query.availableFrom = { $gte: new Date(availableFrom) };
  if (isVerified !== undefined) query.isVerified = isVerified === 'true';
  if (listingType) query.listingType = listingType;
  if (listedBy) query.listedBy = listedBy;

  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = Number(priceMin);
    if (priceMax) query.price.$lte = Number(priceMax);
  }

  if (areaMin || areaMax) {
    query.areaSqFt = {};
    if (areaMin) query.areaSqFt.$gte = Number(areaMin);
    if (areaMax) query.areaSqFt.$lte = Number(areaMax);
  }

  if (amenities) {
    const amenitiesArray = Array.isArray(amenities) ? amenities : amenities.split(',');
    query.amenities = { $all: amenitiesArray };
  }

  if (tags) {
    const tagsArray = Array.isArray(tags) ? tags : tags.split(',');
    query.tags = { $all: tagsArray };
  }

  const properties = await Property.find(query);
  res.json(properties);
});

export default filterProperties;
