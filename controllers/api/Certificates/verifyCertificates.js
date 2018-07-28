var con = require('../../database/MysqlConnection');
exports.certi_verify = function(req, res){

    // console.log('hello');
    let data;
    let query;
    // console.log(req.body.table);
    if(req.body.table === 'registration_user'){
        // console.log('registeration user');
        data = {
            id: con.escape(req.body.id),
            table: con.escape(req.body.table)
        }
        query = `SELECT id, name,contact, college FROM registration_user WHERE id=${data.id}`;
    }
    else if(req.body.table === 'winner_list'){
        // console.log('winner list');
        let id = req.body.id.split('_');
        data = {
            id: con.escape(id[0]),
            event_name: con.escape(id[1]),
            coordi_id: con.escape(id[2]),
            table: con.escape(req.body.table)
        }
        query = `SELECT thomso_id, name, contact, position, event_name FROM winner_list WHERE id=${data.id} AND coordi_id=${data.coordi_id}`;
    }
    else if (req.body.table === 'ca') {
        // console.log('campus ambassdor');
        data = {
            id: con.escape(req.body.id),
            table: con.escape(req.body.table)
        }
        query = `select t1.id, t1.contact, t1.name, t1.college, t1.email, t1.fb_id from ca_form as t1 inner join ca_certi as t2 on t1.contact = t2.mobile WHERE t1.fb_id=${data.id}`;
    }
    // console.log(query);
    con.query(query, function(err, result, field){
        // console.log(err);
        // console.log(result);
        if(err){
            res.json({
                status: 400,
                error: true,
                err: err 
            })
        }
        else{
            if(result[0]){
                // console.log(result[0])
                res.json({
                    status: 200,
                    success: true,
                    data: result
                })
            }
            else{
                res.json({
                    status: 200,
                    success: false,
                })
            }
        }
    })
}

exports.get_cerificates_ca = function(req, res){
    var id = req.user.userId;
    var query = `select name, id, college, email, fb_id from ca_form where fb_id=${id} AND certi=1`;
    // console.log(query);
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