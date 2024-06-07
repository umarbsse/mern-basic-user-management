const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = "UMERISNOTaGOODB$Y"
var fetchuser = require('../middleware/fetchuser');

const failed_req_msg="Internal Server Error 123123 12312 3";

//Route 1: Creat a User using : POST "/api/auth/createuser". No login required, input values and create user account
router.post(
    "/createuser",
    [
        body("fname", "Enter a valid first name").isLength({ min: 3 }).escape(),
        body("lname", "Enter a valid last name").escape(),
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


//Route 2: Authenticate a User using : POST "/api/auth/login". No required login
router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail().escape(),
        body("password", "Password can not be blanked").exists()
    ],
    async (req, res) => {
            let success = false;
        
        
        

            //If ther are error return bad request and the errors

            const errors = validationResult(req);

            //IF VALIDATION FAILED
            if (!errors.isEmpty()) {
                res.status(400).send({success,  errors: errors.array() });
            }
            

        try {

            const {email,password}=req.body;

            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({success, error:"Please try to loging with correct creedntials"});
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({success, error:"Please try to loging with correct creedntials"});
            }


            
            const data ={user:{id:user.id}}


            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;


            res.json({ success, authToken});
            
        } catch (error) {
            //console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    }
);



//Route 3: Get loggedin User Details using : POST "/api/auth/getuser". required login
router.get("/getuser",fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        //console.error(error.message);
        res.status(500).send(failed_req_msg);
    }
}
)


//Route 4: Update user account setting using : PUT "/api/auth/updateaccountsetting". required login
router.put("/updateaccountsetting/:id", fetchuser, async (req, res) => {
        let success = false;
    try {
        let user_id = req.params.id;
        
        const { fname, lname, gender, email } = req.body;
        const newAccountSetting = {};
        if (fname) {
            newAccountSetting.fname = fname
        }
        if (lname) {
            newAccountSetting.lname = lname
        }
        if (email) {
            newAccountSetting.email = email
        }
        if (gender) {
            newAccountSetting.gender = gender
        }
        //FIND THE NOTE TO B UPDATED
        if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            let is_account_setting = await User.findById(user_id);
            is_account_setting = await User.findByIdAndUpdate(req.params.id, { $set: newAccountSetting }, { new: true })
            success = true;
            res.json({ success:true, is_account_setting});
        }else{
            res.status(401).send({ success, response:"Not Allowed"});
        }     
    } catch (error) {
        res.status(500).send({ success, response:failed_req_msg});
    }
})

//Route 5: Update user account setting using : PUT "/api/auth/updateaccountsetting". required login
router.put("/updateaccountsettingpassword/:id", fetchuser, async (req, res) => {
    try {
        let user_id = req.params.id;
        let success = false;
        const { password, confirm_password } = req.body;
        const newAccountSetting = {};
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password,salt)
        if (password) {
            newAccountSetting.password = secPass
        }
        //FIND THE User password  TO B UPDATED
        if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            let is_account_setting = await User.findById(user_id);
            is_account_setting = await User.findByIdAndUpdate(req.params.id, { $set: newAccountSetting }, { new: true });
            success = true;
            res.json({ success, is_account_setting});
        }else{
            res.status(401).send({ success, response:"Not Allowed"});
        }     
    } catch (error) {
        res.status(500).send({ success, response:failed_req_msg});
    }
})

module.exports = router;