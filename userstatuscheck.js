const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const rtdb = require('./db_model_schema')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.post('/userstatus', async (req, res) => {
    const contactNumber = req.body.contact_number


    const user = await rtdb.RTDBUser.find(
        {mobileNo: `${contactNumber}`}
    ).count()


    if (user > 0) {
        const userDetails = await rtdb.RTDBUser.find(
            {mobileNo: `${contactNumber}`}
        )
        res.status(200).json({ exist: true, socketId: `${userDetails[0].socketId}` })
    } else {
        res.status(200).json({ exist: false })
    }
})

module.exports = app


