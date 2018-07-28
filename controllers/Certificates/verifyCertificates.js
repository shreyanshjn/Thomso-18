var con = require('../database/MysqlConnection');

exports.get_cerificates_ca = function(req, res){
    var id = req.user.userId;
    var query = `select name, id, college, email, fb_id from ca_form where fb_id=${id} AND certi=1`;
    console.log(query);
    con.query(query, function(err, result, field){
        if(err){
            res.json({
                status: 400,
                error: true,
                err: err 
            })
        }
        else{
            if(result[0]){
                res.json({
                    status: 200,
                    success: true,
                    result: result
                })
            }
            else{
                res.json({
                    status: 200,
                    success: false
                })
            }
        }
    })
}