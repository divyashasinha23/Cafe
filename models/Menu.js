const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    dish_name:{
      type:String,
      required:true
    },
    dish_price:{
        type:Number,
        required:true
    },

});


const Menu=mongoose.model('Menu',menuSchema);

module.exports=Menu;