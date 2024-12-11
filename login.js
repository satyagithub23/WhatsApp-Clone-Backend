const express = require('express')
const app = express()
const user = require('./db_model_schema')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const username = req.body.user_name
    const email = req.body.email
    const password = req.body.password
    const mobileNumber = req.body.mobile_number


    if (username == null || email == null || password == null || mobileNumber == null) {
        return res.status(400).json({msg: "All fields are required"})
    }

    
    try {
        const result = await user.User.create({
            userName: username,
            email: email,
            passWord: password,
            mobileNo: mobileNumber
        });
    
        res.status(200).json({msg: 'success', userName: `${username}`})
    } catch (error) {
        console.log(error);
        return res.status(501).json({msg: `Bad request`});
    }
});

module.exports = app