// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//     employeID: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Employe"
//     },
//     Items: [
//         {
//            ItemId: Number,
//            quantity: Number,
//            name: String,
//            price: Number 
//         }
//     ],
//     modifiesOn :{
//         type: Date,
//         default: Date.now
//     },
// },
//  {
//      timestamps: true
//  }
// );

// const Cart = mongoose.model('cart', cartSchema);
// module.exports = Cart;