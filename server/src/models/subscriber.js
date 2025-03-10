const mongoose = require('mongoose');

const SubscriberSchema=
mongoose.Schema({
    email:{
        type:String,
        required:true
        }
    }
    );
    module.exports=mongoose.model('Subscriber',SubscriberSchema);  //exporting the model
    