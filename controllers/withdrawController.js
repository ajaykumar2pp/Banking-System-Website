const Customer = require("../models/customerModel");


function withdrawController(){
  return {
    withdrawController(req, res){
      const id = req.params.id;
      let { amount } = req.body;
      amount = amount.trim();
      Customer.findOne({ accNo: id })
        .then((response) => {
          
          const snapshotOfCurrentBalance = response.currentBal + Number(-amount);
          if (snapshotOfCurrentBalance < 0) throw Error("Insufficient Funds!");
         
          Customer.findOneAndUpdate(
            { accNo: id },
    
            {
              $inc: { currentBal: Number(-amount) },
    
              $push: {
                transactions: {
                  transactionType: "debit",
                  transactionDetails: {
                    transferredFrom: "Self",
                    transferredTo: "Self",
                    balance: snapshotOfCurrentBalance,
                    amount: Number(amount),
                  },
                },
              },
            }
          )
            .then((response) => {
             
              res.redirect(`/customers/${id}`);
            })
            .catch((err) => {
              res.send(`<h1> ${err.toString()}</h1>`);
            });
        })
        .catch((err) => {
          res.send(`<h1> ${err.toString()}</h1>`);
        });
    }
  }
}
module.exports = withdrawController;

