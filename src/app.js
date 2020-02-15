const express = require("express");
const path = require("path");
const hbs = require("hbs"); //hbs needs to be required only for using partials(templating)

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//defines path for express config
const publicDirectoryPath = path.join(__dirname, "../public");

//views are by default accessed from views directory, but if you want to alter that then we need to set the directory
const viewsDirectory = path.join(__dirname, "../templates/views");

//path for partials
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebar engine
app.set("view engine", "hbs");
//set the new path to access views if the path name is something other than views
app.set("views", viewsDirectory);
//set partials path
hbs.registerPartials(partialsPath);

//setup static directory to server (only if no special view engine is being used)
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Varchasvi"
  }); //render file made using view engine
  //name of the file as string. second argument is optional and is used to inject data to the hbs page so that it can make use of those values
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "Search something dude!"
    });

  //send address to geocode
  geocode(
    req.query.address,
    (error, { location, latitude, longitude } = {}) => {
      if (error) return res.send({ error });
      //send latitude and longitude to the forecast
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });
        //send response
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Section",
    name: "Jordan"
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({ error: "You must provide a search term" });
  res.send({
    products: []
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Area",
    name: "Jordan"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "HELP",
    msg: "HELP ARTICLE NOT FOUND",
    name: "Var"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 ERROR",
    msg: "PAGE NOT FOUND",
    name: "Var"
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
