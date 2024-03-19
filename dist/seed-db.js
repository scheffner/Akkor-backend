"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dbURI = 'mongodb+srv://SchefTheAdmin:h0<Amw928dazfc2324I2oy@akkordb.zdpanmj.mongodb.net/?retryWrites=true&w=majority&appName=AkkorDB';
mongoose
    .connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
const hotelSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    images: [String],
    characteristics: [Boolean],
    rooms: Object,
    createdAt: String,
    updatedAt: String,
});
const HotelModel = mongoose.model('Hotel', hotelSchema);
const filePath = path.join(__dirname, './hotelsDataSeeding.json');
const hotelsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
async function seedHotelsData() {
    try {
        await HotelModel.deleteMany({});
        await HotelModel.insertMany(hotelsData);
        console.log('Hotel data successfully seeded.');
    }
    catch (error) {
        console.error('Error seeding hotel data:', error);
    }
    finally {
        mongoose.connection.close();
    }
}
seedHotelsData();
//# sourceMappingURL=seed-db.js.map