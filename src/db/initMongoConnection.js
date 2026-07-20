import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error while setting up Mongo connection:', error);
    throw error;
  }
};