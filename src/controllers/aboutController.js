const aboutController = {
    FAQ: (req, res) => {
        res.render("about/FAQ");
    },
    masinfo: (req, res) => {
        res.render("about/masinfo");
    },
    privacidad: (req, res) => {
        res.render("about/privacidad");
    },
    quees: (req, res) => {
        res.render("about/quees");
    },
    quienessomos: (req, res) => {
        res.render("about/quienessomos");
    },
    seisrazones: (req, res) => {
        res.render("about/seisrazones");
    },
    terminos: (req, res) => {
        res.render("about/terminos");
    },
    tipos: (req, res) => {
        res.render("about/tipos");
    }
};

module.exports = aboutController;