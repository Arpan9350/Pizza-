const express = require('express');
const router = express.Router();
const jwt=require("jsonwebtoken");
const jwtSecret="asd889asdas5656asdas887";
const catModel = require('../db/createSchema')
const menuModel = require('../db/menuSchema')
const orderModel =require('../db/orderSchema')
const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport({
    service:'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "oroarpanjain7@gmail.com",
        pass: 
    }
})
router.post("/addpost", (req, res) => {
    let ins = new catModel({ name: req.body.name, email: req.body.email, contact: req.body.contact, address: req.body.address, password: req.body.password, cpassword: req.body.cpassword })
    console.log(ins)
    ins.save((e) => {
        if (e) {
            res.send("Already added")
        }
        else {
            res.send("category added")
        }
    })
})

router.get("/fetchpost", (req, res) => {
    menuModel.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data)
        }
    })
})


router.get("/fetchdata", (req, res) => {
    catModel.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data)
        }
    })
})
router.get("/allorders", (req, res) => {
    orderModel.find({}, (err, data) => {
        if (err) throw err;
        else {
            console.log(typeof data)
            res.send(data)

        }
    })
})
router.post('/placeorder', (req, res) => {

    let insert2 = new orderModel({
        details: req.body.details,
        price: req.body.price,
        status: req.body.status,

    })
    console.log(insert2)

    insert2.save((e) => {
        console.log(e)
        if (e) {
            res.send("Already added")
        }
        else {
            
            transporter.sendMail({
                from: 'oroarpanjain7@gmail.com',
                to: 'harshk6300@gmail.com',
                
                subject: "Order Confirmation",
                html: `<!DOCTYPE html>
                <html>
                <head>
                <style>
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                }
                h1{
                    color: blue;
                }
                </style>
                </head>
                <body>
                 <img src="veggie paradise1.jpg"/> 
                <h1 className="text-success">Your Order Placed Successfully. Your Pizza 🍕 will be delivered in 30 Min.</h1>
                
                <table style="width:60%">
                <tr>
                <th>Ordered Items</th>
                <th>Total Price</th>
                </tr>
                  <tr>
                  <td></td>
                  <td>Rs.</td>
                </tr>
                  
                </table>
                </body>
                </html>`,
                attachments:[ {
                    filename: 'chees and corn',
                    path: "public/2.jpg"
                },
                {
                    filename:'bill.txt',
                    content: 'your invoice',
                   
                    contentType: 'text/plain'
            
                } ]
                // text: "Your order is"
            },(error,res)=>{
                if(error){console.log(error)}else{console.log("mail sent",res)}
            });
            res.send("category added")
        }
    })
})

router.post("/validate", (req, res) => {
    let email=req.body.email;
    let password=req.body.password;
    catModel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else {
            let payload={
                uid:email
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
})

module.exports = router;