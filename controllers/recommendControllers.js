import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';
import Property from '../models/propertyModel.js';


export const sendRecommendation = asyncHandler(async (req, res) => {
  const { toUsername, propertyId } = req.body;
  const fromUser = await userModel.findById(req.user._id);
  if (!fromUser) {
    res.status(404);
    throw new Error('Sender not found');
  }

  const toUser = await userModel.findOne({ username: toUsername });
  if (!toUser) {
    res.status(404);
    throw new Error('Recipient user not found');
  }

  const property = await Property.findOne({ id: propertyId });
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  const alreadySent = fromUser.recommendationsSent.some(
    r => r.property === propertyId && r.to === toUsername
  );
  if (alreadySent) {
    return res.status(400).json({ message: 'Already recommended this property to that user' });
  }

  fromUser.recommendationsSent.push({
    property: propertyId,
    to: toUsername,
    sentAt: new Date()
  });
  await fromUser.save();

  toUser.recommendationsReceived.push({
    property: propertyId,
    from: fromUser.username,    
    sentAt: new Date()
  });
  await toUser.save();

  res.status(201).json({ message: 'Recommendation sent successfully' });
});

export const getReceivedRecommendations = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const detailed = await Promise.all(
    user.recommendationsReceived.map(async (rec) => {
      const prop = await Property.findOne({ id: rec.property });
      return {
        property: prop,
        fromUsername: rec.from,
        sentAt: rec.sentAt
      };
    })
  );

  res.json(detailed);
});

export const getSentRecommendations = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const detailed = await Promise.all(
    user.recommendationsSent.map(async (rec) => {
      const prop = await Property.findOne({ id: rec.property });
      return {
        property: prop,
        toUsername: rec.to,
        sentAt: rec.sentAt
      };
    })
  );

  res.json(detailed);
});
