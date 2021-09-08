const mainController = {
    index: (req, res) => {
        res.render("index");
    },
    ayuda: (req, res) => {
        res.render("ayuda");
    }
};

module.exports = mainController;