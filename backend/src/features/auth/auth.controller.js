exports.register = (req, res) => {
    res.status(200).send("User registered successfully");
}
exports.login = (req, res) => {
    res.status(200).send("User logged in successfully");
}