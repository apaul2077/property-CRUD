import asyncHandler from 'express-async-handler';
import Property from '../models/propertyModel.js';
import redisClient from '../utils/redisClient.js';

const extractNumericId = (propId) => parseInt(propId.replace('PROP', ''), 10);

export const createProperty = asyncHandler(async (req, res) => {
    const { title, type, price, state, city, areaSqFt, bedrooms, bathrooms, amenities, furnished, availableFrom, tags, colorTheme, rating, isVerified, listingType } = req.body;

    const lastProperty = await Property
        .find({})
        .sort({ id: -1 })
        .limit(1);

    let newIdNumber = 1001;
    if (lastProperty.length > 0) {
        const lastId = lastProperty[0].id;
        newIdNumber = extractNumericId(lastId) + 1;
    }

    const newId = `PROP${newIdNumber}`;
    const newProperty = await Property.create({
        id: newId,
        title,
        type,
        price,
        state,
        city,
        areaSqFt,
        bedrooms,
        bathrooms,
        amenities,
        furnished: furnished,
        availableFrom,
        listedBy: req.user.username,
        tags,
        colorTheme,
        rating,
        isVerified,
        listingType
    });

    res.status(201).json(newProperty);
});

export const updateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findOne({ id: req.params.id });
    const user = req.user;

    if (!property) {
        res.status(404);
        throw new Error('Property not found');
    }

    if (user.username !== property.listedBy) {
        res.status(403);
        throw new Error('Not authorized to update this property');
    }

    Object.assign(property, req.body);
    const updatedProperty = await property.save();
    res.json(updatedProperty);
});

export const deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findOne({ id: req.params.id });
    const user = req.user;

    if (!property) {
        res.status(404);
        throw new Error('Property not found');
    }

    if (user.username !== property.listedBy) {
        res.status(403);
        throw new Error('Not authorized to delete this property');
    }

    await property.deleteOne();
    res.json({ message: 'Property deleted' });
});

export const getAllProperties = asyncHandler(async (req, res) => {
    const cacheKey = 'properties:all';
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const properties = await Property.find({});

    await redisClient.set(cacheKey, JSON.stringify(properties), { EX: 1800 });
    res.json(properties);
});


export const getPropertyById = asyncHandler(async (req, res) => {
    const cacheKey = `property:${propId}`;                              
    const cached = await redisClient.get(cacheKey);                     
    if (cached) return res.json(JSON.parse(cached));

    const property = await Property.findOne({ id: req.params.id });
    if (!property) {
        res.status(404);
        throw new Error('Property not found');
    }
    await redisClient.set(cacheKey, JSON.stringify(property), { EX: 1800 });

    res.json(property);
});
