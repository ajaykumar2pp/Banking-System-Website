const Customer = require("../models/customerModel");

function displayTransactionsController() {

  return {
    displayTransactionsController(req, res) {
      const id = req.params.id;
      Customer.findOne({ accNo: id }).then((customer) => {
       
        res.render("transactions", {
          customer
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
module.exports = displayTransactionsController;

