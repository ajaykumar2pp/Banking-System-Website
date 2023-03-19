
const Customer = require("../models/customerModel");

function transferFundsController(){
  return {
    transferFundsController(req, res){
      let { amount } = req.body;
      amount = Math.abs(Number(amount.trim()));
      console.log(req.body);
      const sender = req.params.id;
      const receiver = req.body.transferTo;
      const debitFromURL = `/customers/${sender}/withdrawFunds`;
      const transferToURL = `/customers/${receiver}/addFunds`;
    
      Customer.find({ $or: [{ accNo: sender }, { accNo: receiver }] })
        .then((senderAndReceiver) => {
          let [S, R] = senderAndReceiver;
          const senderName = S.accNo === sender ? S.name : R.name;
          const receiverName = R.accNo === receiver ? R.name : S.name;
          console.log(`Sent From ${senderName} to ${receiverName}`);
        
    
          Customer.findOne({ accNo: sender })
            .then((response) => {
              
              const snapshotOfCurrentBalance =
                response.currentBal + Number(-amount);
              if (snapshotOfCurrentBalance < 0) throw Error("Insufficient Funds!");
              
              Customer.findOneAndUpdate(
                { accNo: sender },
    
                {
                  $inc: { currentBal: Number(-amount) },
    
                  $push: {
                    transactions: {
                      transactionType: "debit",
                      transactionDetails: {
                        transferredFrom: "Self",
                        transferredTo: receiverName,
                        balance: snapshotOfCurrentBalance,
                        amount: Number(amount),
                      },
                    },
                  },
                }
              )
                .then((response) => {
                  addFunds();
                })
                .catch((err) => {
                  res.send(`<h1> ${err.toString()}</h1>`);
                });
            })
            .catch((err) => {
              res.send(`<h1> ${err.toString()}</h1>`);
            });
    
          //Add Funds
    
          const addFunds = () => {
            Customer.findOne({ accNo: receiver })
              .then((response) => {
                
                const snapshotOfCurrentBalance = response.currentBal + amount;
           
                Customer.findOneAndUpdate(
                  { accNo: receiver },
    
                  {
                    $inc: { currentBal: amount },
    
                    $push: {
                      transactions: {
                        transactionType: "credit",
                        transactionDetails: {
                          transferredFrom: senderName,
                          transferredTo: "Self",
                          balance: snapshotOfCurrentBalance,
                          amount: amount,
                        },
                      },
                    },
                  }
                )
                  .then((response) => {
                    
    
                    res.redirect(`/customers/${sender}`);
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
          };
        })
        .catch((err) => {
          res.json({ message: err._message });
          console.log(err);
        });
    }
  }
}
module.exports = transferFundsController;

