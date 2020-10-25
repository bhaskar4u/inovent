const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true
    },
    empName: {
        type: String,
        required: true
    },


    presentAddress: {
        addressLine_1: {
            type: String,
            required: true
        },
        addressLine_2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        pin: {
            type: Number
        },
        country: {
            type: String
        }
    },
    permanentAddress: {
        addressLine_1: {
            type: String,
            required: true
        },
        addressLine_2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        pin: {
            type: Number
        },
        country: {
            type: String
        }
    },
    officeAddress: {
        addressLine_1: {
            type: String,
            required: true
        },
        addressLine_2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        pin: {
            type: Number
        },
        country: {
            type: String
        }
    }

})


module.exports = mongoose.model("Address", addressSchema)