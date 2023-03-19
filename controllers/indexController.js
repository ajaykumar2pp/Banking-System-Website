

const Customer = require("../models/customerModel");

function indexController() {
  return {
    indexController(req, res) {
      Customer.find()
        .sort("name")
        .exec()
        .then((customers) => {
          res.render("index", {
            customers,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Internal Server Error");
        });
    },
  };
}

module.exports = indexController;

