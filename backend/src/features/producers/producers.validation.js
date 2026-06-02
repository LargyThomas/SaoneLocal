// producers.validation.js\n// TODO: implement producers validation logic\n\nmodule.exports = {};\n

const validationId = (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(400).json({ message: "L'Id du producteur doit être un nombre" });
    }
    next();
}
//regarder si c'est une id

module.exports = {validationId}