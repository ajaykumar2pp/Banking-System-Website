const Customer = require("../models/customerModel");

function addFundsController() {
  return {
    addFundsController(req, res) {
      const id = req.params.id;
      let { amount } = req.body;
      amount = Math.abs(Number(amount.trim()));
     

      Customer.findOne({ accNo: id })
        .then((response) => {
         
          const snapshotOfCurrentBalance = response.currentBal + amount;
          
          Customer.findOneAndUpdate(
            { accNo: id },

            {
              $inc: { currentBal: amount },

              $push: {
                transactions: {
                  transactionType: "credit",
                  transactionDetails: {
                    transferredFrom: "Self",
                    transferredTo: "Self",
                    balance: snapshotOfCurrentBalance,
                    amount: amount,
                  },
                },
              },
            }
          )
            .then((response) => {
              
              res.redirect(`/customers/${id}`);
            })
            .catch((err) => {
              res.json({ message: err._message });
              console.log(err);
            });
        })
        .catch((err) => {
          res.json({ message: err._message });
          console.log(err);
        });
    }
  }
}
module.exports = addFundsController;


