const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");

module.exports.index = async function (req, res) {
	const campgrounds = await Campground.find({});
	res.render("campgrounds/index", { campgrounds });
};

module.exports.getNewForm = function (req, res) {
	res.render("campgrounds/new");
};

module.exports.postNewCamp = async function (req, res, next) {
	const campground = new Campground(req.body.campground);
	campground.images = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	campground.author = req.user._id;
	await campground.save();
	req.flash("success", "Successfully created a campground!");
	res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.getSingleCamp = async function (req, res) {
	const id = req.params.id;
	const campground = await Campground.findById(id)
		.populate({ path: "reviews", populate: { path: "author" } })
		.populate("author");
	console.log(campground);
	if (!campground) {
		req.flash("error", "Campground not found!");
		res.redirect("/campgrounds");
	}
	res.render("campgrounds/show", { campground });
};

module.exports.getEditForm = async function (req, res) {
	const id = req.params.id;
	const campground = await Campground.findById(id);
	if (!campground) {
		req.flash("error", "Campground not found!");
		res.redirect("/campgrounds");
	}
	res.render("campgrounds/edit", { campground });
};

module.exports.editCamp = async function (req, res) {
	const { id } = req.params;
	console.log(req.body);
	const campground = await Campground.findByIdAndUpdate(id, {
		...req.body.campground,
	});
	const images = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	campground.images.push(...images);
	await campground.save();
	if (req.body.deleteImages) {
		for (let filename of req.body.deleteImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await campground.updateOne({
			$pull: { images: { filename: { $in: req.body.deleteImages } } },
		});
		console.log(campground);
	}
	req.flash("success", "Successfully updated campground!");
	res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCamp = async function (req, res) {
	const { id } = req.params;
	await Campground.findByIdAndDelete(id);
	req.flash("success", "Successfully deleted campground!");
	res.redirect("/campgrounds");
};
