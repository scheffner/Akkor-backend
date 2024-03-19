import * as mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

interface Hotel {
  name: string;
  description: string;
  location: string;
  images: string[];
  characteristics: string[];
  rooms: object[];
  createdAt: string;
  updatedAt: string;
}

// Connect to MongoDB - add your mongo uri here
const dbURI =
  'mongodb+srv://SchefTheAdmin:h0<Amw928dazfc2324I2oy@akkordb.zdpanmj.mongodb.net/?retryWrites=true&w=majority&appName=AkkorDB';

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const hotelSchema = new mongoose.Schema<Hotel>({
  name: String,
  description: String,
  location: String,
  images: [String],
  characteristics: [Boolean],
  rooms: Object,
  createdAt: String,
  updatedAt: String,
});
const HotelModel = mongoose.model<Hotel>('Hotel', hotelSchema);

const filePath = path.join(__dirname, './hotelsDataSeeding.json');

const hotelsData: Hotel[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

async function seedHotelsData() {
  try {
    await HotelModel.deleteMany({});

    await HotelModel.insertMany(hotelsData);
    console.log('Hotel data successfully seeded.');
  } catch (error) {
    console.error('Error seeding hotel data:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedHotelsData();
