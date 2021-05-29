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
    const { state, ...otherKeys } = req.query;
    let homes = await Homes.find({ state: req.query.state });
    const keys = Object.keys(req.query);
    const anySearchTerm = keys.some((val) => !!req.query[val]);
    if (anySearchTerm) {
      const { location, lease, bedrooms, minPrice, maxPrice } = otherKeys;
      if (location)
        homes = homes.filter((house) => house.location === location);
      if (lease) homes = homes.filter((house) => house.lease === lease);
      if (bedrooms) homes = homes.filter((house) => house.bedrooms >= bedrooms);
      if (minPrice && maxPrice)
        homes = homes.filter(
          (house) => house.minPrice >= minPrice && house.maxPrice <= maxPrice
        );
    }

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
    const addy = `${req.body.address}, ${req.body.location}`;

    console.log(addy, "wetin dey happen for here");
    const [{ latitude, longitude }] = await geocoder.geocode({
      address: addy,
      countryCode: "ng",
      minConfidence: 0.5,
      proximity: req.body.state === "Lagos" ? "6.5244,3.3792" : "9.0765,7.3986",
      limit: 2,
    });

    req.body.lat = latitude;
    req.body.lng = longitude;
    await Homes.create(req.body);
    res.redirect("/homes");
  },

  async showHome(req, res, next) {
    try{
      const home = await Homes.findById(req.params.id);
      res.render("homes/show", { home, title: "Details" });
    }catch(e){
      next({e});
    }
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
