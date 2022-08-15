import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// parse json request body
app.use(bodyParser.json());

// enable cors
app.use(cors({
  origin: "*",
  methods: "post",
  optionsSuccessStatus: 200
}));

const port = 5000;

app.listen(port, (error) => {
  if (error) { //handle error
    throw new Error(error);
  }
  console.log("Backend is running", port);
});

/*
  return back randomly generated coordinates for post api request
*/
app.get("/random_coordinates", async (req, res) => {
  try {
    console.log('fetching...');
    let coordinatesArr = [] //random coordinates array

    const count = Math.floor(Math.random() * 10) + 1; // random count

    // San Jose area boundary
    const lngMin = -122.02432392107583;
    const lngMax = -121.83392769293515;

    const latMin = 37.262021180314655;
    const latMax = 37.39323401643762;

    // generate random coordinates
    for (let i = 0; i < count; i++) {
      const lng = lngMin + (lngMax - lngMin) * Math.random();
      const lat = latMin + (latMax - latMin) * Math.random();

      coordinatesArr.push({
        longitude: lng,
        latitude: lat
      });
    }

    // return response
    res.status(200).send({ success: true, result: coordinatesArr });
  } catch (err) { // error handling
    res.status(200).send({ success: false });
    console.log(err)
    return;
  }
})