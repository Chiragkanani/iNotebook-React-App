const express = require('express');
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "chiragisgoodb$oy"
const jwt = require('jsonwebtoken');

router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body("name", 'Enter a valid name').isLength({ min: 3 }),
    body("password", 'Password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });

    }

    try {
        let user = await User.findOne({ 'email': req.body.email })
        if (user) {
            return res.status(400).json({ errors: "Sorry a user with this email is already exists" });
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt); 
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user:{
                id:user.id
            }
        }
        var token = jwt.sign(data, JWT_SECRET);
        res.send({token})
    } catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }


    // .then(user => res.json(user)).catch(err=>{console.log(err), res.json({error:'Please Enter a unique Email'})})




    //     const user = User(req.body)
    //     user.save()
    //     console.log(req.body)
    //    res.send(req.body)
})

module.exports = router