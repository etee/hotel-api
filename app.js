require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected with MONGODB");
});

const Hotel = require("./models/hotel.js");
const app = express();

app.use(express.json());



app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.get("/api/hotels", async(req, res) => {
    const hotels = await Hotel.find();
    res.send(hotels);
});

app.get("/api/hotels/:id", async(req, res) => {
    const id = req.params.id;
    const hotel = await Hotel.findById(id);
    if(!hotel) {
        return res.status(404).send("The hotel with given id was not found!");
    }
    res.send(hotel);
});

app.post("/api/hotels", async(req,res) => {
    const hotel = req.body;
    const dbHotel = await Hotel.create(hotel);
    res.send(dbHotel);

});

app.delete("/api/hotels/:id", async(req, res) => {
    const id = req.params.id;
    const deleteHotel = await Hotel.findByIdAndDelete(id);
    res.send(deleteHotel);
})
app.listen(8080, () => {
    console.log('Server is up and running on port 8080 ....')
})