require('dotenv').config();
exports.isOrigin = (req, res, next) => {
    // if(req.headers.origin.toLowerCase() === process.env.REQ_ORIGIN){
        next();
    // }
    // else{
    //     res.json({
    //         status: 400,
    //         is_authenticated: false,
    //         message: "You are not authenticated on this server"
    //     })
    // }
    
}