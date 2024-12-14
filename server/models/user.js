const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    employeeId: {
        type: Number,
        required: true,
        min: 100000, // minimum 6 digits
        max: 999999  // maximum 6 digits
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPK, { expiresIn: "7d" });
    return token;
};

const User = mongoose.model("user", userSchema);

const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        employeeId: Joi.number().required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: passwordComplexity({
          min: 8,
          max: 1024,
          lowerCase: 1,
          upperCase: 1,
          numeric: 1,
          symbol: 1,
          requirementCount: 4
        }).required()
    });
    return schema.validate(data);
};

module.exports = { User, validateUser };