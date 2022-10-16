const getCurrent = async (req, res) => {
	const { name, email } = req.user;
	console.log(name);
	res.json({ name, email });
};

module.exports = getCurrent;
