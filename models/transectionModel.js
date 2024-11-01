const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: [true, 'name is required']

    },
    description: {
        type: String,
        required: [true, 'description is required']

    },

    item: {
        type: String,
        required: [true, 'item is required']

    },
    category: {
        type: String,
        required: [true, 'category is required']

    },

    type:{
        type:String,
        required:[true, 'type is required']
    },
    amount: {
        type: Number,
        required: [true, 'amount is required']

    },
    date: {
        type: Date,
        required: [true, 'date is required']

    }
}, {timestamps:true})

const transectionModel = mongoose.model('transections', transectionSchema);

module.exports = transectionModel;