const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const BeachSchema = new mongoose.Schema({
    beachId: {
        type: String,
        required: [true, 'Please add a beach ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'Beach ID must be less than 10 characters']
    },

    beachName: {
        type: String,
        required: [true, 'Please add beach name'],
        unique: true,
        trim: false,
        maxlength: [30, 'Beach name cannot exceed 30 characters']
    },

    rating: {
        type: Number,
        required: false,
    },

    comments: {
        type: String,
        required: false,
        trim: false,
        maxlength: [400, 'Comment cannot exceed 400 characters - less is more :)']
    },

    address: {
        type: String,
        required: [true, 'Please add an address']
    },

    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geocode & create location
BeachSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc);


    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };

    // Do not save address
    this.address = undefined;
    next();
});


module.exports = mongoose.model('Beach', BeachSchema);