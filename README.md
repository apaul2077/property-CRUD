# Property Management Server

This backend server handles user authentication, property CRUD operations, search/filtering, favourites, and recommendations using Express, MongoDB, JWT, and Redis.  
**Live URL**: https://property-crud.onrender.com

## Features

* JWT-based authentication
* CRUD for property listings
* Advanced filtering (price, location, size, etc.)
* Save and remove favourite properties
* Send and receive recommendations
* Redis caching for optimized performance

## Tech Stack

* Node.js
* Express
* MongoDB with Mongoose
* Redis (for caching)
* JSON Web Tokens (JWT)

## Project Structure

* `routes/` - Express route handlers
* `controllers/` - Route logic
* `models/` - Mongoose models
* `middleware/` - Auth middleware
* `config/` - DB config
* `utils/` - JWT token generation logic and redis client setup
* `scripts/` - Import CSV data to MongoDB

## Authentication Routes (`/api/auth`)

POST `/register` - Register a new user  
POST `/login` - Login and receive a JWT  
GET `/logout` - Logout and clear cookies  

## Property Routes (`/api/property`)

GET `/` - Get all properties  
POST `/` - Create a new property (requires auth)  
GET `/:id` - Get property by its ID  
PUT `/:id` - Update property by ID (requires auth)  
DELETE `/:id` - Delete property by ID (requires auth)  

## Filter Routes (`/api/filter`)

GET `/` - Filter properties using query parameters like:

* title
* type  
* priceMin
* priceMax  
* areaMin
* areaMax  
* state
* city  
* bedrooms
* bathrooms  
* furnished
* availableFrom  
* amenities
* tags  
* isVerified
* listingType
* listedBy  

## Favourites Routes (`/api/favourites`)

GET `/` - Get all favourite properties (requires auth)  
POST `/` - Add a property to favourites (requires auth)  
DELETE `/:propId` - Remove property from favourites (requires auth)  

## Recommendation Routes (`/api/recommendations`)

POST `/` - Send a property recommendation (requires auth)  
GET `/received` - View received recommendations (requires auth)  
GET `/sent` - View sent recommendations (requires auth)  

## Owner, Builder, Agent credentials
To edit fields which have been listed by Owner, Builder, and Agent you have login with following. If a property has been uploaded by you then only you can edit that property.  
**Owner**
```
{
    "username": "owner",
    "password": "1234"
}
```
**Builder**
```
{
    "username": "builder",
    "password": "1234"
}
```
**Agent**
```
{
    "username": "agent",
    "password": "1234"
}
```

## Caching

Frequently accessed routes like `/api/property`, `/api/property/:id`, and `/api/filter` use Redis to cache responses for improved performance. Cache keys are generated based on query parameters or IDs, and cache is automatically invalidated on create, update, or delete.

## Authentication

All protected routes use the `verifyToken` middleware to check for valid JWT in cookies. If not authenticated, access is denied.

## Example API Calls to all routes

**Base URL:** `https://property-crud.onrender.com`

### Authentication

**Register User**

```
POST https://property-crud.onrender.com/api/auth/register
Body (JSON):
{
  "username": "johndoe",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login User**

```
POST https://property-crud.onrender.com/api/auth/login
Body (JSON):
{
  "username": "johndoe",
  "password": "password123"
}
```

**Logout User**

```
GET https://property-crud.onrender.com/api/auth/logout
```

### Properties

**Get All Properties**

```
GET https://property-crud.onrender.com/api/property
```

**Create New Property**

```
POST https://property-crud.onrender.com/api/property
Headers:
  Authorization: Bearer <token>
Body (JSON):
{
  "title": "Green Villa",
  "type": "villa",
  "price": 250000,
  "state": "Karnataka",
  "city": "Mysore",
  "areaSqFt": 1500,
  "bedrooms": 3,
  "bathrooms": 2,
  "amenities": ["pool", "gym"],
  "furnished": "Unfurnished",
  "availableFrom": "2025-10-01",
  "tags": ["gated-community", "garden"],
  "colorTheme": "#6ab45e",
  "rating": 4.5,
  "isVerified": true,
  "listingType": "sale"
}
```

**Get Property by ID**

```
GET https://property-crud.onrender.com/api/property/PROP1001
```

**Update Property by ID**

```
PUT https://property-crud.onrender.com/api/property/<your-property-ID>
Headers:
  Authorization: Bearer <token>
Body (JSON):
{
  "price": 260000,
  "rating": 4.7
}
```

**Delete Property by ID**

```
DELETE https://property-crud.onrender.com/api/property/<your-property-ID>
Headers:
  Authorization: Bearer <token>
```

### Filtering

**Filter Properties**

```
GET https://property-crud.onrender.com/api/filter?city=New Delhi&priceMax=30000000&bedrooms=2&amenities=pool&amenities=gym
```

### Favourites

**Get All Favourites**

```
GET https://property-crud.onrender.com/api/favourites
Headers:
  Authorization: Bearer <token>
```

**Add to Favourites**

```
POST https://property-crud.onrender.com/api/favourites
Headers:
  Authorization: Bearer <token>
Body (JSON):
{
  "propertyId": "PROP1001"
}
```

**Remove from Favourites**

```
DELETE https://property-crud.onrender.com/api/favourites/PROP1001
Headers:
  Authorization: Bearer <token>
```

### Recommendations

**Send Recommendation**

```
POST https://property-crud.onrender.com/api/recommendations
Headers:
  Authorization: Bearer <token>
Body (JSON):
{
  "toUsername": "agent007",
  "propertyId": "PROP1001"
}
```

**Get Received Recommendations**

```
GET https://property-crud.onrender.com/api/recommendations/received
Headers:
  Authorization: Bearer <token>
```

**Get Sent Recommendations**

```
GET https://property-crud.onrender.com/api/recommendations/sent
Headers:
  Authorization: Bearer <token>
```
---
