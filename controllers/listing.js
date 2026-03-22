const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports.index = async (req,res) => {
    const { q = "" } = req.query;
    const searchText = q.trim();

    let filter = {};
    if (searchText) {
        const regex = new RegExp(escapeRegex(searchText), "i");
        filter = {
            $or: [
                { title: regex },
                { location: regex },
                { country: regex },
            ],
        };
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm =  (req,res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({path: "reviews" , populate : {path : "author"}})
        .populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createrListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
    })
    .send();

    // console.log(response.body.features[0].geometry);
    // res.send("It worked");


    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
        if(!listing) {
        req.flash("error", "Listing you requested does not exist");
            return res.redirect("/listings");
        }

    let originalImageURL = listing.image.url;
    originalImageURL = originalImageURL.replace("/upload", "/upload/w_300");

    res.render("listings/edit.ejs", {listing, originalImageURL});
};

module.exports.updateListing = async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing}, { runValidators: true });
    
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};
