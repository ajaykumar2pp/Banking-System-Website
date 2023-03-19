const indexController = require("../controllers/indexController")
const customerDisplayController = require("../controllers/customerDisplayController")
const displayTransactionsController = require("../controllers/displayTransactionsController")
const addFundsController = require("../controllers/addFundsController")
const withdrawController = require("../controllers/withdrawController")
const transferFundsController = require("../controllers/transferFundsController")
const customerAddController = require("../controllers/customerAddController")
const userDataController = require("../controllers/userDataController")



function initRoutes(app) {

    // **********************  Index Controller *******************//
    app.get("/", indexController().indexController);

    // **********************  Customer Display Controller *******************//
    app.get("/customers/:id", customerDisplayController().customerDisplayController);

    // **********************  Display Transactions Controller *******************//
    app.get("/customers/:id/transactions", displayTransactionsController().displayTransactionsController);

    // ********************** Add Funds  Controller    *******************//
    app.post("/customers/:id/addFunds", addFundsController().addFundsController);

    // **********************  Withdrawl  Controller *******************//
    app.post("/customers/:id/withdrawFunds", withdrawController().withdrawController);

    // **********************  Transfer Fund Controller *******************//
    app.post("/customers/:id/transferFunds", transferFundsController().transferFundsController);
    
    // **********************  Customer Add  Controller *******************//
    app.post("/customers", customerAddController().customerAddController);

    // ***************************  User Data Post  ***************************//
    app.post("/userdata",userDataController().postImage)

 // ***************************  User Data Form Fill  ***************************//
    app.get("/userdata",userDataController().getImage)

    // ***************************  User Data Form Fill  ***************************//
    app.get("/image",userDataController().getImageUrl)



}
module.exports = initRoutes

