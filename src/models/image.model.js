const mongoose = require("mongoose");
const { toJSON } = require("./plugins");
const Schema = require('mongoose').Schema;
const imgSchema = new mongoose.Schema({
    name :{
        type: String
    }, 
    Gallery :{
        type : Object,
        filename : {
            type:Object,
            required : true
        },
        path: {
            type:Object,
            required : true
        }
    },
    UserID : {
        type: Schema.Types.ObjectId,
        // required : true,
        ref : "User",
        
    }
})

imgSchema.plugin(toJSON);

const Image = mongoose.model("Image",imgSchema )

module.exports = Image;