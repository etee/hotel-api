const express = require("express");

const app = express();

const hotels = [
    {
        id: 1,
        name: "Orion",
        city: "Kolkata",
        area: "Park Street",
        image: "http://unsplash.com/hotel1"
    },
    {
        id: 2,
        name: "Taj",
        city: "Delhi",
        area: "Saket",
        image: "http://unsplash.com/hotel2"
    },
    {
        id: 3,
        name: "Vivanta",
        city: "Mumbai",
        area: "BKC",
        image: "http://unsplash.com/hotel3"
    }
]
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.get("/api/hotels", (req, res) => {
    res.send(hotels);
});

app.get("/api/hotels/:id", (req, res) => {
    const id = req.params.id;
    const hotel = hotels.find((hotel) => hotel.id === parseInt(id));
    if(!hotel) {
        return res.status(404).send("The hotel with given id was not found!");
    }
    res.send(hotel);
});

app.post("/api/hotels", (req,res) => {
    const newHotel = req.body;
    newHotel.id = hotels.length + 1;
    hotels.push(newHotel);
    res.send(newHotel);

})
app.listen(8080, () => {
    console.log('Server is up and running on port 8080 ....')
})