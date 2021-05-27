const Homes = require("../models/home");
const fetch = require("node-fetch");
const { cloudinary } = require("../cloudinary");
const NodeGeocoder = require("node-geocoder");
const geocoder = NodeGeocoder({
  provider: "opencage",
  apiKey: process.env.OPEN_CAGE,
});

module.exports = {
  async getHomes(req, res, next) {
    const homes = await Homes.find({});
    res.render("homes/index", { homes, title: "Homes-index" });
  },

  newHome(req, res, next) {
    res.render("homes/new", { title: "Add New Home" });
  },

  async createHome(req, res, next) {
    if (req.files.length) {
      req.body.pictures = [];
      for (const result of req.files) {
        const pic = {
          url: result.secure_url,
          public_id: result.public_id,
        };
        req.body.pictures.push(pic);
      }
    }
    const addy = `${req.body.address}, ${req.body.state}`;
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}&key=${process.env.GEOCODER_GOOGLE}`;

    const [{ latitude, longitude }] = await geocoder.geocode(addy);
    req.body.lat = latitude;
    req.body.lng = longitude;
    await Homes.create(req.body);
    res.redirect("/homes");
  },

  async showHome(req, res, next) {
    const home = await Homes.findById(req.params.id);
    res.render("homes/show", { home, title: "Details" });
  },

  async editHome(req, res, next) {
    const home = await Homes.findById(req.params.id);
    res.render("homes/edit", { home, title: "Edit" });
  },

  async updateHome(req, res, next) {
    const home = await Homes.findById(req.params.id);

    if (req.body.changePics && req.body.changePics.length) {
      await cloudinary.v2.api.delete_resources(req.body.changePics);

      for (const publicid of req.body.changePics) {
        for (const result of home.pictures) {
          if (result.public_id === publicid) {
            const index = home.pictures.indexOf(result);
            home.pictures.splice(index, 1);
          }
        }
      }
    }

    if (req.files.length) {
      for (let result of req.files) {
        let pic = {
          url: result.secure_url,
          public_id: result.public_id,
        };
        home.pictures.push(pic);
      }
    }

    const { state, location, lease, bedrooms, price, description } = req.body;

    home.state = state;
    home.location = location;
    home.lease = lease;
    home.bedrooms = bedrooms;
    home.price = price;
    home.description = description;

    await home.save();
    res.redirect("/homes/" + home.id);
  },

  async deleteHome(req, res, next) {
    const home = await Homes.findById(req.params.id);
    for (const pic of home.pictures) {
      await cloudinary.v2.uploader.destroy(pic.public_id);
    }
    await home.remove();
    res.redirect("/homes");
  },
};
