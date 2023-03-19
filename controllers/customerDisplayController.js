const moment = require("moment");
const Customer = require("../models/customerModel");

function customerDisplayController(){
  return {
    async customerDisplayController(req, res){
      try {
        const id = req.params.id;
        const customerData = await Customer.findOne({ accNo: id });
        const createdAt = moment(customerData.createdAt).format("lll");
        const modifiedAt = moment(customerData.updatedAt).format("lll");
        const dob = moment(customerData.dob).format("ll");
        const allCustomers = await Customer.find({ accNo: { $ne: id } });
        res.render("customer", {
          allCustomers,
          customerData,
          createdAt,
          modifiedAt,
          dob,
        });
      } catch (err) {
        console.log(err);
        res.json({ message: "Server Error!" });
      }
    }
  }
}
module.exports = customerDisplayController;





