const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sharan Reddy"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page [handleBars]",
    name: "Sharan Reddy"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpMessage: "lorem ipsum",
    name: "Sharan Reddy"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide location in the input area"
    });
  }
  geocode(req.query.address, (error, { logitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error
      });
    } else {
      forecast(logitude, latitude, (error, locationResponse) => {
        if (error) {
          return res.send({
            error: error
          });
        } else {
          return res.send({
            forecast: locationResponse,
            location, //short hand syntax
            address: req.query.address
          });
        }
      });
    }
  });
  // res.send({
  //   forecast: "weather Info",
  //   location: "Perth",
  //   address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    return res.send({
      error: "Please provide search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 not found",
    errorMessage: "Help article not found",
    name: "Sharan Reddy"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 not found",
    errorMessage: "Page not found.",
    name: "Sharan Reddy"
  });
});

app.listen(port, () => {
  console.log("Server is up and running at port " + port);
});
