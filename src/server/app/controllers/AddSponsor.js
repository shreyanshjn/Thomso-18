var con = require('../../database/connection');

var jwt = require('jsonwebtoken');
require('dotenv').config();

exports.add_sponsor = (req, res) => {
    // console.log(req.body);
    var data = {
        sponsorType : con.escape(req.body.sponsorType),
        email : con.escape(req.body.email),
        contact : con.escape(req.body.contact),
        message : con.escape(req.body.message)
    }
    var query = `INSERT INTO sponsor 
    (type, email, contact,message) VALUES 
    (${data.sponsorType}, ${data.email}, ${data.contact}, ${data.message})`;
    con.query(query, (err, result, fields) => {
        if(err){
            // console.log(err);
            res.json({
                status: 400,
                isAdded: false,
                error: true,
                result:err
            });
        }
        else{
            // console.log(result);
            if(result.affectedRows === 1){
                var response = {
                    username : req.body.email,
                    userId : result.id
                }
                res.json({
                    status:200,
                    isAdded: true,
                    error: false,
                    username : data.email,
                    userId: result.id
                })
            }
            else{
                res.json({
                    status: 200,
                    isAdded: false,
                    error:true,
                    result:'Unable To register. Please try again'
                })
            }
        }
    })
}