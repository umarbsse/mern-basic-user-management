const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = "UMERISNOTaGOODB$Y"

//Route 1: Creat a User using : POST "/api/auth/createuser". No login required, input values and create user account
router.post(
    "/createuser",
    [
        body("fname", "Enter a valid first name").isLength({ min: 3 }).escape(),
        body("lname", "Enter a valid last name").isLength({ min: 3 }).escape(),
        body("gender", "Enter a valid gender").escape(),
        body("email", "Enter a valid email").isEmail().escape(),
        body("password", "Password must be atleast 5 characters").isLength({ min: 5 }).escape(),
    ],
    async (req, res) => {
        let success = false;
        //If ther are error return bad request and the errors

        const errors = validationResult(req);

        //IF VALIDATION FAILED
        if (!errors.isEmpty()) {
            res.send({ success,errors: errors.array() });
        }
        //Check wether the user with this email exist already

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({ success,error: "Sorry a user with this email alread exists" });
            }
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password,salt)
            user = await User.create({
                fname: req.body.fname,
                lname: req.body.lname,
                gender: req.body.gender,
                email: req.body.email,
                password: secPass,
            });


            
            const data ={user:{id:user.id}}


            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;

            res.json({success,authtoken:authToken});
        } catch (error) {
            //console.error(error.message);
            res.status(500).json({ success,error: "Internal Server Error" });
        }
    }
);

module.exports = router;