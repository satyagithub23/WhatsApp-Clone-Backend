const express = require('express')
const app = express()
const user = require('./db_model_schema')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post("/contactcheck", async (req, res) => {
    const jsonArray = req.body;
    const contactsPresent = []
    if (jsonArray != null) {
        for (let i = 0; i < jsonArray.length; i++) {
            let { number } = jsonArray[i]
            number = number.replace(/\s/g, '')
            number = number.replace("+91", '')
            const existUser = await user.User.find({
                mobileNo: `${number}`
            })
            existUser.forEach(element => {
                contactsPresent.push(element)
            });
        }
        if (contactsPresent.length > 0) {
            res.status(200).json(contactsPresent)
        } else {
            res.status(400).json("No contacts have created their acoount in our platform")
        }
    } else {
        res.status(500).json("Some error occurred")
    }
})

module.exports = app
// [[{"_id":"65f84affea89599e04f4f8d2","userName":"Satya","email":"satya.narayan.40270@gmail.com","passWord":"grfefwg4","mobileNo":"7205210533","createdAt":"2024-03-18T14:09:03.628Z","updatedAt":"2024-03-18T14:09:03.628Z","__v":0}],[{"_id":"65fe7c232e75d9c01c3607bd","userName":"Shakti","email":"shaktipadasahu111@gmail.com","passWord":"shakti123","mobileNo":"9338367399","createdAt":"2024-03-23T06:52:19.296Z","updatedAt":"2024-03-23T06:52:19.296Z","__v":0}]]