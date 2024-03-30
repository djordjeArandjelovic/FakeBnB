const User = require("../models/user");

module.exports.getRegisterPage = (req, res) => {
	res.render("users/register");
};

module.exports.registerUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const user = new User({ username, email });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, function (err) {
			if (err) {
				return next(err);
			}
			req.flash("success", "Welcome to Yelp Camp!");
			res.redirect("/campgrounds");
		});
	} catch (err) {
		req.flash("error", err.message);
		res.redirect("/register");
	}
};

module.exports.getLoginPage = (req, res) => {
	res.render("users/login");
};
module.exports.loginUser = (req, res) => {
	req.flash("success", "Welcome back");
	const redirectUrl = res.locals.returnTo || "/campgrounds";
	res.redirect(redirectUrl);
};
module.exports.logoutUser = (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.flash("success", "Goodbye!");
		res.redirect("/campgrounds");
	});
};
