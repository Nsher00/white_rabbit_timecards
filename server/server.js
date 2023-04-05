
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Sequelize = require('sequelize')
const {SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())
app.use(cors())
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
app.use(express.static(`${__dirname}/../client`))

//this axios call makes sure that the username, password, and the repeat password are the same in order to make an account
app.post('/newuser', (req,res)=>{
    let {useremail, password, repassword} = req.body
    if(repassword === password && useremail !== ''){
        sequelize.query(`
            INSERT INTO  users (useremail, password)
            VALUES ('${useremail}','${password}')
            RETURNING *;
        `).then((dbRes)=>{
            res.status(200).send(dbRes[0])
        })
    //This throws out an error when the username is null or empty
    }else if (useremail === ''){
        res.send('user name required')
    //This is a catch to tell the user that the passwords do not match 
    }else{
        res.send('password do not match')
    }
    
})

//this axios call makes sure that the username and password are in the data base then logs the user in
app.get(`/user/:email/:password/`, (req,res)=>{
    console.log(req.params);
    let {email, password} = req.params

    sequelize.query(`
        SELECT useremail FROM users WHERE useremail = '${email}' AND password = '${password}'
    `).then((dbRes)=>{
        res.status(200).send(dbRes[0])
    }).catch((err)=>{
        console.log(err);
    })
})

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))