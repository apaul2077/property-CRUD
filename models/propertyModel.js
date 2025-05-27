import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true 
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  areaSqFt: {
    type: Number,
    required: true,
    min: 0
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: {
    type: [String],
    default: []
  },
  furnished: {
    type: String,
    required: true,
    enum: ['furnished', 'semi', 'unfurnished'],
    default: 'unfurnished'
  },
  availableFrom: {
    type: Date,
    required: true
  },
  listedBy: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  colorTheme: {
    type: String,
    default: '#ffffff'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  listingType: {
    type: String,
    enum: ['rent', 'sale'],
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
