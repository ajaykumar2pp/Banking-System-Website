const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    transactionType: {
      type: String,
    },

    transactionDetails: {
      transferredFrom: {
        type: String,
        default: "",
      },
      transferredTo: {
        type: String,
        default: "",
      },
      balance: {
        type: Number,
        default: 0,
      },

      amount: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a customer name"],
    },
    dob: {
      type: Date,
      required: [true, "Please provide a Date of Birth"],
    },
    gender:{
      type:String,
      required:true,
      default:""
    }
    ,
    address: {
      type: String,
      default: "India",
    },
    accNo: {
      type: String,
      required: true,
      default: mongoose.Types.ObjectId,
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
    },
    phone: {
      type: Number,
      required: [true, "Please provide a phone number"],
    },

    transactions: [transactionSchema],
    currentBal: {
      type: Number,
      required: [true, "Please provide a valid balance"],
      default: 0,
      min: 0,
    },
    image: { type: String, required: true,
      get:(image)=>{
       // http://localhost:8000/uploads\1678602843132-545495737.jpg
       if (process.env.ON_RENDER == 'true') {
          return `${image}`;
      }
          return `${process.env.APP_URL}/${image}`
      } },
  },
  {
    timestamps: true,toJSON: { getters: true },id: false});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
