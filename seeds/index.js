// IMPORTS
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb://localhost:27017/yelpCamp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 5; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 10) + 10;
		const camp = new Campground({
			author: "66049008679e39e0c706049c",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: "https://res.cloudinary.com/dgbuudzgt/image/upload/v1711712791/campgrounds/qeo7e2s4lhtfy5vuqfhq.avif",
					filename: "campgrounds/qeo7e2s4lhtfy5vuqfhq",
				},
				{
					url: "https://res.cloudinary.com/dgbuudzgt/image/upload/v1711712793/campgrounds/ignvekvmxdl78noc6wco.avif",
					filename: "campgrounds/ignvekvmxdl78noc6wco",
				},
			],
			price: price,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos tempora, fuga corrupti quo optio earum assumenda, quaerat incidunt nesciunt tempore tenetur delectus consequuntur consectetur! Non deleniti mollitia impedit eum neque. Repellat magnam ipsam soluta! Adipisci alias ex nulla! Dolor inventore voluptas cumque, tempora deleniti sint beatae obcaecati voluptates hic quo assumenda nesciunt doloribus ut. Ducimus odit ab earum porro magni!",
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
